
interface Visitor {
  visit_div_expr(expr: Expr): Expr;
  visit_mul_expr(expr: Expr): Expr;
  visit_sub_expr(expr: Expr): Expr;
  visit_add_expr(expr: Expr): Expr;
  visit_literal_expr(expr: Expr): Expr;
}

interface Expr {
  accept(visitor: Visitor): Expr;
}

class Div implements Expr {
  constructor(public left: Expr, public right: Expr) {};

  accept(visitor: Visitor): Expr {
    return visitor.visit_div_expr(this);
  }
}

class Mul implements Expr {
  constructor(public left: Expr, public right: Expr) {};

  accept(visitor: Visitor): Expr {
    return visitor.visit_mul_expr(this);
  }
}

class Sub implements Expr {
  constructor(public left: Expr, public right: Expr) {};

  accept(visitor: Visitor): Expr {
    return visitor.visit_sub_expr(this);
  }
}

class Add implements Expr {
  constructor(public left: Expr, public right: Expr) {};

  accept(visitor: Visitor): Expr {
    return visitor.visit_add_expr(this);
  }
}

class Literal implements Expr {
  constructor(public value: object) {};

  accept(visitor: Visitor): Expr {
    return visitor.visit_literal_expr(this);
  }
}

enum TokenType {
  LITERAL,
  ADD,
  SUB,
  MUL,
  DIV
}

type Token = {
  literal: any;
  type: TokenType;
}

class Parser {
  tokens: Token[];
  count: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.count  = 0;
  }

  peek() {
    return this.tokens[this.count];
  }

  prev() {
    return this.tokens[this.count - 1];
  }

  isAtEnd() {
    return this.count === this.tokens.length;
  }

  advance() {
    if (!this.isAtEnd())
      this.count += 1;
    return this.prev();
  }

  check(type: TokenType) {
    if (this.isAtEnd()) 
      return false;
    return type === this.peek().type;
  }

  consume(type: TokenType) {
    if (this.check(type)) {
      return this.advance();
    }
  }

  match(...types: TokenType[]) {
    for (const t of types) {
      if (this.check(t)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  parse() {
    return this.expression();
  }

  expression() {
    return this.div();
  }

  div() {
    let expr: Expr = this.mul();
    if (this.match(TokenType.DIV)) {
      const right = this.mul();
      expr = new Div(expr, right);
    }
    return expr;
  }

  mul() {
    let expr: Expr = this.sub();
    if (this.match(TokenType.MUL)) {
      const right = this.sub();
      expr = new Mul(expr, right);
    }
    return expr;
  }

  sub() {
    let expr: Expr = this.add();
    if (this.match(TokenType.SUB)) {
      const right = this.add();
      expr = new Sub(expr, right);
    }
    return expr;
  }

  add() {
    let expr: Expr = this.literal();
    if (this.match(TokenType.ADD)) {
      const right = this.literal();
      expr = new Add(expr, right);
    }
    return expr;
  }

  literal() {
    if (this.match(TokenType.LITERAL)) {
      return new Literal(this.prev().literal);
    }
    throw new Error('error occured while parsing')
  }
}

function main() {
  const tokens: Token[] = [
    { literal: '2', type: TokenType.LITERAL },
    { literal: '*', type: TokenType.MUL },
    { literal: '3', type: TokenType.LITERAL },
    { literal: '+', type: TokenType.ADD },
    { literal: '5', type: TokenType.LITERAL },
  ]

  const parser = new Parser(tokens);
  console.log(parser.parse());
}

main();

