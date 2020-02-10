import { Request, Response } from 'express';
import  UserRepository from './../../repositories/user/UserRepository';
import SystemResponse from '../../libs/systemResponse';


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

            const { email, name, address, hobbies, dob, mobileNumber } = req.body;

            this.userRepository
                .create({ email, name, address, hobbies,  mobileNumber })
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
        try{
            console.log(" :::::::::: Inside Update Trainee :::::::: ");

            const data = req.body;
            this.userRepository.update(data.id,data).then(user => {
                console.log(user);
                return SystemResponse.success(res, user, "Updated successfully")
            })
            .catch(error => {
                throw error;
            });

        }catch (err){ }
        // console.log(" :::::::::: Inside Update Trainee :::::::: ");
        // res.send({
        //     status: "OK",
        //     message: "Trainee updated successfully",
        //     data: {
        //         id: 1001,
        //         name: "Chandrashekhar Kumar",
        //         address: "Delhi"
        //     }
        // });
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

        }catch (err) { }
        // console.log(" :::::::::: Inside Delete Trainee :::::::: ");
        // res.send({
        //     status: "OK",
        //     message: "Trainee deleted successfully",
        //     data: {
        //         id: 1001,
        //         name: "Chandrashekhar Kumar",
        //         address: "Delhi"
        //     }
        // });
    };
}

export default UserController.getInstance();