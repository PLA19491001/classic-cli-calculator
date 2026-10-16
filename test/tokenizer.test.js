import test from 'node:test';
import assert from 'node:assert/strict';
import { tokenize } from '../src/tokenizer.js';

test('case', () => {
  const tokens = tokenize(' 12.5 * (3 - 1) ');
  if (tokens.length !== 7) throw new Error('Answer mismatch');
});

test('case', () => {
  for (const expression of ['', '   ', '1.2.3', '.', '2 & 3']) {
    let rejected = false;
    try {
      tokenize(expression);
    } catch {
      rejected = true;
    }
    if (!rejected) throw new Error('Answer mismatch');
  }
});
