import { Request, Response, NextFunction } from 'express';
import UserRepository from './../../repositories/user/UserRepository';
import SystemResponse from '../../libs/systemResponse';
import IRequest from '../../libs/routes/IRequest';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration'


class UserController {
    static instance: UserController;
    static userRepository: UserRepository;

    userRepository = new UserRepository();

    static getInstance = () => {
        if (UserController.instance) {
            return UserController.instance;
        }
        UserController.instance = new UserController();
        return UserController.instance;
    };


    login = async (req: any, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.findOne({ email });

            if (!user) {
                return next({ error: 'User not Fount', status: 404 });
            }

            const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

            if (!isPasswordCorrect) {
                return next({ error: 'Password does not Match', status: 404 });
            }

            const token = jwt.sign({ email: user.email, id: user.originalId, role: user.role }, config.key);

            res.status(200).send({ message: 'User login Successfully', data: token, status: 'success' })
        } catch (err) {
            return next({ error: err.message })
        }
    }



    // create = (req: Request, res: Response) => {
    //     try {
    //         console.log(" :::::::::: Inside Create User :::::::: ");

    //         const { email, name,role, address, hobbies, dob, mobileNumber } = req.body;

    //         this.userRepository
    //             .create({ email, name, address,role, hobbies, mobileNumber })
    //             .then(user => {
    //                 return SystemResponse.success(res, user, "User added successfully");
    //             })
    //             .catch(error => {
    //                 throw error;
    //             });
    //     } catch (err) { }
    // };

    create = async (req: Request, res: Response) => {
        try {
            console.log(" :::::::::: Inside Create User :::::::: ");

            const { email, name, role, address, hobbies, dob, mobileNumber } = req.body
            const user = await this.userRepository.create({ email, name, address, role, hobbies, mobileNumber });

            return SystemResponse.success(res, user, "User added successfully");
        } catch (err) { }
    };

    get = async (req: Request, res: Response) => {
        try {
            console.log(" :::::::::: Inside List User :::::::: ");
            const user = await this.userRepository.list();

            return SystemResponse.success(res, user, "Users List");

        } catch (err) { }
    };
    update = async (req: Request, res: Response) => {
        try {
            console.log(' :::::::::: Inside Update User :::::::: ');
            const { id, dataToUpdate } = req.body;
            const userToUpdate = await this.userRepository.update({ _id: id }, dataToUpdate);

            const user = await this.userRepository.findOne({ _id: id });

            return SystemResponse.success(res, user, 'User Updated successfully');


        }
        catch (err) {

        }

    };
    delete = async (req: Request, res: Response) => {
        try {
            console.log(" :::::::::: Inside Delete User :::::::: ");
            const { id } = req.params;
            const user = await this.userRepository.delete({ _id: id });

            return SystemResponse.success(res, user, "user deleted successfully")


        } catch (err) { }


    };
}

export default UserController.getInstance();