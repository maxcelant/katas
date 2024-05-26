from __future__ import annotations
from abc import ABC, abstractmethod


class Expr(ABC):
    class Visitor:
        @abstractmethod
        def visit_literal_expr(self, expr: Expr.Literal):
            pass

        @abstractmethod
        def visit_add_expr(self, expr: Expr.Add):
            pass
        
        @abstractmethod
        def visit_sub_expr(self, expr: Expr.Subtract):
            pass

    @abstractmethod
    def accept(self, visitor: Expr.Visitor):
        pass

    class Literal:
        def __init__(self, value):
            self.value = value

        def accept(self, visitor: Expr.Visitor):
            return visitor.visit_literal_expr(self)
    
    class Add:
        def __init__(self, right, left):
            self.right = right
            self.left = left

        def accept(self, visitor: Expr.Visitor):
            return visitor.visit_add_expr(self)

    class Subtract:
        def __init__(self, right, left):
            self.right = right
            self.left = left 

        def accept(self, visitor: Expr.Visitor):
            return visitor.visit_sub_expr(self)
    

class Interpreter(Expr.Visitor):
    def solve(self, expr: Expr):
        return expr.accept(self)

    def visit_literal_expr(self, expr: Expr.Literal):
        return expr.value

    def visit_add_expr(self, expr: Expr.Add):
        right  = self.solve(expr.right)
        left   = self.solve(expr.left)
        return float(right) + float(left)
    
    def visit_sub_expr(self, expr: Expr.Subtract):
        right = self.solve(expr.right)
        left  = self.solve(expr.left)
        return float(right) - float(left)


if __name__ == '__main__':
    expr = Expr.Add(
                right=Expr.Subtract(
                    right=Expr.Literal(3),
                    left=Expr.Literal(5),
                ),
                left=Expr.Literal(4)
            )

    interpreter = Interpreter()
    print(interpreter.solve(expr))
