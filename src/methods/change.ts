import http from 'http';
import { v4 as uuidv4 } from 'uuid';
import validateData from '../utils/validateData';
import { IUser } from '../model';
import validateId from '../utils/validateId';
import toStringValues from '../utils/convertValue';
import sendRes from '../utils/message';

const changeUsers = (req: http.IncomingMessage, res: http.ServerResponse, users: IUser[]) => {
  let body = '';
  req.on('data', (chunk) => {
    body = chunk;
  });

  req.on('end', () => {
    if (validateData(body, res)) {
      let newUser: IUser = {} as IUser;

      if (req.method === 'POST') {
        newUser = { ...toStringValues(JSON.parse(body)), id: uuidv4() };
        users.push(newUser);
        sendRes(res, 201, JSON.stringify(newUser));
      } else {
        const actualUser: IUser = validateId(req.url as string, users, res) as IUser;
        const number = users.findIndex((user: IUser) =>
          actualUser && user.id === actualUser.id);
        newUser = { ...toStringValues(JSON.parse(body)), id: actualUser?.id };
        users.splice(number, 1, newUser);

        sendRes(res, 200, JSON.stringify(newUser));
      }
    }
  });
};

export default changeUsers;
