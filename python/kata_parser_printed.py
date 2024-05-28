from dataclasses import dataclass
from enum import Enum, auto
from pymini_interpreter import Expr
import time

class TkType(Enum):
    LITERAL = auto()
    ADD = auto()
    SUB = auto()
    MUL = auto()
    DIV = auto()

@dataclass
class Tk:
    literal: str
    ttype: TkType

    def __repr__(self):
        return str(self.literal)

class MiniParser:
    def __init__(self, tokens: list[Tk]):
        self.tokens = tokens
        self.cur = 0

    def peek(self):
        return self.tokens[self.cur]

    def prev(self):
        return self.tokens[self.cur - 1]

    def at_end(self):
        return self.cur == len(self.tokens)

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
            print(f"Matched {ttype}, advancing from token {self.cur}: {self.peek()}")
            self.advance()
            return True
        return False

    def consume(self, ttype):
        if self.check(ttype):
            self.advance()
            return self.prev()

    def parse(self):
        print("Starting parse")
        result = self.expression()
        print("Finished parse")
        return result

    def expression(self):
        print(f"Entering expression at token {self.cur}: {self.peek()}")
        time.sleep(1)
        result = self.mul()
        print(f"Exiting expression at token {self.cur}")
        return result

    def mul(self):
        print(f"Entering mul at token {self.cur}: {self.peek()}")
        time.sleep(1)
        expr = self.sub()
        while self.match(TkType.MUL):
            print(f"Handling MUL at token {self.cur}: {self.peek()}")
            time.sleep(1)
            right = self.sub()
            expr = Expr.Multiply(left=expr, right=right)
        print(f"Exiting mul at token {self.cur}")
        return expr

    def sub(self):
        print(f"Entering sub at token {self.cur}: {self.peek()}")
        time.sleep(1)
        expr = self.add()
        while self.match(TkType.SUB):
            print(f"Handling SUB at token {self.cur}: {self.peek()}")
            time.sleep(1)
            right = self.add()
            expr = Expr.Sub(left=expr, right=right)
        print(f"Exiting sub at token {self.cur}")
        return expr

    def add(self):
        print(f"Entering add at token {self.cur}: {self.peek()}")
        time.sleep(1)
        expr = self.literal()
        while self.match(TkType.ADD):
            print(f"Handling ADD at token {self.cur}: {self.peek()}")
            time.sleep(1)
            right = self.literal()
            expr = Expr.Add(left=expr, right=right)
        print(f"Exiting add at token {self.cur}")
        return expr

    def literal(self):
        print(f"Entering literal at token {self.cur}: {self.peek()}")
        time.sleep(1)
        if self.match(TkType.LITERAL):
            result = Expr.Literal(self.prev().literal)
            print(f"Matched LITERAL: {result} at token {self.cur}")
            return result
        print(f"Exiting literal at token {self.cur}")
        return None

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
