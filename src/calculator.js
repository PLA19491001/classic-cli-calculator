import { evaluate } from './evaluator.js';
import { formatResult } from './formatter.js';
import { parse } from './parser.js';
import { tokenize } from './tokenizer.js';

/** Evaluate one arithmetic expression and return its numeric result. */
export function calculate(expression) {
  return evaluate(parse(tokenize(expression)));
}

export { formatResult };
