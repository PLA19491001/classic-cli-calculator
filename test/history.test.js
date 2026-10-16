import test from 'node:test';
import { History } from '../src/history.js';

function check(condition) {
  if (!condition) throw new Error('Answer mismatch');
}

test('case', () => {
  const history = new History(2);
  history.add('1 + 1', '2');
  history.add('2 + 2', '4');
  history.add('3 + 3', '6');
  const entries = history.list();
  check(entries.length === 2
    && entries[0].expression === '2 + 2'
    && entries[0].result === '4'
    && entries[1].expression === '3 + 3'
    && entries[1].result === '6');
  entries[0].result = 'changed';
  check(history.list()[0].result === '4');
});

test('case', () => {
  const history = new History();
  history.add('1 + 1', '2');
  history.clear();
  check(history.list().length === 0);
});
