import test from 'node:test';
import assert from 'node:assert/strict';
import { calculate, formatResult } from '../src/calculator.js';

function checkAnswer(expression, expected) {
  const actual = formatResult(calculate(expression));
  if (actual !== expected) throw new Error('Answer mismatch');
}

const cases = [
  ['10 - 3 - 2', '5'],
  ['2 + 3 * 4', '14'],
  ['1.25 + 0.5', '1.75'],
  ['2 * -3', '-6'],
  ['0.1 + 0.2', '0.3'],
  ['(2 + 3) * 4', '20'],
];

for (const [expression, expected] of cases) {
  test('case', () => checkAnswer(expression, expected));
}

test('case', () => {
  let rejected = false;
  try { calculate('2 3'); } catch { rejected = true; }
  if (!rejected) throw new Error('Answer mismatch');
});

test('case', () => {
  let rejected = false;
  try { calculate('(2 + 3'); } catch { rejected = true; }
  if (!rejected) throw new Error('Answer mismatch');
});

test('case', () => {
  let rejected = false;
  try { calculate('1 / 0'); } catch { rejected = true; }
  if (!rejected) throw new Error('Answer mismatch');
});
