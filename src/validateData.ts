import http from 'http';

const validateData = (value: string, res: http.ServerResponse) => {
  const obj = JSON.parse(value);
  const isKeys = ['username', 'age', 'hobbies'].every((prop: string) =>
    Object.prototype.hasOwnProperty.call(obj, prop));
  const isObjectLength = Object.keys(obj).length === 3;

  if (!isKeys && !isObjectLength) {
    res.statusCode = 400;
    res.setHeader('content-Type', 'Application/json');
    res.end('Wrong data type');

    return false;
  }
  return true;
};

export default validateData;
