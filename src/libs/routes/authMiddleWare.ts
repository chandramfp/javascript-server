import * as jwt from 'jsonwebtoken';
import configuration, { default as config } from '../../config/configuration';
import hasPermission from '../permissions';
import { Request, Response, NextFunction } from 'express';
import IRequest from './IRequest';
import UserRepository from '../../repositories/user/UserRepository';

const userRepository = new UserRepository();


export default (moduleName: any, permissionType: any) => (req: IRequest, res: Response, next: NextFunction) => {
    console.log('------------AUTHMIDDLEWARE------------', moduleName, permissionType);
    try {

        const token = req.headers.authorization;

        console.log(token);
        const { key } = configuration;

        const decodedUser = jwt.verify(token, key);
        console.log(decodedUser);
        if (!decodedUser) {
            return next({
                staus: 401,
                error: 'Unauthorized Access',
                message: 'Unauthorized Access'
            });
        }

        const { id, email } = decodedUser;

        userRepository.findOne({ _id: id, email }).then(user => {
            if (!user) {
                next({
                    status: 401,
                    error: 'Unauthorized Access',
                    message: 'User does not Exist in the System',
                });
            }
            req.user = user;
        }).then(() => {
            const role: string = decodedUser.role;

            if (!hasPermission(moduleName, role, permissionType)) {

                return next({
                    staus: 401,
                    error: 'Unauthorized Access',
                    message: 'Unauthorized Access'
                });
            }
            next();

        });

    }
    catch (error) {
        return next({
            staus: 401,
            error: 'Unauthorized Access',
            message: error.message
        });
    }
};

