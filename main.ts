// Everyday Wonder — one sentence, ≤200 chars, written to $MAKEFUN_OUTPUT_DIR/entry.txt
// No dependencies; only mkdirSync + writeFileSync (+ console.log) so it runs
// as an unprivileged user on a read-only filesystem.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My shadow arrived home before I did and waited on the step, patient as a dog that already knew the way.";

const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) throw new Error(`entry must be 1-200 chars, got ${chars}`);
if (ENTRY.trim().length === 0) throw new Error("entry must not be only whitespace");
if (ENTRY.includes("\n") || ENTRY.includes("\r")) throw new Error("entry must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
// Round-trip check on our own output only: the file must read back byte-identical.
const back = readFileSync(join(outDir, "entry.txt"), "utf8");
if (back !== ENTRY) throw new Error("round-trip mismatch: entry.txt does not match ENTRY");
console.log(`wrote entry.txt (${chars} chars, ${Buffer.byteLength(ENTRY, "utf8")} bytes)`);
