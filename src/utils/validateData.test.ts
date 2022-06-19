import http from 'http';
import validateData from './validateData';

describe('Data Validtor Test', () => {
  const res = {
    writeHead: () => {},
    end: () => {}
  } as unknown as http.ServerResponse;
  // const sendRes = () => {};

  test('get data', () => {
    const value = '{"username":"Piotr Setsko","age":"30","hobbies":["footbal","hockey"]}';

    const result = validateData(value, res);

    expect(result).toBe(true);
  });

  test('get wrong data', () => {
    const value = '{"username":"Piotr Setsko", "hobbies":["footbal","hockey"]}';

    const result = validateData(value, res);

    expect(result).toBe(false);
  });
});
