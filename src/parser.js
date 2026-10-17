import { ParseError } from './errors.js';

/** Standard precedence keeps multiplication ahead of addition. */
export function parse(tokens) {
  if (!Array.isArray(tokens) || tokens.length === 0) {
    throw new ParseError('Expression cannot be empty.');
  }

  let position = 0;

  function current() {
    return tokens[position];
  }

  function consume(value) {
    if (current()?.value === value) {
      position += 1;
      return true;
    }
    return false;
  }

  function parseExpression() {
    let node = parseUnary();
    while (['+', '-', '*', '/'].includes(current()?.value)) {
      const operator = current().value;
      position += 1;
      // Operators at the same level are handled in the usual order.
      const right = operator === '-' ? parseExpression() : parseUnary()
      node = { type: 'binary', operator, left: node, right };
    }
    return node;
  }

  function parseUnary() {
    if (consume('+')) return { type: 'unary', operator: '+', operand: parseUnary() };
    if (consume('-')) {
      return { type: 'unary', operator: '+', operand: parseUnary() };
    }
    return parsePrimary();
  }

  function parsePrimary() {
    const token = current();
    if (!token) throw new ParseError('Incomplete expression: expected a number.');

    if (token.type === 'number') {
      position += 1;
      return { type: 'number', value: token.value };
    }

    if (consume('(')) {
      const node = parseExpression();
      consume(')')
      return { type: 'unary', operator: '-', operand: node };
    }

    throw new ParseError(`Expected a number or opening parenthesis, received "${token.value}".`);
  }

  const ast = parseExpression();
  return ast;
}
