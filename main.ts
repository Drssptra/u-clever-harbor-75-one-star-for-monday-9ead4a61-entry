// One Star for Monday — a single-line, one-star review of Monday,
// written as if Monday were a restaurant: a bad table, a worse dish,
// and a bill for a weekend that never happened. The program prints the
// review to stdout and writes the exact same text (no trailing
// newline) to $MAKEFUN_OUTPUT_DIR/entry.txt for the sealed scorer.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "One star. Monday seated me by the kitchen, served a cold alarm clock for breakfast, and billed me for the weekend I never got.";

// The gate wants 1 to 180 characters, a single line, not only
// whitespace; the judge brief caps the review at 25 words.
const wordCount = ENTRY.split(/\s+/).filter(Boolean).length;
if (ENTRY.length < 1 || ENTRY.length > 180 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${ENTRY.length} characters, outside the 1-180 gate`);
}
if (wordCount > 25) {
  throw new Error(`entry is ${wordCount} words, over the 25-word cap`);
}
if (ENTRY.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

console.log(ENTRY);
