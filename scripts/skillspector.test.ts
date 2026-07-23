import { describe, expect, it } from "bun:test";
import { existsSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { checkDocs, generateDocs, type DocPaths } from "./skillspector-docs";
import type { RepoEntry } from "./lib/scoring";
import {
  inScope,
  normalizeArtifact,
  outOfScopeReason,
  renderIndex,
  renderRepoDoc,
  scannerGrade,
  serializeArtifact,
  slugFor,
  type SkillspectorArtifact,
} from "./lib/skillspector";

const entry = (over: Partial<RepoEntry>): RepoEntry => ({
  id: "o/r",
  venue: "kalshi",
  category: "mcp-server",
  url: "https://github.com/o/r",
  evidence: ["2026-07-23: x"],
  ...over,
});

describe("scope filter", () => {
  const cases: Array<[string, RepoEntry, boolean]> = [
    ["mcp-server github", entry({ id: "a/mcp", category: "mcp-server" }), true],
    ["agent-framework github", entry({ id: "a/af", category: "agent-framework" }), true],
    ["skill github", entry({ id: "a/sk", category: "skill" }), true],
    ["official_dormant is NOT terminal", entry({ id: "a/od", hard_flags: ["official_dormant"] }), true],
    ["license_missing is NOT terminal", entry({ id: "a/lm", hard_flags: ["license_missing"] }), true],
    ["sdk-client out", entry({ id: "a/sdk", category: "sdk-client" }), false],
    ["cli out", entry({ id: "a/cli", category: "cli" }), false],
    ["data-backtesting out", entry({ id: "a/db", category: "data-backtesting" }), false],
    ["scam terminal out", entry({ id: "a/scam", hard_flags: ["scam"] }), false],
    ["archived terminal out", entry({ id: "a/arc", hard_flags: ["archived"] }), false],
    ["key_exfil terminal out", entry({ id: "a/ke", hard_flags: ["key_exfil"] }), false],
    ["registry-only (no url) out", entry({ id: "regonly", url: undefined, packages: { pypi: "p" } }), false],
    ["non-github url out", entry({ id: "a/gl", url: "https://gitlab.com/a/gl" }), false],
  ];
  for (const [name, e, want] of cases) {
    it(name, () => expect(inScope(e)).toBe(want));
  }

  it("exact selection over a mixed list", () => {
    const list = cases.map(([, e]) => e);
    const selected = list.filter(inScope).map((e) => e.id);
    expect(selected).toEqual(["a/mcp", "a/af", "a/sk", "a/od", "a/lm"]);
  });

  it("outOfScopeReason names the disqualifier and is undefined for in-scope", () => {
    expect(outOfScopeReason(entry({ category: "mcp-server" }))).toBeUndefined();
    expect(outOfScopeReason(entry({ category: "sdk-client" }))).toContain("threat-model mismatch");
    expect(outOfScopeReason(entry({ hard_flags: ["scam"] }))).toContain("terminal");
    expect(outOfScopeReason(entry({ url: undefined, packages: { pypi: "p" } }))).toContain("registry-only");
  });
});

describe("scanner grade (post-baseline counts)", () => {
  const c = (critical: number, high: number, medium: number, low: number) => ({ critical, high, medium, low });
  it("critical > 0 → flagged-critical", () => {
    expect(scannerGrade(c(1, 0, 0, 0), true)).toEqual({ emoji: "🔴", label: "flagged-critical" });
  });
  it("high only → needs-triage", () => {
    expect(scannerGrade(c(0, 2, 0, 0), true)).toEqual({ emoji: "🟠", label: "needs-triage" });
  });
  it("medium/low only → minor-signals", () => {
    expect(scannerGrade(c(0, 0, 0, 3), true)).toEqual({ emoji: "🟡", label: "minor-signals" });
  });
  it("zero → clean", () => {
    expect(scannerGrade(c(0, 0, 0, 0), true)).toEqual({ emoji: "🟢", label: "clean" });
  });
  it("no baseline appends (untriaged), keeps the emoji", () => {
    expect(scannerGrade(c(1, 0, 0, 0), false)).toEqual({ emoji: "🔴", label: "flagged-critical (untriaged)" });
    expect(scannerGrade(c(0, 0, 0, 0), false)).toEqual({ emoji: "🟢", label: "clean (untriaged)" });
  });
});

// Raw report fixture: has a wall-clock scanned_at + temp source path, verbose
// per-issue fields to drop, and issues in NON-sorted order.
const rawReport = (): Record<string, unknown> => ({
  skill: { name: "unknown", source: "/tmp/skillspector_abc/repo", scanned_at: "2026-07-23T08:21:38.475080+00:00" },
  risk_assessment: { score: 100, severity: "CRITICAL", recommendation: "DO_NOT_INSTALL" },
  components: [{ path: "a.py", type: "python", lines: 10 }],
  issues: [
    {
      id: "AST7",
      category: "Dangerous Code Execution",
      pattern: "getattr",
      severity: "LOW",
      confidence: 0.5,
      location: { file: "src/z.py", start_line: 31, end_line: 31 },
      finding: "level=getattr(logging, level)",
      explanation: "dynamic getattr",
      remediation: "use a dict",
      code_snippet: "def foo(): ...",
      tags: ["Dangerous Code Execution"],
    },
    {
      id: "AST1",
      category: "Injection",
      pattern: "eval",
      severity: "HIGH",
      confidence: 0.9,
      location: { file: "src/a.py", start_line: 5, end_line: 6 },
      finding: "eval(x)",
      explanation: "eval",
      remediation: "no eval",
      code_snippet: "eval(x)",
      tags: [],
    },
    {
      id: "AST2",
      category: "Injection",
      pattern: "eval",
      severity: "CRITICAL",
      confidence: 1.0,
      location: { file: "src/a.py", start_line: 5, end_line: 5 },
      finding: "exec(x)",
      explanation: "exec",
      remediation: "no exec",
      code_snippet: "exec(x)",
      tags: [],
    },
  ],
  suppressed_count: 2,
  suppressed: [{ id: "X" }],
  metadata: { skillspector_version: "2.3.7", llm_requested: false },
  analysis_completeness: { coverage_percent: 100, is_complete: false, findings_before_filtering: 76 },
});

describe("artifact normalizer", () => {
  it("strips scanned_at + source, drops verbose fields, sorts issues, counts by severity", () => {
    const a = normalizeArtifact(rawReport(), "o/r", "abc123def456");
    const json = serializeArtifact(a);
    expect(json).not.toContain("scanned_at");
    expect(json).not.toContain("skillspector_abc"); // temp source path gone
    expect(json).not.toContain("code_snippet");
    expect(json).not.toContain("remediation");
    expect(json).not.toContain("pattern");
    expect(json).not.toContain("tags");
    expect(a.head_sha).toBe("abc123def456");
    expect(a.skillspector_version).toBe("2.3.7");
    expect(a.counts).toEqual({ critical: 1, high: 1, medium: 0, low: 1 });
    expect(a.suppressed_count).toBe(2);
    expect(a.analysis_completeness).toEqual({ coverage_percent: 100, is_complete: false });
    // sorted by (file, start_line, id): a.py:5 AST1, a.py:5 AST2, z.py:31 AST7
    expect(a.issues!.map((i) => i.id)).toEqual(["AST1", "AST2", "AST7"]);
    // trimmed issue keeps exactly the seven kept keys
    expect(Object.keys(a.issues![0]!).sort()).toEqual(
      ["category", "confidence", "explanation", "finding", "id", "location", "severity"],
    );
  });

  it("is deterministic — normalize twice → byte-identical", () => {
    const one = serializeArtifact(normalizeArtifact(rawReport(), "o/r", "abc"));
    const two = serializeArtifact(normalizeArtifact(rawReport(), "o/r", "abc"));
    expect(one).toBe(two);
  });
});

describe("doc generator purity", () => {
  const e = entry({ id: "o/r" });
  const artifact = (): SkillspectorArtifact => normalizeArtifact(rawReport(), "o/r", "abc123def456");

  it("renderRepoDoc twice → identical", () => {
    expect(renderRepoDoc(artifact(), e, false)).toBe(renderRepoDoc(artifact(), e, false));
  });

  it("untriaged doc flags the baseline gap; triaged does not", () => {
    expect(renderRepoDoc(artifact(), e, false)).toContain("none yet");
    expect(renderRepoDoc(artifact(), e, true)).not.toContain("none yet");
  });

  it("escapes attacker-controlled file paths, categories and findings so the table can't be broken", () => {
    const evil = normalizeArtifact(
      {
        risk_assessment: { score: 1, severity: "LOW", recommendation: "x" },
        metadata: { skillspector_version: "1" },
        analysis_completeness: { coverage_percent: 100, is_complete: true },
        issues: [
          {
            id: "E1",
            category: "In|jec\ntion",
            severity: "HIGH",
            confidence: 0.9,
            location: { file: "src/ev`il|col.py", start_line: 5, end_line: 6 },
            finding: "<!-- unclosed html comment | pipe and\nnewline",
          },
        ],
      },
      "o/r",
      "abc",
    );
    const row = renderRepoDoc(evil, e, true).split("\n").find((l) => l.includes("col.py"))!;
    // A 5-column row has exactly 6 unescaped pipe delimiters — no injected columns.
    const delimiters = (row.match(/(?<!\\)\|/g) ?? []).length;
    expect(delimiters).toBe(6);
    expect(row).not.toContain("`il|col"); // backtick in path neutralized, span intact
    expect(row).not.toContain("<!--"); // no HTML comment can open and hide the rest of the doc
    expect(row).toContain("&lt;!--"); // rendered as literal text instead
  });

  it("error artifact renders the scan-error grade, not a findings table", () => {
    const doc = renderRepoDoc({ id: "o/r", head_sha: "abc", error: "clone failed" }, e, false);
    expect(doc).toContain("scan-error");
    expect(doc).toContain("clone failed");
    expect(doc).not.toContain("| Severity |");
  });

  it("escapes attacker-controlled error text so it can't hide the rest of the doc", () => {
    const doc = renderRepoDoc(
      { id: "o/r", head_sha: "abc", error: "fatal: <!-- oops\nsecond line" },
      e,
      false,
    );
    expect(doc).not.toContain("<!--"); // no HTML comment can open
    expect(doc).toContain("&lt;!--"); // rendered as literal text
    expect(doc.split("\n").find((l) => l.includes("did not complete"))).not.toContain("\n");
  });

  it("renderIndex twice → identical, and handles pending (no artifact)", () => {
    const rows = [
      { entry: e, artifact: artifact(), hasBaseline: false },
      { entry: entry({ id: "o/pending" }), hasBaseline: false },
    ];
    const oos = [{ entry: entry({ id: "o/sdk", category: "sdk-client" }), reason: "sdk" }];
    expect(renderIndex(rows, oos)).toBe(renderIndex(rows, oos));
    expect(renderIndex(rows, oos)).toContain("⏳ pending");
  });
});

describe("slug", () => {
  it("owner/repo → owner__repo", () => expect(slugFor("cejor6/kalshi-mcp-server")).toBe("cejor6__kalshi-mcp-server"));
});

// ── docs generator: orphan cleanup + offline drift gate (hermetic tmp tree) ──
describe("generateDocs / checkDocs", () => {
  const setup = (): DocPaths => {
    const base = mkdtempSync(`${tmpdir()}/skillspector-docs-`);
    const paths: DocPaths = {
      repos: `${base}/repos.yaml`,
      artifactDir: `${base}/data`,
      baselineDir: `${base}/baselines`,
      docsDir: `${base}/docs`,
    };
    mkdirSync(paths.artifactDir, { recursive: true });
    mkdirSync(paths.docsDir, { recursive: true });
    // One in-scope entry (o/keep) + one out-of-scope (o/cli).
    const scores = "    scores: { provenance: 3, capability: 3, safety: 3, agent_fit: 3 }\n";
    writeFileSync(
      paths.repos,
      "entries:\n" +
        "  - id: o/keep\n    venue: kalshi\n    category: mcp-server\n    url: https://github.com/o/keep\n    evidence: ['2026-07-23: x']\n" +
        scores +
        "  - id: o/cli\n    venue: kalshi\n    category: cli\n    url: https://github.com/o/cli\n    evidence: ['2026-07-23: x']\n" +
        scores,
    );
    writeFileSync(`${paths.artifactDir}/o__keep.json`, serializeArtifact(normalizeArtifact(rawReport(), "o/keep", "abc")));
    return paths;
  };

  it("generate then check → in sync (no drift)", () => {
    const paths = setup();
    generateDocs(paths);
    expect(checkDocs(paths)).toEqual([]);
    expect(existsSync(`${paths.docsDir}/o__keep.md`)).toBe(true);
    expect(existsSync(`${paths.docsDir}/README.md`)).toBe(true);
  });

  it("a delisted repo's stale doc + artifact are orphans → drift, then deleted", () => {
    const paths = setup();
    generateDocs(paths);
    // Simulate a repo that was scanned, then delisted from repos.yaml.
    writeFileSync(`${paths.artifactDir}/o__gone.json`, serializeArtifact(normalizeArtifact(rawReport(), "o/gone", "old")));
    writeFileSync(`${paths.docsDir}/o__gone.md`, "# stale report\n");

    const drift = checkDocs(paths);
    expect(drift).toContain("orphan docs/skillspector/o__gone.md");
    expect(drift).toContain("orphan data/skillspector/o__gone.json");

    generateDocs(paths); // cleanup pass
    expect(existsSync(`${paths.docsDir}/o__gone.md`)).toBe(false);
    expect(existsSync(`${paths.artifactDir}/o__gone.json`)).toBe(false);
    expect(checkDocs(paths)).toEqual([]);
  });

  it("a hand-edited doc is stale drift", () => {
    const paths = setup();
    generateDocs(paths);
    writeFileSync(`${paths.docsDir}/o__keep.md`, "HAND EDITED\n");
    expect(checkDocs(paths)).toContain("stale docs/skillspector/o__keep.md");
  });
});
