const toStringValues = (obj: any) => {
  Object.keys(obj).forEach((k: string) => {
    if (typeof obj[k] === 'object') {
      return toStringValues(obj[k]);
    }
    obj[k] = obj[k].toString();

    return obj[k];
  });

  return obj;
};

export default toStringValues;
