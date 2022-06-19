import dotenv from 'dotenv';
import path from 'path';

const setConfig = () => {
  const arg = process.argv.slice(2)[0].split('=')[1];
  dotenv.config({ path: path.resolve(__dirname, `../.env.${arg}`) });
};

export default setConfig;
