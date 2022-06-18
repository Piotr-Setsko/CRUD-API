import http from 'http';
// import { register } from 'ts-node';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './model';
import validateData from './validateData';
import validateId from './validateId';

const PORT = process.env.PORT || 4000;


let users: IUser[] = [];

// limport { ICandidate, IUser } from '../interfaces';
// import * as uuid from 'uuid';

// class UsersService {
//   public users: IUser[];

//   constructor() {
//     this.users = [];
//   }

//   async apiGetUsers(): Promise<IUser[]> {
//     return this.users;
//   }

//   async apiCreateUser({ username, age, hobbies }: ICandidate): Promise<IUser> {
//     this.users.push(prepareUser);
//   }

//   async apiGetUserById(id: string): Promise<IUser> {
//     return this.users.find((user: IUser) => user.id === id);
//   }

//   async apiDeleteUser(id: string): Promise<IUser> {
//     // ваш код
//   }

//   async apiUpdateUser(id: string, { username, age, hobbies }: ICandidate): Promise<IUser> {
//     // ваш код
//   }
// }

// export default new UsersService();

const server = http.createServer(async (req, res) => {
  console.log(req.url, req.method);
  try {
    if (req.url === '/api/users' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(
        `Hi there, This is a Vanilla Node.js API, ${JSON.stringify(users)}`
      );
      res.end();
    } else if (req.url === '/api/users' && req.method === 'POST') {
      let body = '';

      req.on('data', (chunk) => {
        body = chunk;
      });

      req.on('end', () => {
        if (!(validateData(body)) && !(Object.keys(body).length === 3)) {
          res.statusCode = 400;
          res.setHeader('content-Type', 'Application/json');
          res.end('Wrong data type');
        } else {
          // const postBody: IUser = {
          //   ...Object.assign(
          //     ['username', 'age', 'hobbies'].map((key: string) => ({
          //       [key]: JSON.parse(body)[key]
          //     }))
          //   )
          // };

          const postBody: IUser = { ...JSON.parse(body), id: uuidv4() };

          users.push(postBody);
          const response = [
            {
              text: 'User added successfully'
            },
            users
          ];

          res.statusCode = 201;
          res.setHeader('content-Type', 'Application/json');
          res.end(JSON.stringify(response));
        }
      });
    } else if (req.url?.includes('/api/users/') && req.url.split('/').length === 4) {
      if (validateId(req.url, users, res)) {
        const actualUser: IUser = validateId(req.url, users, res) as IUser;

        if (req.method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(
            `Hi there ${JSON.stringify(actualUser)}`
          );
          res.end();
        } else if (req.method === 'PUT') {
          users.map((user: IUser) =>
            ((user.id === actualUser.id)
              ? actualUser
              : user));

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.write(
            `New user ${JSON.stringify(actualUser)}`
          );
          res.end();
        }
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.write(
        'Route not found'
      );
      res.end();
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Problem on serverside' }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
