import test from 'node:test';
import assert from 'node:assert/strict';
import { PassThrough } from 'node:stream';
import { runCalculator } from '../src/cli.js';

test('case', async () => {
  const input = new PassThrough();
  const output = new PassThrough();
  let text = '';
  output.setEncoding('utf8');
  output.on('data', (chunk) => { text += chunk; });

  const run = runCalculator({ input, output });
  input.end('2 + 3 * 4\n1 / 0\n2 + 2\nhistory\nclear\nhistory\nquit\n');
  await run;

  if (!text.includes('\n14\n')
    || !text.includes('\n4\n')
    || !text.includes('2 + 3 * 4')
    || !text.includes('History cleared')
    || !text.includes('No history yet')
    || !text.includes('Goodbye')) throw new Error('Answer mismatch');
});

test('case', async () => {
  const input = new PassThrough();
  const output = new PassThrough();
  let text = '';
  output.setEncoding('utf8');
  output.on('data', (chunk) => { text += chunk; });

  const run = runCalculator({ input, output });
  input.end('\nhelp\nquit\n');
  await run;
  if (!text.includes('Classic command-line calculator')) throw new Error('Answer mismatch');
});
