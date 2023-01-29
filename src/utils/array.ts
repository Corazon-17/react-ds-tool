import { round } from "./math";

export const sortArray = (data: any[], order: "asc" | "desc" = "asc") => {
  if (order === "asc") {
    return data.sort((a, b) => a - b);
  }

  return data.sort((a, b) => b - a);
};

export const sumArray = (data: number[]) => {
  const nonNull = data.filter(Number);

  return nonNull.reduce((acc, val) => acc + val, 0);
};

export const meanArray = (data: number[]) => {
  const nonNull = data.filter(Number);

  return sumArray(nonNull) / nonNull.length;
};

export const modeArray = (data: any[]) => {
  const nonNull = data.filter((val) => val !== undefined && val.trim() !== "");
  const dtype = typeof nonNull[0];

  let obj: any = {};
  nonNull.forEach((val) => {
    if (obj[val]) {
      obj[val]++;
    } else {
      obj[val] = 1;
    }
  });

  const mode = Object.keys(obj).reduce((a, b) => (obj[a] > obj[b] ? a : b));
  const result = dtype === "number" ? Number(mode) : mode;

  return result;
};

export const stdArray = (data: number[]) => {
  const mu = meanArray(data);
  const diff = data.map((dt) => (dt - mu) ** 2);

  return Math.sqrt(sumArray(diff) / (data.length - 1));
};

export const quantile = (data: number[], percent: 25 | 50 | 75) => {
  const sorted = sortArray(data);
  const pos = (data.length - 1) * (percent / 100);
  const base = Math.floor(pos);
  const result =
    sorted[base + 1] !== undefined
      ? sorted[base] + (pos - base) * (sorted[base + 1] - sorted[base])
      : sorted[base];

  return result;
};

/**
 * Count null values (false) in an array.
 * @param data
 * @returns
 */
export const countNull = (data: Array<any>) => {
  // sum = accumulator, dt = each data in array, second argument is initial value
  const result = data.reduce((sum, dt) => sum + (dt === 0 ? 0 : dt ? 0 : 1), 0);

  return result;
};

export const shuffleArray = (data: Array<any>) => {
  const shuffleIdx = [...Array(data.length).keys()]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffleIdx.map((idx) => data[idx]);
};

export const binArray = (data: number[], nBins: number = 8) => {
  let sortedData = sortArray(data);

  const diff = Math.max(...data) - Math.min(...data);
  const binLimit = [...Array(nBins)].map(
    (_, i) => ((i + 1) / nBins) * diff + Math.min(...data)
  );

  const binLabel = binLimit.map(
    (val, i) =>
      `${i === 0 ? round(Math.min(...data), 3) : binLimit[i - 1]} - ${round(
        val,
        3
      )}`
  );
  const binValue = [...Array(nBins)].map((_, i) => {
    const value = sortedData.filter((dt) => dt <= binLimit[i]);
    sortedData.splice(0, value.length);

    return value.length;
  });

  return {
    label: binLabel,
    value: binValue,
  };
};

export const scaleMinMax = (data: number[]) => {
  const min = Math.min(...data);
  const range = Math.max(...data) - min;
  const result = data.map((dt) => (dt - min) / range);

  return result;
};

export const scaleStandard = (data: number[]) => {
  const mu = meanArray(data);
  const std = stdArray(data);
  const result = data.map((dt) => (dt - mu) / std);

  return result;
};

export const scaleRobust = (data: number[]) => {
  const q1 = quantile(data, 25);
  const med = quantile(data, 50);
  const q3 = quantile(data, 75);
  const result = data.map((dt) => (dt - med) / (q3 - q1));

  return result;
};
