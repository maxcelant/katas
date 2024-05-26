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
        def visit_mul_expr(self, expr: Expr.Multiply):
            pass

    @abstractmethod
    def accept(self, visitor: Expr.Visitor):
        pass

    class Literal:
        def __init__(self, value):
            self.value = value

        def accept(self, visitor: Expr.Visitor):
            return visitor.visit_literal_expr(self)

        def __repr__(self):
            return f'Literal({self.value=})'
    
    class Add:
        def __init__(self, right, left):
            self.right = right
            self.left = left

        def accept(self, visitor: Expr.Visitor):
            return visitor.visit_add_expr(self)

        def __repr__(self):
            return f'Add({self.right=}, {self.left=})'

    class Subtract:
        def __init__(self, right, left):
            self.right = right
            self.left = left 

        def accept(self, visitor: Expr.Visitor):
            return visitor.visit_sub_expr(self)

        def __repr__(self):
            return f'Sub({self.right=}, {self.left=})'
        
    class Multiply:
        def __init__(self, right, left):
            self.right = right
            self.left = left 

        def accept(self, visitor: Expr.Visitor):
            return visitor.visit_mul_expr(self)

        def __repr__(self):
            return f'Mul({self.right=}, {self.left=})'
    

class Interpreter(Expr.Visitor):
    def solve(self, expr: Expr):
        return expr.accept(self)

    def visit_literal_expr(self, expr: Expr.Literal):
        return expr.value

    def visit_add_expr(self, expr: Expr.Add):
        left   = self.solve(expr.left)
        right  = self.solve(expr.right)
        return float(left) + float(right)
    
    def visit_sub_expr(self, expr: Expr.Subtract):
        left  = self.solve(expr.left)
        right = self.solve(expr.right)
        return float(left) - float(right)
    
    def visit_mul_expr(self, expr: Expr.Multiply):
        left  = self.solve(expr.left)
        right = self.solve(expr.right)
        return float(left) * float(right)


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
