import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';
import SystemResponse from '../../libs/systemResponse';
import IRequest from '../../libs/routes/IRequest';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';

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






    create = (req: IRequest, res: Response) => {
        try {
            console.log(' :::::::::: Inside Create trainee :::::::: ');

            const { password } = req.body;

            bcrypt.hash(password, 10, (err, hash) => {

                const password = hash;

                const { email, name, role, address, hobbies, dob, mobileNumber } = req.body;

                this.userRepository
                    .create({ email, name, address, role, hobbies, mobileNumber, password }, req.user)
                    .then(user => {
                        return SystemResponse.success(res, user, 'Trainee added successfully');
                    })
                    .catch(error => {
                        throw error;
                    });

            });

        }
        catch (err) { }
    };


    get = async (req: Request, res: Response) => {
        try {
            console.log(' :::::::::: Inside List Trainee :::::::: ');
            const { limit, skip } = req.query;
            let sortData;

            if (req.query.sortData === 'email')
                sortData = { email: 1 };
            else if (req.query.sortData === 'name')
                sortData = { name: 1 };
            else
                sortData = { updatedAt: 1 };

            const user = await this.userRepository.list({ deletedAt: undefined }, limit, skip, sortData);
            const count = await this.userRepository.count();



            return SystemResponse.success(res, { Count: count, ...user }, 'Trainee List');

        } catch (err) { }
    };
    update = async (req: IRequest, res: Response) => {
        try {
            console.log(' :::::::::: Inside Update Trainee :::::::: ');
            const { id, dataToUpdate } = req.body;
            const userToUpdate = await this.userRepository.update({ _id: id }, dataToUpdate, req.user);

            const user = await this.userRepository.findOne({ _id: id });

            return SystemResponse.success(res, user, 'Trainee Updated successfully');

        }
        catch (err) { }

    };
    delete = async (req: IRequest, res: Response) => {
        try {
            console.log(' :::::::::: Inside Delete Trainee :::::::: ');
            const { id } = req.params;
            const user = await this.userRepository.delete({ _id: id }, req.user);

            return SystemResponse.success(res, user, 'Trainee deleted successfully');

        } catch (err) { }

    };
}

export default TraineeController.getInstance();
