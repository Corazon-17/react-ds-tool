import { Dataset, Operator } from "@/types";
import {
  countNull,
  meanArray,
  modeArray,
  quantile,
  scaleMinMax,
  scaleRobust,
  scaleStandard,
  stdArray,
} from "./array";
import { mathOperation, round } from "./math";
import { filterByKeys, filterWithoutKeys, objectFromArray } from "./object";
import { pearsonCorr } from "./statistics";

export const getNumVar = (dataset: Dataset) => {
  const sample = dataset[0];

  return Object.keys(sample).filter(
    (_, i) => typeof Object.values(sample)[i] === "number"
  );
};

export const getCatVar = (dataset: Dataset) => {
  const numVar = getNumVar(dataset);

  return Object.keys(dataset[0]).filter((col) => !numVar.includes(col));
};

export const getLowCardinality = (dataset: Dataset, limit: number = 5) => {
  const columns = Object.keys(dataset[0]);
  const loowCardinality = columns.filter((col) => {
    const values = getValueByColumn(dataset, col);
    const nUnique = new Set(values);

    if (nUnique.size <= limit) {
      return col;
    }
  });

  return loowCardinality;
};

export const getNullVar = (dataset: Dataset) => {
  const columns = Object.keys(dataset[0]);
  const nullVar = columns.filter((col) => {
    const values = getValueByColumn(dataset, col);
    const nonNull = values.filter((val) => val !== undefined);

    if (nonNull.length < values.length) {
      return col;
    }
  });

  return nullVar;
};

export const getNonNullVar = (
  dataset: Dataset,
  type: "all" | "numerical" | "categorical" = "all"
) => {
  const withNull = getNullVar(dataset);
  switch (type) {
    case "all":
      const allColumns = Object.keys(dataset[0]);
      return allColumns.filter((col) => !withNull.includes(col));
    case "numerical":
      const numerical = getNumVar(dataset);
      return numerical.filter((col) => !withNull.includes(col));
    case "categorical":
      const categorical = getNumVar(dataset);
      return categorical.filter((col) => !withNull.includes(col));
  }
};

export const getNumericData = (
  dataset: Dataset,
  includeNull: boolean = false
) => {
  const numColumns = getNumVar(dataset);
  const numericData = Object.fromEntries(
    numColumns
      .map((col) => [
        col,
        getValueByColumn(dataset, col).filter((val) =>
          !includeNull
            ? val === 0 || Number(val)
            : val === 0 || Number(val) || val === undefined
        ),
      ])
      .filter(([key, val]) => val.length > 0)
  );

  return numericData;
};

/**
 * Split dataset into train and test set.
 * @param dataset
 * @param testSize
 * @param shuffle
 * @returns
 */
export const splitDataset = (
  dataset: Dataset,
  testSize: number,
  shuffle: boolean
) => {
  const nData = dataset.length;
  const limit = Math.round(nData * (1 - testSize));

  if (!shuffle) {
    const train = dataset.slice(0, limit);
    const test = dataset.slice(limit, nData);

    return [train, test];
  } else {
    const shuffledIdx = [...Array(nData).keys()]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    const trainIdx = shuffledIdx.slice(0, limit);
    const testIdx = shuffledIdx.slice(limit, nData);

    const train = trainIdx.map((idx) => dataset[idx]);
    const test = testIdx.map((idx) => dataset[idx]);

    return [train, test];
  }
};

/**
 * Filter dataset by columns.
 * @param dataset
 * @param columns
 */
export const filterDataset = (dataset: Dataset, columns: string[]) => {
  const result = dataset.map((data) => filterByKeys(data, columns));

  return result;
};

/**
 * Get values in dataset by it's column(s).
 * Example:
 * const data = [{a: 1, b: 2}, {a: 5, b: 7}]
 * getValueByColumn(data, "a")
 * >>> [1, 5]
 * @param data
 * @param column
 * @returns
 */
export const getValueByColumn = (data: Dataset, column: string) => {
  type DataKey = keyof typeof data[0];
  const result = data.map((dt) => dt[column as DataKey]);

  return result;
};

export const getInformation = (dataset: Dataset) => {
  const columns = Object.keys(dataset[0]);
  const info = columns.map((col) => {
    const values = getValueByColumn(dataset, col);
    const nValues = values.length;
    const nNull = countNull(values);

    return {
      column: col,
      nonNull: nValues - nNull,
      nullPercentage: round(nNull === 0 ? 0 : (nNull / nValues) * 100, 3),
      Unique: new Set(values).size,
      dtype: typeof values.find((val) => val !== undefined),
    };
  });

  return info;
};

export const getStatistics = (dataset: Dataset) => {
  const numericData = getNumericData(dataset);
  const columns = Object.keys(numericData);

  const result = columns.map((col) => {
    const data = numericData[col];

    return {
      column: col,
      count: data.length,
      mean: round(meanArray(data), 3),
      std: round(stdArray(data), 3),
      min: Math.min(...data),
      "25%": round(quantile(data, 25), 3),
      "50%": round(quantile(data, 50), 3),
      "75%": round(quantile(data, 75), 3),
      max: Math.max(...data),
    };
  });

  return result;
};

export const getCorrelation = (
  dataset: Dataset,
  method: "pearson" | "kendall" | "spearman" = "pearson"
) => {
  const numericData = getNumericData(dataset, true);
  const columns = Object.keys(numericData);

  const result = columns.map((key) => ({
    column: key,
    ...Object.fromEntries(
      columns.map((col) => [
        col,
        round(pearsonCorr(numericData[key], numericData[col]) as number, 3),
      ])
    ),
  }));

  return result;
};

export const getDuplicate = (dataset: Dataset, columns: string[]) => {
  const filtered = filterDataset(dataset, columns);

  // convert data into string to make it easier to find the duplicates.
  const stringData = filtered.map((data) => Object.values(data).join(""));
  const uniqueData = new Set(stringData);

  if (stringData.length === uniqueData.size) {
    return [];
  } else {
    const uniqueIdx = stringData
      .map((data, idx) => {
        if (uniqueData.has(data)) {
          uniqueData.delete(data);
        } else {
          return idx;
        }
      })
      .filter(Number);

    return uniqueIdx.map((idx) => dataset[idx as number]);
  }
};

export const getGroup = (dataset: Dataset, column: string, agg: string) => {
  type ValueKey = keyof typeof dataset[0];

  const groupVal = new Set(getValueByColumn(dataset, column));
  const group = Object.fromEntries(
    [...groupVal].map((val) => [
      val,
      dataset.filter((data) => data[column as ValueKey] === val),
    ])
  );

  const aggResult = Object.values(group).map((val) => getStatistics(val));
  const aggResultKey = aggResult[0].map((result) => result.column);

  type AggType = keyof typeof aggResult[0][0];
  const result = [...groupVal].map((val, i) => ({
    groupVal: val,
    ...Object.fromEntries(
      aggResultKey.map((key) => {
        const notNull = aggResult[i]
          .map((result) => result.column)
          .includes(key);

        const aggValue = notNull
          ? aggResult[i].filter((result) => result.column === key)[0][
              agg as AggType
            ]
          : 0;

        return [key, aggValue ? aggValue : 0];
      })
    ),
  }));

  return result;
};

export const addColumn = (dataset: Dataset, columnObj: Dataset) => {
  return dataset.map((data, i) => ({ ...data, ...columnObj[i] }));
};

export const colWithColOperation = (
  dataset: Dataset,
  col1: string,
  col2: string,
  operator: Operator
) => {
  const values1 = getValueByColumn(dataset, col1);
  const values2 = getValueByColumn(dataset, col2);
  const result = values1.map((val, i) =>
    mathOperation(val, values2[i], operator)
  );

  return result;
};

export const colWithNumOperation = (
  dataset: Dataset,
  column: string,
  number: number,
  operator: Operator
) => {
  const values = getValueByColumn(dataset, column);
  const result = values.map((val) => mathOperation(val, number, operator));

  return result;
};

export const extractText = (
  dataset: Dataset,
  column: string,
  regex: string
) => {
  const re = new RegExp(regex);
  const values: string[] = getValueByColumn(dataset, column);
  const result = values.map((val) => (val.match(re) ? val.match(re)![0] : ""));

  return result;
};

export const changeDtype = (
  dataset: Dataset,
  columns: string[],
  dtype: string[]
) => {
  const result = dataset.map((obj) => {
    let copied: any = { ...obj };
    columns.forEach((col, i) => {
      copied[col] =
        dtype[i] === "string"
          ? String(copied[col])
          : dtype[i] === "number"
          ? Number(copied[col])
          : Boolean(copied[col]);
    });

    return copied;
  });

  return result;
};

export const imputeColumn = (
  dataset: Dataset,
  column: string,
  option: string,
  value: any = undefined
) => {
  const colValue = getValueByColumn(dataset, column);
  const dtype = typeof colValue.find((val) => val !== undefined);

  const imputeValue =
    option === "mean"
      ? meanArray(colValue)
      : option === "median"
      ? quantile(colValue, 50)
      : option === "mode"
      ? modeArray(colValue)
      : dtype === "number"
      ? Number(value)
      : value;

  const newValue = colValue.map((val) =>
    val === undefined ? imputeValue : val
  );

  const result = dataset.map((data, i) => {
    let temp: any = { ...data };
    temp[column] = newValue[i];

    return temp;
  });

  return result;
};

export const encodeOneHot = (dataset: Dataset, column: string) => {
  const colValue = getValueByColumn(dataset, column);
  const unique = new Set(colValue);
  const encodedValue = colValue.map((val) => {
    const idx = [...unique].indexOf(val);
    const temp = [...Array(unique.size)].map((_, i) => {
      const key: string = `${column}_${[...unique][i]}`;
      return [key, i === idx ? 1 : 0];
    });

    return Object.fromEntries(temp);
  });

  const result = dataset.map((data, i) => ({ ...data, ...encodedValue[i] }));

  return result;
};

export const encodeOrdinal = (
  dataset: Dataset,
  column: string,
  ordinalObj: {}
) => {
  const colValue = getValueByColumn(dataset, column);
  const encodedValue = colValue.map((val) => {
    return objectFromArray([`${column}Encoded`], ordinalObj[val]);
  });

  const result = dataset.map((data, i) => ({ ...data, ...encodedValue[i] }));

  return result;
};

export const encodeTarget = (
  dataset: Dataset,
  column: string,
  target: string
) => {
  const group = getGroup(dataset, column, "mean");
  const keys = group.map((group) => group.groupVal);
  const values = getValueByColumn(group, target);

  const colValue = getValueByColumn(dataset, column);
  const encodedValue = colValue.map((val) => {
    const idx = keys.indexOf(val);

    return objectFromArray([`${column}Encoded`], values[idx]);
  });

  const result = dataset.map((data, i) => ({ ...data, ...encodedValue[i] }));

  return result;
};

export const scaleDataset = (
  dataset: Dataset,
  columns: string[],
  method: "standard" | "minmax" | "robust"
) => {
  const scaled = Object.fromEntries(
    [...Array(columns.length)].map((_, i) => {
      const colName: string = columns[i];
      const colValue = getValueByColumn(dataset, colName);
      const scaledVal =
        method === "standard"
          ? scaleStandard(colValue)
          : method === "minmax"
          ? scaleMinMax(colValue)
          : scaleRobust(colValue);

      return [colName, scaledVal];
    })
  );

  const result = dataset.map((obj, i) => {
    let copied: any = { ...obj };

    Object.keys(scaled).forEach((key) => {
      copied[key] = scaled[key][i];
    });

    return copied;
  });

  return result;
};

export const dropColumn = (dataset: Dataset, columns: string[]) => {
  const allColumns = Object.keys(dataset[0]);
  const keepColumns = allColumns.filter((col) => !columns.includes(col));
  const result = filterDataset(dataset, keepColumns);

  return result;
};
