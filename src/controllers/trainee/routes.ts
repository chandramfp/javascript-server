import { Response, Router } from 'express';
import  Controller from './Controller';
import authmiddleware from '../../libs/routes/authMiddleWare';
import validationHandler from '../../libs/routes/validationHandler';
import validation from '../trainee/validation';
import   IRequest  from '../../libs/routes/IRequest';
import authMiddleWare from '../../libs/routes/authMiddleWare';

const traineeRouter = Router();


traineeRouter.route('/')

/**
 * @swagger
 *
 * definitions:
 *    TraineePost:
 *       type: object
 *       properties:
 *           email:
 *               type: string
 *               example: chandrashekhar.kumar@successive.tech
 *           name:
 *               type: string
 *               example: shekhar gupta
 *           password:
 *               type: string
 *               example: #Include
 *           mob:
 *               type: number
 *               example: "9572654116"
 *           address:
 *               type: string
 *               example: Noida
 *           role:
 *               type: string
 *               example: trainee
 *           hobbies:
 *               type: array
 *               example: ["cricket"]
 *
 *    TraineeResponse:
 *       type: object
 *       properties:
 *           _id:
 *               example: 5e4e6e93c095d84d34045a30
 *           email:
 *               type: string
 *               example: chandrashekhar.kumar@successive.tech
 *           name:
 *               type: string
 *               example: shekhar gupta
 *           mob:
 *               type: number
 *               example: "9572654116"
 *           address:
 *               type: string
 *               example: Noida
 *           role:
 *               type: string
 *               example: trainee
 *           hobbies:
 *               type: array
 *               example: ["cicket"]
 *           originalId:
 *               example: 5e4e6e93c095d84d34045a30
 *           createdBy:
 *               example: 5e45404398e86d576ad964e6
 *           createdAt:
 *               example: 2020-02-20T11:33:39.325Z
 *           v:
 *               example:0
 *    Unauthorized:
 *            type: object
 *            properties:
 *                error:
 *                    example: Unauthorized
 *                message:
 *                    example: Token not found
 *                status:
 *                    example: 403
 *                timestamp:
 *                    example: 2019-03-10T19:51:37.066Z
 *
 */

/**
 * @swagger
 *
 * /trainee:
 *   get:
 *       description: Returns the list of the trainees
 *       tags:
 *           - Trainee
 *       security:
 *           - Bearer: []
 *       consumes:
 *           - application/json
 *       produces:
 *           - application/json
 *       parameters:
 *           - name: skip
 *             description: data to be skip
 *             in: query
 *             required: false
 *             type: number
 *           - name: limit
 *             description: number of data to be shown
 *             in: query
 *             required: false
 *             type: number
 *           - name: sortData
 *             description: data to be sort by
 *             in: query
 *             required: false
 *             type: string
 *           - name: search
 *             description: data to be search by
 *             in: query
 *             required: false
 *             type: string         
 *       responses:
 *           200:
 *              description: 'An array of trainees'
 *              schema:
 *                 properties:
 *                     status:
 *                         example: 'Ok'
 *                     message:
 *                         example: 'Successfully fetched Trainees'
 *                     count:
 *                         example: 10
 *                     data:
 *                         type: object
 *                         allOf[]:
 *                             - $ref: '#/definitions/TraineeResponse'
 *           403:
 *              description: unauthorised access
 *              schema:
 *                  $ref: '#/definitions/Unauthorized'
 */


.get(authmiddleware('getUsers', 'read'), validationHandler(validation.get), Controller.get)

/**
 * @swagger
 *
 * /trainee:
 *   post:
 *     description: Returns the success reponse on creation
 *     tags:
 *          - Trainee
 *     security:
 *          - Bearer: []
 *     produces:
 *          - application/json
 *     parameters:
 *          - name: User
 *            description: User's Data.
 *            in: body
 *            required: true
 *            type: object
 *            schema:
 *                $ref: '#/definitions/TraineePost'
 *     responses:
 *       200:
 *           description: success response
 *           schema:
 *               allOf[]:
 *               properties:
 *                   status:
 *                       example: Ok
 *                   message:
 *                       example: Trainee Created Successfully
 *                   data:
 *                       type: object
 *                       allOf[]:
 *                       - $ref: '#/definitions/TraineeResponse'
 *                       properties:
 *                           name:
 *                                example: 'chandrashekhar kumar'
 *                           email:
 *                                example: 'chandrashekhar.kumar@successive.tech'
 *                           role:
 *                                example: 'Test Trainee'
 *                           
 *       403:
 *         description: unauthorised access
 *         schema:
 *             $ref: '#/definitions/Unauthorized'
 */
.post(authmiddleware('getUsers', 'write'), validationHandler(validation.create), Controller.create)

/**
 * @swagger
 *
 * /trainee:
 *   put:
 *       description: Returns the success reponse on creation
 *       tags:
 *           - Trainee
 *       security:
 *           - Bearer: []
 *       produces:
 *           - application/json
 *       parameters:
 *           - name: User
 *             description: trainee's Data.
 *             in: body
 *             required: true
 *             type: object
 *             schema:
 *               allOf[]:
 *                   properties:
 *                       id:
 *                          example: 5e4e6e93c095d84d34045a30
 *             dataToUpdate:
 *               type: object
 *               allOf[]:
 *               - $ref: '#/definitions/TraineePost'
 *       responses:
 *           200:
 *               description: trainee updated successfully
 *               schema:
 *                   allOf[]:
 *                   properties:
 *                       status:
 *                           example: Ok
 *                       message:
 *                           example: User data successfully Updated
 *                       data:
 *                           type: object
 *                           allOf[]:
 *                           - $ref: '#/definitions/TraineeResponse'
 *                           properties:
 *                               id:
 *                                  example: '5c6c47447740654f0915fac7'
 *           403:
 *               description: unauthorised access
 *               schema:
 *                   $ref: '#/definitions/Unauthorized'
 */

.put(authmiddleware('getUsers', 'write'), validationHandler(validation.update), Controller.update);


/**
 * @swagger
 *
 * /trainee/{id}:
 *      delete:
 *          description: Delete the trainee user from the records
 *          tags:
 *              - Trainee
 *          security:
 *              - Bearer: []
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: id
 *                description: Unique id of the user that is to be deleted
 *                in: path
 *                required: true
 *                type: string
 *                example: 5e4e6e93c095d84d34045a30
 *          responses:
 *              200:
 *                  description: Data deleted
 *                  schema:
 *                      allOf[]:
 *                      properties:
 *                          status:
 *                              example: Ok
 *                          message:
 *                              example: Trainee Deleted Successfully
 *                          data:
 *                              type: object
 *                              allOf[]:
 *                              - $ref: '#/definitions/TraineeResponse'
 *                              properties:
 *                                  id:
 *                                     example: 5e4e6e93c095d84d34045a30
 *              403:
 *                  description: unauthorised access
 *                  schema:
 *                      $ref: '#/definitions/Unauthorized'
 */
traineeRouter.delete('/:id', authmiddleware('getUsers', 'delete'), validationHandler(validation.delete), Controller.delete);



export default traineeRouter;