import { Request, Response } from 'express';
import UserRepository from './../../repositories/user/UserRepository';
import SystemResponse from '../../libs/systemResponse';
import IRequest from '../../libs/routes/IRequest';


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

    

    create = (req: Request, res: Response) => {
        try {
            console.log(" :::::::::: Inside Create Trainee :::::::: ");

            const { email, name,role, address, hobbies, dob, mobileNumber } = req.body;

            this.userRepository
                .create({ email, name, address,role, hobbies, mobileNumber })
                .then(user => {
                    return SystemResponse.success(res, user, "trainee added successfully");
                })
                .catch(error => {
                    throw error;
                });
        } catch (err) { }
    };

    get = (req: Request, res: Response) => {
        try {
            console.log(" :::::::::: Inside List Trainee :::::::: ");
            this.userRepository.list().then(user => {
                console.log(user);
                return SystemResponse.success(res, user, "Users List");
            }).catch(error => {
                throw error;
            });
        } catch (err) { }
    };
    update = (req: Request, res: Response) => {
        try {
            console.log(' :::::::::: Inside Update Trainee :::::::: ');
            const { id, dataToUpdate } = req.body;
            
            this.userRepository.update({ _id: id }, dataToUpdate).then(user => {
                this.userRepository.findOne({ _id: id }).then(user => {
                    return SystemResponse.success(res, user, 'Updated successfully');
                }).catch(error => {
                    throw error
                })
                
            }).catch(error => {
                throw error
            })
        }
        catch (err) {

        }
        
    };
    delete = (req: Request, res: Response) => {
        try {
            console.log(" :::::::::: Inside Delete Trainee :::::::: ");
            const data = req.body;
            this.userRepository.delete(data.id).then(user => {
                console.log(user);
                return SystemResponse.success(res, user, "user deleted successfully")
            })
                .catch(error => {
                    throw error;
                });

        } catch (err) { }
        
       
    };
}

export default UserController.getInstance();