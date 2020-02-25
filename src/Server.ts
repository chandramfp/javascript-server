import * as swaggerUI from 'swagger-ui-express';
import * as swaggerJsDoc from 'swagger-jsdoc';
import * as express from 'express';
import IConfig from './config/IConfig';
import * as bodyParser from 'body-parser';
import errorHandler from './libs/routes/errorHandler';
import notFoundRoutes from './libs/routes/notFoundRoute';
import { Request } from 'express';
import mainRouter from './router';
import Database from './libs/Database';



interface IUser {
    id: string;
    name: string;
}
interface NewRequest extends Request {
    user: IUser;
}

class Server {

    private app: express.Express;

    constructor(private config: IConfig) {
        this.app = express();
        return this;
    }

    bootstrap = () => {
        console.log('Inside bootsrap');
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }

    initBodyParser = () => {
        const { app } = this;
        console.log('Inside Bodyparser');
        app.use(bodyParser.urlencoded({ extended: false }));

        // parse application/json
        app.use(bodyParser.json());
    }

    run = () => {
        const { app, config: { port, mongoURL } } = this;


        Database.open(mongoURL).then(() => {
            this.app.listen(this.config.port, (err) => {
                if (err) {
                    console.log('error');
                    throw err;
                }
                console.log('App is running successfully on port ' + port);

            });

        });

    }
    
    setupRoutes = () => {
        const { app } = this;
        app.use('/swagger', swaggerUI.serve, swaggerUI.setup(this.initSwagger()));
        console.log('inside setupRouts')
        this.app.use('/health-check', (req, res) => {
            console.log('Inside health check');
            res.send('i am ok');
        });

        app.use('/Middleware', (req: NewRequest, res, next) => {
            console.log('Inside Middleware ');
            req.user = {
                id: '101',
                name: 'Alex'
            };
            console.log(req.user);
            res.send('Ok');
        });

        app.use('/api', mainRouter);
        app.use(notFoundRoutes);
        app.use(errorHandler);
        return this;
    }

    public initSwagger = () => {
        console.log('hello')
        const options = {
            definition: {
                info: {
                    title: 'Javascript-Server API',
                    version: '1.0.0',
                },
                securityDefinitions: {
                    Bearer: {
                        type: 'apiKey',
                        name: 'Authorization',
                        in: 'headers'
                    }
                },
                basePath: '/api',
            },
           
            swagger: '2.0',
            apis: ['./dist/controllers/**/routes.js'],
        };
        const swaggerSpec = swaggerJsDoc(options);
        return swaggerSpec;
    }

}
export default Server;