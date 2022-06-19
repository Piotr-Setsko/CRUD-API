import http from 'http';
import sendRes from '../utils/message';

const validateData = (value: string, res: http.ServerResponse) => {
  try {
    const obj = JSON.parse(value);
    const isKeys = ['username', 'age', 'hobbies'].every((prop: string) =>
      Object.prototype.hasOwnProperty.call(obj, prop));
    const isObjectLength = Object.keys(obj).length === 3;

    if (!isKeys || !isObjectLength) {
      sendRes(res, 400, 'Wrong data type. Check required fields.');

      return false;
    }
    return true;
  } catch (error) {
    sendRes(res, 500, 'Problem on server side. Check data type, only json can be send.');
  }
};

export default validateData;
