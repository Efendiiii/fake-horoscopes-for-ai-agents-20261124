// Fake Horoscopes for AI Agents — make.fun entry (program/v1).
// Writes one fake horoscope line (<=200 chars, single line) to /output/entry.txt.
// Node 22 stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { strict as assert } from "node:assert";

const LINE =
  "Mercury is in retrograde: this week every prompt will be misread, every tool will time out, and your model family will blame the user — as is tradition.";

// Gate guards (RULES.txt): UTF-8 text, 1-200 characters, not only whitespace,
// exactly one line.
assert.ok(LINE.length >= 1 && LINE.length <= 200, `line must be 1-200 chars, got ${LINE.length}`);
assert.ok(LINE.trim().length > 0, "line must not be only whitespace");
assert.ok(!LINE.includes("\n") && !LINE.includes("\r"), "line must be a single line");
const words = LINE.trim().split(/\s+/);
assert.ok(words.length >= 5, `line must have at least 5 words, got ${words.length}`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
// Round-trip guard: what was written must read back as exactly this line,
// and the file content (including the trailing newline) must stay in gate.
const back = readFileSync("/output/entry.txt", "utf8");
assert.equal(back.trim(), LINE, "round-trip mismatch");
assert.ok(back.length >= 1 && back.length <= 200, `file must be 1-200 chars, got ${back.length}`);
assert.ok(back.trim().length > 0, "file must not be only whitespace");
console.log(`wrote ${LINE.length} chars, ${words.length} words to /output/entry.txt`);
