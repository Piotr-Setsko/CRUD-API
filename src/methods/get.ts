import http from 'http';
import { IUser } from '../model';
import sendRes from '../utils/message';

const getUsers = (users: IUser[] | IUser, res: http.ServerResponse) => {
  sendRes(res, 200, JSON.stringify(users));
};

export default getUsers;
