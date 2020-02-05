import { Router } from 'express';
import  Controller from './Controller';

import validationHandler from '../../libs/validationHandler';
import validation from './validation';

const traineeRouter = Router();
traineeRouter.route('/trainee')
.get(validationHandler(validation.get),Controller.get)
.post(validationHandler(validation.create),Controller.create)
.put(validationHandler(validation.update),Controller.update)
.delete(validationHandler(validation.delete),Controller.delete);


export default traineeRouter;