import http from 'http';
import validateData from './validateData';

describe('Data Validtor Test', () => {
  const res = { statusVode: '', setHeader: () => { }, end: () => { } } as unknown as http.ServerResponse;

  test('get data', () => {
    const value = '{"username":"Piotr Setsko","age":"30","hobbies":["footbal","hockey"],"id":"9eb0b31f-50e8-417b-9b52-f35fb2bc41b7"}';

    const result = validateData(value, res);

    expect(result).toBe(true);
  });
});