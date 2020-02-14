import { Router } from 'express';
import { traineeRouter } from './controllers/trainee/index';
import userRouter from './controllers/user/routes'

const mainRouter = Router();
mainRouter.use('/', traineeRouter);
mainRouter.use('/user', userRouter);
export default mainRouter;