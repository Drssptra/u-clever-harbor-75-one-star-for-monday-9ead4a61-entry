// One-star review of Monday, written as a restaurant complaint.
// The diner asked for the weekend special and was served Monday
// instead: cold coffee, a full inbox, and a bill covering both days.
// The review is assembled from clauses, checked against the
// competition gate (1-180 chars, one line, at most 25 words),
// then saved to entry.txt with no trailing newline.

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

function buildReview(): string {
  const clauses = [
    "One star.",
    "I ordered the weekend special; the server brought Monday instead",
    "— cold coffee, a full inbox, and the bill for both days.",
  ];
  return clauses.join(" ");
}

function checkReview(text: string): void {
  const words = text.trim().split(/\s+/);
  const problems: string[] = [];
  if (text.length < 1 || text.length > 180) {
    problems.push(`length ${text.length} is outside 1-180`);
  }
  if (words.length > 25) {
    problems.push(`${words.length} words exceeds the 25-word cap`);
  }
  if (/[\r\n]/.test(text)) {
    problems.push("must be a single line");
  }
  if (text.trim() === "") {
    problems.push("must not be blank");
  }
  if (problems.length > 0) {
    throw new Error(`invalid review: ${problems.join("; ")}`);
  }
}

function saveReview(text: string): void {
  // Default mirrors the scorer's /output when no dir is supplied.
  const dir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  // No trailing newline: write the exact review bytes only.
  writeFileSync(resolve(dir, "entry.txt"), text, { encoding: "utf8" });
}

const review = buildReview();
checkReview(review);
saveReview(review);
process.stdout.write(`${review}\n`);
