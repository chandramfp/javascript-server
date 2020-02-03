import { Router } from 'express';
import  Controller from './Controller';
const traineeRouter = Router();
traineeRouter.route('/trainee')
.get(Controller.get)
.post(Controller.create)
.put(Controller.update)
.delete(Controller.delete);


export default traineeRouter;