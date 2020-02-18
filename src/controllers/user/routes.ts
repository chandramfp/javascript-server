import { Response, Router } from 'express';
import Controller from './Controller';
import authmiddleware from '../../libs/routes/authMiddleWare';
import validationHandler from '../../libs/routes/validationHandler';
import validation from '../trainee/validation';
import IRequest from '../../libs/routes/IRequest';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const userRouter = Router();


userRouter.route('/');

userRouter.route('/me').get(authMiddleWare('getUsers', 'read'), Controller.me);

userRouter.post('/login', Controller.login);

export default userRouter;