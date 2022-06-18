const validateData = (value: string) => {
  const obj = JSON.parse(value);
  return ['username', 'age', 'hobbies'].every((prop: string) =>
    Object.prototype.hasOwnProperty.call(obj, prop))
};

export default validateData;