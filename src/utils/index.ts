type MergeObject = { [x: string]: any };

export const merge = (firstObject: MergeObject, secondObject: MergeObject) => {
  const thirdObject: MergeObject = {};

  for (const key in firstObject) {
    thirdObject[key] = firstObject[key];
  }

  for (const key in secondObject) {
    const currentValue = thirdObject[key];
    const value = secondObject[key];

    if (!currentValue) {
      thirdObject[key] = value;
      continue;
    }

    if (currentValue.constructor === Object && value.constructor === Object) {
      thirdObject[key] = merge(currentValue, value);
      continue;
    }

    if (Array.isArray(currentValue) && Array.isArray(value)) {
      thirdObject[key] = currentValue.concat(value);
      continue;
    }

    if (Array.isArray(currentValue)) {
      thirdObject[key] = currentValue.concat([value]);
      continue;
    }
  }

  return thirdObject;
};
