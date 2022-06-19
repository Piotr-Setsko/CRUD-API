import http from 'http';

const sendRes = (res: http.ServerResponse, status: number, message: string) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(message);
};

export default sendRes;
