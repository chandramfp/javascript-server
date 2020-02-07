import * as jwt from 'jsonwebtoken';
import configuration, { default as config} from '../../config/configuration';
import hasPermission from '../permissions';
import { Request, Response, NextFunction } from 'express';
//import { config } from 'dotenv/types';

export default (moduleName: any, permissionType: any) => (req: Request, res: Response, next: NextFunction) => {
    console.log('------------AUTHMIDDLEWARE------------', moduleName, permissionType);
    try {
        
        const token = req.headers.authorization;
        
        //console.log(token);
        const { key } = configuration;
        const decodedUser = jwt.verify(token, key);

        if (!decodedUser) {
            return next({
                staus: 403,
                error: 'Unauthorized Access',
                message: 'Unauthorized Access'
            });
        }
        const role: string = decodedUser.role;
        if (!hasPermission(moduleName, role, permissionType)) {
            return next({
                staus: 403,
                error: 'Unauthorized Access',
                message: 'Unauthorized Access'
            });
        }
        next();
    }
    catch (error) {
        return next({
            staus: 403,
            error: 'Unauthorized Access',
            //message: error.message
        });
    }
};

