import Server from './Server';
import configuration from './config/configuration';

const serverObj = new Server(configuration);
serverObj.bootstrap();
serverObj.run();