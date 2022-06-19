import http from 'http';
import { IUser } from './model';
import getUsers from './methods/get';
import changeUsers from './methods/change';
import validateId from './utils/validateId';
import sendRes from './utils/message';

const selectPath = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  users: IUser[]
) => {
  if (req.url === '/api/users') {
    switch (req.method) {
      case 'GET':
        getUsers(users, res);
        break;

      case 'POST':
        changeUsers(req, res, users);
        break;

      default:
        sendRes(res, 404, 'Route not found');
    }
  } else if (
    req.url?.includes('/api/users/')
    && req.url.split('/').length === 4
    && ['PUT', 'GET', 'DELETE'].includes(req.method as string)
  ) {
    if (validateId(req.url, users, res)) {
      const actualUser: IUser = validateId(req.url, users, res) as IUser;
      const number = users.findIndex(
        (user: IUser) => actualUser && (user.id === actualUser.id)
      );

      switch (req.method) {
        case 'GET':
          getUsers(actualUser, res);
          break;

        case 'PUT':
          changeUsers(req, res, users);
          break;

        default:
          users.splice(number, 1);

          sendRes(res, 202, 'Record is found and deleted');
      }
    }
  } else {
    sendRes(res, 404, 'Route not found');
  }
};

export default selectPath;
