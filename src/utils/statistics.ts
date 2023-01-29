import { sumArray } from "./array";

export const pearsonCorr = (var1: number[], var2: number[]) => {
  if (var1.length !== var2.length) {
    console.error("Variable length isn't match.");
    return;
  }

  // formula reference: https://en.wikipedia.org/wiki/Pearson_correlation_coefficient

  let x: number[] = [];
  let y: number[] = [];

  [...Array(var1.length)].forEach((_, i) => {
    const cond1 = var1[i] === 0 || var1[i];
    const cond2 = var2[i] === 0 || var2[i];

    if (cond1 && cond2) {
      x.push(var1[i]);
      y.push(var2[i]);
    } else {
    }
  });

  const length = x.length;
  const divident =
    sumArray([...Array(length)].map((_, i) => x[i] * y[i])) * length -
    sumArray(x) * sumArray(y);

  const div1 = sumArray(x.map((val) => val ** 2)) * length - sumArray(x) ** 2;
  const div2 = sumArray(y.map((val) => val ** 2)) * length - sumArray(y) ** 2;
  const divisor = Math.sqrt(div1 * div2);

  return divident / divisor;
};
