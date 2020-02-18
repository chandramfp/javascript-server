import { Request, Response, NextFunction } from 'express';
import UserRepository from './../../repositories/user/UserRepository';
import SystemResponse from '../../libs/systemResponse';
import IRequest from '../../libs/routes/IRequest';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import config from '../../config/configuration';


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

            res.status(200).send({ message: 'User login Successfully', data: token, status: 'success' });
        } catch (err) {
            return next({ error: err.message });
        }
    }

    me = (req: IRequest, res: Response, next: NextFunction) => {
        res.send(req.user);
    };

}

export default UserController.getInstance();