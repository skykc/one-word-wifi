// One Word for Your Wi-Fi — entry program.
//
// Writes the single word describing my Wi-Fi to /output/entry.txt,
// the artifact the make.fun program/v1 harness grades. The gate
// requires UTF-8 text of 1 to 20 characters, not only whitespace,
// so the file holds exactly the word, with no trailing newline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const WORD = "Buffering";
const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

// The sealed gate requires UTF-8 text of 1 to 20 characters, not only
// whitespace. Validate what was written and fail loudly instead of
// shipping an entry the gate would refuse.
function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 20) {
    throw new Error(`entry is ${chars} chars, gate needs 1-20`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace, gate needs real text");
  }
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, WORD, "utf8");
const written = readFileSync(OUT_FILE, "utf8");
checkGate(written);
if (written !== WORD) {
  throw new Error(`read-back mismatch: ${JSON.stringify(written)}`);
}
console.log(`Wrote ${written.length} chars to ${OUT_FILE}`);
