import { Response, Router } from 'express';
import  Controller from './Controller';
import authmiddleware from '../../libs/routes/authMiddleWare';
import validationHandler from '../../libs/routes/validationHandler';
import validation from '../trainee/validation';
import   IRequest  from '../../libs/routes/IRequest';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const traineeRouter = Router();


traineeRouter.route('/')

.get(authmiddleware('getUsers', 'read'), validationHandler(validation.get), Controller.get)
.post(authmiddleware('getUsers', 'read'), Controller.create)
.put(authmiddleware('getUsers', 'read'), validationHandler(validation.update), Controller.update);
// .delete(authmiddleware('getUsers','read'),validationHandler(validation.delete),Controller.delete);
// .get(Controller.get)
// .post(Controller.create)
// .put(Controller.update)
// .delete(Controller.delete);
traineeRouter.delete('/:id', authmiddleware('getUsers', 'read'), validationHandler(validation.delete), Controller.delete);



export default traineeRouter;