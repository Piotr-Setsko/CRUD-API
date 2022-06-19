import { validate as uuidvalid, version as uuidver } from 'uuid';
import http from 'http';
import { IUser } from '../model';
import sendRes from '../utils/message';

const validateId = (url: string, users: IUser[], res: http.ServerResponse) => {
  const data = url.split('/').pop();
  if (url.includes('/api/users/') && uuidvalid(data || '') && uuidver(data || '')) {
    const actualUser = users.filter((user: IUser) => user.id === data);
    if (actualUser[0]) {
      return actualUser[0];
    }
    sendRes(res, 404, 'User undefined');

    return false;
  }
  sendRes(res, 400, 'Wrong ID value');

  return false;
};

export default validateId;
