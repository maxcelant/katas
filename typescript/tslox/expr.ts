
// interface Visitor {
//   visit_div_expr(expr: Expr): Expr;
//   visit_mul_expr(expr: Expr): Expr;
//   visit_sub_expr(expr: Expr): Expr;
//   visit_add_expr(expr: Expr): Expr;
//   visit_literal_expr(expr: Expr): Expr;
// }

// interface Expr {
//   accept(visitor: Visitor): Expr;
// }

// class Div implements Expr {
//   constructor(public left: Expr, public right: Expr) {};

//   accept(visitor: Visitor): Expr {
//     return visitor.visit_div_expr(this);
//   }
// }

// class Mul implements Expr {
//   constructor(public left: Expr, public right: Expr) {};

//   accept(visitor: Visitor): Expr {
//     return visitor.visit_mul_expr(this);
//   }
// }

// class Sub implements Expr {
//   constructor(public left: Expr, public right: Expr) {};

//   accept(visitor: Visitor): Expr {
//     return visitor.visit_sub_expr(this);
//   }
// }

// class Add implements Expr {
//   constructor(public left: Expr, public right: Expr) {};

//   accept(visitor: Visitor): Expr {
//     return visitor.visit_add_expr(this);
//   }
// }

// class Literal implements Expr {
//   constructor(public value: object) {};

//   accept(visitor: Visitor): Expr {
//     return visitor.visit_literal_expr(this);
//   }
// }
  