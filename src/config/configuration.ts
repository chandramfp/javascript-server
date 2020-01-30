import { config } from 'dotenv';
import IConfig from './IConfig';

config();

const configuration: IConfig = {
    port: process.env.PORT,
    env: process.env.NODE_ENV
};
export default configuration;