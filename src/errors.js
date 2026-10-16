export class CalculatorError extends Error {
  constructor(message, code = 'CALCULATION_ERROR') {
    super(message);
    this.name = 'CalculatorError';
    this.code = code;
  }
}

export class TokenizeError extends CalculatorError {
  constructor(message) {
    super(message, 'TOKENIZE_ERROR');
    this.name = 'TokenizeError';
  }
}

export class ParseError extends CalculatorError {
  constructor(message) {
    super(message, 'PARSE_ERROR');
    this.name = 'ParseError';
  }
}

export class DivisionByZeroError extends CalculatorError {
  constructor() {
    super('Division by zero.', 'DIVISION_BY_ZERO');
    this.name = 'DivisionByZeroError';
  }
}
