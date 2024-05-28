from dataclasses import dataclass
from enum import Enum, auto
from pymini_interpreter import Expr

class TokenType(Enum):
  ADD = auto()
  SUB = auto()
  MUL = auto()
  LITERAL = auto()    

@dataclass
class TokenItem:
  literal: str
  token_type: TokenType

  def __str__(self):
    return f"TokenItem(literal='{self.literal}', token_type={self.token_type})"

  def __repr__(self):
    return self.__str__()

class Parser:
  def __init__(self, tokens: list[TokenItem]):
    self.tokens = tokens
    self.current = 0

  def parse(self) -> Expr:
    return self.expression()
  
  def expression(self) -> Expr:
    return self.mult()
  
  def mult(self) -> Expr:
    expr = self.sub()
    while self.match(TokenType.MUL):
      right = self.sub()
      expr = Expr.Multiply(left=expr, right=right)
    return expr
  
  def sub(self) -> Expr:
    expr = self.add()
    while self.match(TokenType.SUB):
      right = self.add()
      expr = Expr.Subtract(left=expr, right=right)
    return expr
  
  def add(self) -> Expr:
    expr = self.literal()
    while self.match(TokenType.ADD):
      right = self.literal()
      expr = Expr.Add(left=expr, right=right)
    return expr
  
  def literal(self) -> Expr:
    if self.match(TokenType.LITERAL):
      return float(self.prev().literal)
    if self.match(TokenType.MUL):
      self.consume(TokenType.MUL)
    if self.match(TokenType.SUB):
      self.consume(TokenType.SUB)
    if self.match(TokenType.ADD):
      self.consume(TokenType.ADD)
    
  def match(self, *token_types: list[TokenType]):
    for type in token_types:
      if self.check(type):
        self.advance()
        return True
    return False
  
  def advance(self):
    if not self.is_at_end():
      self.current += 1
    return self.prev()
  
  def consume(self, token_type): 
    if self.check(token_type):
      return self.advance()
  
  def check(self, token_type): return not self.is_at_end() and token_type == self.peek().token_type
  
  def peek(self): return self.tokens[self.current]
  
  def prev(self): return self.tokens[self.current - 1]

  def is_at_end(self): return self.current == len(self.tokens)
  
if __name__ == '__main__':
  tokens = [
    TokenItem(literal='2', token_type=TokenType.LITERAL),
    TokenItem(literal='*', token_type=TokenType.MUL),
    TokenItem(literal='2', token_type=TokenType.LITERAL),
    TokenItem(literal='+', token_type=TokenType.ADD),
    TokenItem(literal='3', token_type=TokenType.LITERAL)
  ]
  parser = Parser(tokens)
  print(parser.parse())
