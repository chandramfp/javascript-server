import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import config from '../../config/configuration';

import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/systemResponse';
import IRequest from '../../libs/routes/IRequest';
import { isNull } from 'util';


class TraineeController {
    static instance: TraineeController;
    static userRepository: UserRepository;


    userRepository = new UserRepository();

    static getInstance = () => {
        if (TraineeController.instance) {
            return TraineeController.instance;
        }
        TraineeController.instance = new TraineeController();
        return TraineeController.instance;
    };



    create = async (req: IRequest, res: Response, next: NextFunction) => {
        try {
            console.log(' :::::::::: Inside Create trainee :::::::: ');

            const { password } = req.body;
            const { email } = req.body;

            const emailInLower = email.toLowerCase(); // for database storage in all lowercase email


            const verifyEmail = await this.userRepository.findOne({ email: emailInLower });

            if (verifyEmail) {
                return next({
                    error: 'Email already exist',
                    status: 400
                });
            }
            bcrypt.hash(password, 10, (err, hash) => {

                const password = hash;

                const { name, role, address, hobbies, dob, mobileNumber } = req.body;

                this.userRepository
                    .create({ email: emailInLower, name, address, role, hobbies, mobileNumber, password }, req.user)
                    .then(user => {
                        return SystemResponse.success(res, user, 'Trainee added successfully');
                    })
                    .catch(error => {
                        throw error;
                    });

            });

        }
        catch (err) {
            throw err;
        }
    };


    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(' :::::::::: Inside List Trainee :::::::: ');
            const { skip, limit, search } = req.query;
            console.log(skip, limit)
            let sortData;

            if (req.query.sortData === 'email')
                sortData = { email: 1 };
            else if (req.query.sortData === 'name')
                sortData = { name: 1 };
            else
                sortData = { createdAt: -1 };

            console.log(sortData)
           console.log(search)

            if (search) {
                const searching = search.split(':');

                const user = await this.userRepository.list({ [searching[0]]: [searching[1]], deletedAt: undefined }, skip, limit, sortData);
                const count = await this.userRepository.count();
                if (Object.entries(user).length === 0) {
                    return next({
                        error: 'User not found',
                        status: 500
                    });
                }

                return SystemResponse.success(res, { Count: count, ...user }, 'Search List');


            } else {
                const user = await this.userRepository.list({ deletedAt: undefined }, skip, limit, sortData);
                const count = await this.userRepository.count();



                return SystemResponse.success(res, { Count: count, ...user }, 'Trainee List');
            }

        } catch (err) {
            throw err;
        }
    };

    update = async (req: IRequest, res: Response) => {
        try {
            console.log(' :::::::::: Inside Update Trainee :::::::: ');
            const { id, dataToUpdate } = req.body;
            const userToUpdate = await this.userRepository.update({ originalId: id, deletedAt: undefined }, dataToUpdate, req.user);

            const user = await this.userRepository.findOne({ originalId: id ,deletedAt: undefined });
            console.log(user)
            return SystemResponse.success(res, user, 'Trainee Updated successfully');

        }
        catch (err) {
            throw err;
        }

    };
    
    delete = async (req: IRequest, res: Response) => {
        try {
            console.log(' :::::::::: Inside Delete Trainee :::::::: ');
            const { id } = req.params;
            const user = await this.userRepository.delete({ _id: id }, req.user);
            console.log(user)

            return SystemResponse.success(res, user, 'Trainee deleted successfully');

        } catch (err) {
            throw err;
        }

    };
}

export default TraineeController.getInstance();
