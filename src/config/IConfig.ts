import { Hash } from "crypto";

interface IConfig {
    port: string;
    env: string;
    key: string;
    mongoURL: string;
    password: String
}
export default IConfig;