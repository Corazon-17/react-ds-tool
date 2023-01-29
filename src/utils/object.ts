/**
 * Get keys of object with specific value.
 * Example:
 * const obj = {foo: true, bar: false, poo: true}
 * getTrueKeys(obj, true)
 * >>> ["foo", "poo"]
 * @param object
 * @returns
 */
export const getObjectKeys = (object: {}, value: any = undefined): string[] => {
  type ObjectKey = keyof typeof object;

  if (value !== undefined) {
    return Object.keys(object).filter(
      (key) => object[key as ObjectKey] === value
    );
  }

  return Object.keys(object).filter((key) => object[key as ObjectKey]);
};

/**
 * Create an object with keys from array and give default value.
 * @param array
 * @param value
 * @returns
 */
export const objectFromArray = (array: string[], value: any) => {
  if (typeof value !== "object") {
    return Object.fromEntries(array.map((item) => [item, value]));
  }

  return Object.fromEntries(array.map((item, i) => [item, value[i]]));
};

/**
 * Filter object by keys.
 * Example:
 * const obj = {foo: true, bar: false, poo: true}
 * filterByKeys(obj, ["foo", "bar"])
 * >>> {foo: true, bar: false}
 * @param object
 * @param keys
 */
export const filterByKeys = (object: {}, keys: string[]) => {
  type ObjectKey = keyof typeof object;

  const filteredMap = Object.keys(object)
    .map((key) => {
      if (keys.includes(key)) {
        return [key, object[key as ObjectKey]];
      }

      return;
    })
    .filter((item) => item !== undefined);
  const result = Object.fromEntries(filteredMap as Array<[]>);

  return result;
};

/**
 * Filter object without keys.
 * Example:
 * const obj = {foo: true, bar: false, poo: true}
 * filterWithoutKeys(obj, ["foo", "bar"])
 * >>> {poo: true}
 * @param object
 * @param keys
 */
export const filterWithoutKeys = (object: {}, keys: string[]) => {
  type ObjectKey = keyof typeof object;

  const filteredMap = Object.keys(object)
    .map((key) => {
      if (!keys.includes(key)) {
        return [key, object[key as ObjectKey]];
      }

      return;
    })
    .filter((item) => item !== undefined);
  const result = Object.fromEntries(filteredMap as Array<[]>);

  return result;
};