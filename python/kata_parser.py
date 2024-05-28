from dataclasses import dataclass
from enum import Enum, auto
from pymini_interpreter import Expr


class TkType(Enum):
  LITERAL = auto()
  ADD     = auto()
  SUB     = auto()
  MUL     = auto()
  DIV     = auto()

@dataclass
class Tk:
  literal: str
  ttype: TkType

  def __repr__(self):
    return str(self.literal)
  
class MiniParser:
  def __init__(self, tokens: list[Tk]):
    self.tokens = tokens
    self.cur    = 0

  def peek(self): return self.tokens[self.cur]
  
  def prev(self): return self.tokens[self.cur - 1]

  def at_end(self): return self.cur == len(self.tokens)

  def advance(self):
    if not self.at_end():
      self.cur += 1
    return self.prev()
  
  def check(self, ttype):
    if self.at_end():
      return False
    return self.peek().ttype == ttype

  def match(self, ttype):
    if self.check(ttype):
      self.advance()
      return True
    return False
  
  def consume(self, ttype):
    if self.check(ttype):
      self.advance()
      return self.prev()

  def parse(self):
    return self.expression()

  def expression(self):
    return self.mul()
  
  def mul(self):
    expr = self.sub()
    if self.match(TkType.MUL):
      right = self.sub()
      expr  = Expr.Multiply(left=expr, right=right)
    return expr
  
  def sub(self):
    expr = self.add()
    if self.match(TkType.SUB):
      right = self.add()
      expr  = Expr.Sub(left=expr, right=right)
    return expr
  
  def add(self):
    expr = self.literal()
    if self.match(TkType.ADD):
      right = self.literal()
      expr  = Expr.Add(left=expr, right=right)
    return expr
  
  def literal(self):
    if self.match(TkType.LITERAL):
      return Expr.Literal(self.prev().literal)


if __name__ == '__main__':
  tokens = [
    Tk(literal='2', ttype=TkType.LITERAL),
    Tk(literal='*', ttype=TkType.MUL),
    Tk(literal='2', ttype=TkType.LITERAL),
    Tk(literal='+', ttype=TkType.ADD),
    Tk(literal='3', ttype=TkType.LITERAL)
  ]
  parser = MiniParser(tokens)
  print(parser.parse())
