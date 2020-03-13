import { Response, Router } from 'express';
import Controller from './Controller';
import authmiddleware from '../../libs/routes/authMiddleWare';
import validationHandler from '../../libs/routes/validationHandler';
import validation from '../user/validation';
import IRequest from '../../libs/routes/IRequest';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const userRouter = Router();


userRouter.route('/');

/**
 * @swagger
 *
 * definitions:
 *    Login:
 *       type: object
 *       properties:
 *           email:
 *               type: string
 *               example: 'chandrashekhar.kumar@successive.tech'
 *           password:
 *               type: string
 *               example: '#Include'
 *    Token:
 *       type: object
 *       properties:
 *          status:
 *             example: Ok
 *          message:
 *             example: Success
 *          data:
 *             example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpbmF5QHN1Y2Nlc3NpdmUudGVjaCIsImlkIjoiNWU0ZDMwOWZlNTc5Yjk1M2I1MmQwMGYwIiwicm9sZSI6ImhlYWQtdHJhaW5lciIsImlhdCI6MTU4MjExNzEwNH0.ncHSjBVfragq2SmWHxc9VO2CazRUvgEiD7OvAyMjGGc
 */

/**
 * @swagger
 *
 *   /user/me:
 *     get:
 *        description: Data of the User currently login.
 *        tags:
 *           - User
 *        security:
 *           - Bearer: []
 *        produces:
 *           - application/json
 *        responses:
 *           200:
 *             description: success
 *             schema:
 *                 $ref: '#/definitions/TraineeResponse'
 *     
 *           403:
 *             description: unauthorised access
 *             schema:
 *                properties:
 *                    error:  
 *                       example: 'unauthorised'
 *                    message:
 *                       example: 'Token not found'
 *                    status:
 *                       example: 403
 *                    timestamp:
 *                       example: '2019-03-10T19:51:37.066Z'
 */

userRouter.route('/me').get(authMiddleWare('getUsers', 'read'), Controller.me);

/**
 * @swagger
 *
 * /user/login:
 *    post:
 *       description: Login Credentials
 *       tags:
 *         - User
 *       security:
 *         - Bearer: []
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: User
 *           description: User email and password
 *           in: body
 *           required: true
 *           type: object
 *           schema:
 *             $ref: '#/definitions/Login'
 *       responses:
 *         200:
 *           description: login
 *           schema:
 *             $ref: '#/definitions/Token'
 *         422:
 *           description: invalid email or password
 *           schema:
 *             oneOf:
 *             properties:
 *               status:
 *                 example: "Bad Request"
 *               message:
 *                 example: Password does not match
 *               err:
 *                 example: Password is incorrect
 */

userRouter.post('/login', validationHandler(validation.login), Controller.login);

export default userRouter;