/**
 * SkillSpector pipeline — pure logic (no I/O), so scope/normalize/grade/render
 * are all unit-testable and shared by the scan driver + the docs generator.
 *
 * WHY a separate lib from scoring.ts: skillspector output is STATIC pattern-match
 * signal that over-flags massively (the atlas's safest curated repo scans
 * CRITICAL/100). It must NEVER touch the curated safety scores in repos.yaml or
 * the README ranked tables — it lives entirely in its own docs/ tree. Keeping it
 * in its own module makes that separation structural, not just conventional.
 */
import type { RepoEntry, LiveEntry } from "./scoring";

// Scanner scope: only surfaces where the "does this SKILL/MCP execute untrusted
// code with your keys" threat model applies. sdk-client / cli / data-backtesting
// are a threat-model mismatch (you drive them, they don't drive an agent) and are
// deliberately out of scanner scope.
export const SCOPE_CATEGORIES = ["mcp-server", "agent-framework", "skill"] as const;
// Terminal states never get scanned — a scam/archived repo's story is already
// told by its hard flag; a static scan adds nothing.
export const TERMINAL_FLAGS = ["scam", "key_exfil", "archived"] as const;

export function inScope(entry: RepoEntry): boolean {
  if (!SCOPE_CATEGORIES.includes(entry.category as (typeof SCOPE_CATEGORIES)[number])) return false;
  if ((entry.hard_flags ?? []).some((f) => TERMINAL_FLAGS.includes(f as (typeof TERMINAL_FLAGS)[number]))) {
    return false;
  }
  return entry.url?.startsWith("https://github.com/") ?? false;
}

/** Reason an in-repos.yaml entry is NOT scanned — shown in the docs index so the
 * exclusion is auditable, never silent. */
export function outOfScopeReason(entry: RepoEntry): string | undefined {
  if (inScope(entry)) return undefined;
  const terminal = (entry.hard_flags ?? []).find((f) =>
    TERMINAL_FLAGS.includes(f as (typeof TERMINAL_FLAGS)[number]),
  );
  if (terminal) return `terminal (\`${terminal}\`) — story already told by its flag`;
  if (!entry.url?.startsWith("https://github.com/")) return "registry-only (no GitHub source to clone)";
  return `category \`${entry.category}\` — threat-model mismatch (out of scanner scope)`;
}

/** Filesystem-safe slug: an owner/repo id can't be a filename. */
export const slugFor = (id: string): string => id.replaceAll("/", "__");

// ── Artifact shape (the committed, no-timestamp, diff-reviewable normal form) ──

export interface TrimmedIssue {
  id: string;
  category: string;
  severity: string;
  confidence: number;
  location: { file: string; start_line: number; end_line: number };
  finding: string;
  explanation: string;
}

export interface Counts {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export const totalCount = (c: Counts): number => c.critical + c.high + c.medium + c.low;

export interface SkillspectorArtifact {
  id: string;
  head_sha?: string;
  skillspector_version?: string;
  risk_assessment?: { score: number; severity: string; recommendation: string };
  counts?: Counts;
  suppressed_count?: number;
  issues?: TrimmedIssue[];
  analysis_completeness?: { coverage_percent: number; is_complete: boolean };
  /** Present only on a failed scan (clone error / nonzero exit). Mutually
   * exclusive with the result fields above. */
  error?: string;
}

const SEV_ORDER: Record<string, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };

/**
 * Normalize a raw skillspector JSON report into the committed artifact.
 * PURE + DETERMINISTIC: strips every wall-clock timestamp (skill.scanned_at) and
 * machine-specific noise (skill.source temp path), drops verbose per-issue fields
 * (code_snippet/remediation/pattern/tags) to keep diffs reviewable, and sorts
 * issues by (file, line, id) so re-running yields byte-identical output.
 */
export function normalizeArtifact(
  raw: Record<string, unknown>,
  id: string,
  headSha: string | undefined,
): SkillspectorArtifact {
  const rawIssues = (Array.isArray(raw.issues) ? raw.issues : []) as Array<Record<string, unknown>>;
  const issues: TrimmedIssue[] = rawIssues
    .map((i) => {
      const loc = (i.location ?? {}) as Record<string, unknown>;
      return {
        id: String(i.id ?? ""),
        category: String(i.category ?? ""),
        severity: String(i.severity ?? ""),
        confidence: Number(i.confidence ?? 0),
        location: {
          file: String(loc.file ?? ""),
          start_line: Number(loc.start_line ?? 0),
          end_line: Number(loc.end_line ?? 0),
        },
        finding: String(i.finding ?? ""),
        explanation: String(i.explanation ?? ""),
      };
    })
    .sort(
      (a, b) =>
        a.location.file.localeCompare(b.location.file) ||
        a.location.start_line - b.location.start_line ||
        a.id.localeCompare(b.id),
    );

  const counts: Counts = { critical: 0, high: 0, medium: 0, low: 0 };
  for (const i of issues) {
    if (i.severity === "CRITICAL") counts.critical++;
    else if (i.severity === "HIGH") counts.high++;
    else if (i.severity === "MEDIUM") counts.medium++;
    else if (i.severity === "LOW") counts.low++;
  }

  const risk = (raw.risk_assessment ?? {}) as Record<string, unknown>;
  const meta = (raw.metadata ?? {}) as Record<string, unknown>;
  const comp = (raw.analysis_completeness ?? {}) as Record<string, unknown>;

  // Fixed key order → minimal, reviewable diffs.
  return {
    id,
    head_sha: headSha,
    skillspector_version: meta.skillspector_version ? String(meta.skillspector_version) : undefined,
    risk_assessment: {
      score: Number(risk.score ?? 0),
      severity: String(risk.severity ?? ""),
      recommendation: String(risk.recommendation ?? ""),
    },
    counts,
    suppressed_count: Number(raw.suppressed_count ?? 0),
    issues,
    analysis_completeness: {
      coverage_percent: Number(comp.coverage_percent ?? 0),
      is_complete: Boolean(comp.is_complete),
    },
  };
}

/** Serialize an artifact deterministically (trailing newline, matches live.json). */
export const serializeArtifact = (a: SkillspectorArtifact): string => `${JSON.stringify(a, null, 2)}\n`;

// ── Scanner grade (post-baseline counts only; docs-only, never curated) ──

export interface Grade {
  emoji: string;
  label: string;
}

/**
 * Deterministic grade from POST-BASELINE counts. `hasBaseline=false` appends
 * "(untriaged)" because pre-triage static counts over-flag — the grade is a
 * triage prompt, not a verdict.
 */
export function scannerGrade(counts: Counts, hasBaseline: boolean): Grade {
  let base: Grade;
  if (counts.critical > 0) base = { emoji: "🔴", label: "flagged-critical" };
  else if (counts.high > 0) base = { emoji: "🟠", label: "needs-triage" };
  else if (counts.medium + counts.low > 0) base = { emoji: "🟡", label: "minor-signals" };
  else base = { emoji: "🟢", label: "clean" };
  return hasBaseline ? base : { emoji: base.emoji, label: `${base.label} (untriaged)` };
}

export const ERROR_GRADE: Grade = { emoji: "⚪", label: "scan-error" };

const gradeText = (g: Grade): string => `${g.emoji} ${g.label}`;

// ── Markdown rendering (PURE — same inputs → identical output, no fs reads) ──

const FRAMING = (id: string) =>
  `> **Static pattern-match signals, pending human triage** — NOT verdicts, and NOT the curated safety score.\n` +
  `> SkillSpector runs static analysis only here (\`--no-llm\`), which over-flags heavily: the atlas's *safest* curated repo scans as CRITICAL. These signals are triage input, never a ranking. For the human-reviewed safety score of \`${id}\`, see the [main README](../../README.md) and [methodology](../methodology.md).`;

const SEV_LABEL: Record<string, string> = {
  CRITICAL: "🔴 Critical",
  HIGH: "🟠 High",
  MEDIUM: "🟡 Medium",
  LOW: "⚪ Low",
};

/**
 * Escape attacker-controlled text for a markdown TABLE cell. A scanned repo owns
 * the file paths, categories and finding strings that land here, so pipes and
 * newlines (which break table structure) must be neutralized.
 *   cell     — structural only (pipe + newline); safe for text INSIDE a code span.
 *   textCell — also neutralizes `<` so a stray/truncated `<!--` (or any tag) in
 *              repo content can't open an HTML comment that hides the rest of the
 *              doc, or inject markup, in a non-code cell.
 *   codeCell — for values wrapped in a `code span`; strips backticks so the span
 *              can't be broken open (inside a span `<` is already inert).
 */
const cell = (s: string): string => s.replace(/\|/g, "\\|").replace(/[\r\n]+/g, " ");
const textCell = (s: string): string => cell(s).replace(/</g, "&lt;");
const codeCell = (s: string): string => cell(s).replace(/`/g, "'");

/** Per-repo doc. Pure: takes the artifact + its entry + whether a reviewed
 * baseline exists; reads no files. Cap findings at 50 rows. */
export function renderRepoDoc(
  artifact: SkillspectorArtifact,
  entry: RepoEntry,
  hasBaseline: boolean,
): string {
  const url = entry.url ?? `https://github.com/${entry.id}`;
  const lines: string[] = [`# SkillSpector scan — [\`${entry.id}\`](${url})`, ""];

  if (artifact.error) {
    lines.push(
      FRAMING(entry.id),
      "",
      `**Scanner grade:** ${gradeText(ERROR_GRADE)}`,
      "",
      // Error text is derived from the scanned repo's own scanner stderr — escape
      // it like a table cell so a stray `<!--`/tag can't hide the rest of the doc.
      `> ⚠️ **Scan did not complete:** ${textCell(artifact.error)}`,
      "",
      `Scanned head_sha: \`${artifact.head_sha ?? "—"}\``,
      "",
    );
    return `${lines.join("\n")}\n`;
  }

  const counts = artifact.counts ?? { critical: 0, high: 0, medium: 0, low: 0 };
  const grade = scannerGrade(counts, hasBaseline);
  const risk = artifact.risk_assessment;
  const comp = artifact.analysis_completeness;

  lines.push(
    FRAMING(entry.id),
    "",
    `**Scanner grade:** ${gradeText(grade)} · SkillSpector v${artifact.skillspector_version ?? "?"}`,
    "",
    "| Field | Value |",
    "|---|---|",
    `| Scanner risk score | ${risk ? `${risk.score}/100` : "—"} |`,
    `| Scanner severity | ${risk?.severity ?? "—"} |`,
    `| Scanner recommendation | ${risk?.recommendation ?? "—"} |`,
    `| Post-baseline counts | 🔴 ${counts.critical} C · 🟠 ${counts.high} H · 🟡 ${counts.medium} M · ⚪ ${counts.low} L |`,
    `| Suppressed by baseline | ${artifact.suppressed_count ?? 0} |`,
    `| Coverage | ${comp ? `${comp.coverage_percent}%${comp.is_complete ? "" : " (partial — LLM meta-analysis skipped)"}` : "—"} |`,
    `| Scanned head_sha | \`${artifact.head_sha ?? "—"}\` |`,
    "",
    hasBaseline
      ? `**Baseline:** ${artifact.suppressed_count ?? 0} finding(s) suppressed by a reviewed baseline.`
      : `**Baseline:** none yet — counts are raw static signal, expect false positives. See [baselines](../../data/skillspector-baselines/README.md).`,
    "",
    "## Findings",
    "",
  );

  const issues = artifact.issues ?? [];
  if (issues.length === 0) {
    lines.push("_No static findings._", "");
    return `${lines.join("\n")}\n`;
  }

  // Group by severity (critical→low), one row each; cap the whole table at 50.
  const bySev = [...issues].sort(
    (a, b) => (SEV_ORDER[a.severity] ?? 9) - (SEV_ORDER[b.severity] ?? 9),
  );
  const CAP = 50;
  lines.push("| Severity | Location | Category | Confidence | Finding |", "|---|---|---|---|---|");
  for (const i of bySev.slice(0, CAP)) {
    const loc = `\`${codeCell(i.location.file)}:${i.location.start_line}\``;
    const finding = textCell(i.finding.trim()).slice(0, 120);
    lines.push(
      `| ${SEV_LABEL[i.severity] ?? i.severity} | ${loc} | ${textCell(i.category)} | ${i.confidence} | ${finding} |`,
    );
  }
  if (bySev.length > CAP) lines.push(`\n_…and ${bySev.length - CAP} more finding(s) — see the artifact JSON._`);
  lines.push("");
  return `${lines.join("\n")}\n`;
}

/** Index README over all in-scope repos + the out-of-scope roster. Pure.
 * `artifact` is undefined for an in-scope repo not yet scanned (partial state). */
export function renderIndex(
  scanned: Array<{ entry: RepoEntry; artifact?: SkillspectorArtifact; hasBaseline: boolean }>,
  outOfScope: Array<{ entry: RepoEntry; reason: string }>,
): string {
  const lines: string[] = [
    "# SkillSpector static scans",
    "",
    "Automated **static** security-pattern scans ([NVIDIA SkillSpector](https://github.com/NVIDIA/SkillSpector)) of every in-scope repo in this atlas. These are **triage signals, not verdicts** — static analysis over-flags heavily (the atlas's safest curated repo scans as CRITICAL/100), so a scanner grade never feeds the curated safety scores in the [main README](../../README.md) or its ranked tables. Grades read `(untriaged)` until a human commits a reviewed [baseline](../../data/skillspector-baselines/README.md) that suppresses the false positives. See [methodology](../methodology.md).",
    "",
    "## Scope",
    "",
    `Scanned: category ∈ {${SCOPE_CATEGORIES.map((c) => `\`${c}\``).join(", ")}}, no terminal hard-flag (${TERMINAL_FLAGS.map((f) => `\`${f}\``).join("/")}), and a \`https://github.com/\` source.`,
    "",
    "| Repo | Grade | Post-baseline C/H/M/L | Suppressed | Baseline? | Report |",
    "|---|---|---|---|---|---|",
  ];

  const sorted = [...scanned].sort((a, b) => a.entry.id.localeCompare(b.entry.id));
  for (const { entry, artifact, hasBaseline } of sorted) {
    const slug = slugFor(entry.id);
    const link = `[report](${slug}.md)`;
    if (!artifact) {
      lines.push(`| \`${entry.id}\` | ⏳ pending | — | — | ${hasBaseline ? "yes" : "no"} | not scanned yet |`);
      continue;
    }
    if (artifact.error) {
      lines.push(
        `| \`${entry.id}\` | ${gradeText(ERROR_GRADE)} | — | — | ${hasBaseline ? "yes" : "no"} | ${link} |`,
      );
      continue;
    }
    const c = artifact.counts ?? { critical: 0, high: 0, medium: 0, low: 0 };
    const grade = scannerGrade(c, hasBaseline);
    lines.push(
      `| \`${entry.id}\` | ${gradeText(grade)} | ${c.critical}/${c.high}/${c.medium}/${c.low} | ${artifact.suppressed_count ?? 0} | ${hasBaseline ? "yes" : "no"} | ${link} |`,
    );
  }

  lines.push("", "## Out of scanner scope", "", "| Entry | Reason |", "|---|---|");
  for (const { entry, reason } of [...outOfScope].sort((a, b) => a.entry.id.localeCompare(b.entry.id))) {
    lines.push(`| \`${entry.id}\` | ${reason} |`);
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}
