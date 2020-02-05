import { Router } from 'express';
import  Controller from './Controller';
import authmiddleware from '../../libs/routes/authMiddleWare';
import validationHandler from '../../libs/routes/validationHandler';
import validation from './validation';

const traineeRouter = Router();
console.log('---------Test');
traineeRouter.route('/trainee')
.get(authmiddleware('getUsers','read'),validationHandler(validation.get),Controller.get)
.post(authmiddleware('getUsers','write'),validationHandler(validation.create),Controller.create)
.put(authmiddleware('getUsers','read'),validationHandler(validation.update),Controller.update)
.delete(authmiddleware('getUsers','read'),validationHandler(validation.delete),Controller.delete);


export default traineeRouter;