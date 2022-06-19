import http from 'http';
import cluster from 'cluster';
import { cpus } from 'os';
import { IUser } from './model';
import setConfig from './config';
import selectPath from './path';
import sendRes from './utils/message';

setConfig();
const { PORT } = process.env;
const totalCPUs = cpus();

const newServer = () => {
  const users: IUser[] = [];

  return http.createServer(async (req, res) => {
    try {
      selectPath(req, res, users);
    } catch (error) {
      sendRes(res, 500, 'Problem on server side');
    }
  });
};

if (process.argv.slice(2)[1] === '--multi') {
  if (cluster.isPrimary) {
    totalCPUs.forEach(() => {
      cluster.fork();
    });
    cluster.on('online', (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
    });
  } else {
    newServer().listen(PORT, () => {
      console.log(`Server in ${process.env.NODE_ENV} status, server started on port: ${PORT}`);
    });
  }
} else {
  newServer().listen(PORT, () => {
    console.log(`Server in ${process.env.NODE_ENV} status, server started on port: ${PORT}`);
  });
}
