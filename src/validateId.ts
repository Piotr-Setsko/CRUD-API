import { validate as uuidvalid, version as uuidver } from 'uuid';
import http from 'http';
import { IUser } from './model';

const validateId = (url: string, users: IUser[], res: http.ServerResponse) => {
  const data = url.split('/').pop();
  if (url.includes('/api/users/') && uuidvalid(data || '') && uuidver(data || '')) {
    const actualUser = users.filter((user: IUser) => user.id === data);
    if (actualUser[0]) {
      return actualUser[0];
    }
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(
      'User undefined'
    );
    res.end();

    return false;
  }
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.write(
    'Wrong ID value'
  );
  res.end();

  return false;
};

export default validateId;
