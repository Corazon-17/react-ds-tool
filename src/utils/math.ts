import { Operator } from "@/types";

export const round = (num: number, decimal: number) => {
  return Math.round((num + Number.EPSILON) * 10 ** decimal) / 10 ** decimal;
};

export const mathOperation = (
  val1: number,
  val2: number,
  operator: Operator
) => {
  switch (operator) {
    case "+":
      return val1 + val2;
    case "-":
      return val1 - val2;
    case "x":
      return val1 * val2;
    case "/":
      return val1 / val2;
    case "**":
      return val1 ** val2;
    case "%":
      return val1 % val2;
  }
};
