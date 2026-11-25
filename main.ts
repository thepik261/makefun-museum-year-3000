// Museum of the Year 3000 — make.fun bounty entry.
// Writes one line, in English: the museum label a museum in the year
// 3000 puts next to an ordinary object from today (a house key), to
// /output/entry.txt. The sealed gate requires 1-200 UTF-8 characters,
// not only whitespace; pure Node stdlib, deterministic, no network.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;

const LINE =
  "House key, circa 2025: humans carried tiny metal sticks to open doors, because apparently remembering a password for your own front door was too much.";

if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(`entry line must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry line must not be blank");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
try {
  chmodSync(outPath, 0o644);
} catch {
  // best effort; file is already written
}
