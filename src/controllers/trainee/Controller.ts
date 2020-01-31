import { Request, Response } from 'express';
class Controller {
    static instance: Controller;
    static getInstance = () => {
        if (Controller.instance) {
            return Controller.instance;
        }
        Controller.instance = new Controller();
        return Controller.instance;
    }

    create = (req: Request, res: Response) => {
        console.log('::::::: INSIDE CREATE TRAINEE :::::::');
        res.send({
            status: 'Ok',
            message: 'Trainee Added Successfully',
            data: {
                Id: '1001',
                name: 'Jhon',
                address: 'Noida'
            }
        });
    }

    get = (req: Request, res: Response) => {
        console.log('::::::: INSIDE TRAINEE LIST :::::::');
        res.send({
            status: 'Ok',
            message: 'List Of Trainee',
            data: [{
                Id: '1001',
                name: 'Jhon',
                address: 'Noida'
            },
            {
                Id: '1002',
                name: 'Alex',
                address: 'Pune'
            },
            {
                Id: '1003',
                name: 'Alexander',
                address: 'Delhi'
            }
            ],

        });

    }
    delete = (req: Request, res: Response) => {
        console.log('::::::: INSIDE DELETE RECORD :::::::');
        res.send({
            status: 'Ok',
            message: 'Record Deleted Successfully',
            data: {
                Id: '1001',
                name: 'Jhon',
                address: 'Noida'
            }
        });
    }
    update = (req: Request, res: Response) => {
        console.log('::::::: INSIDE UPDATE RECORD :::::::');
        res.send({
            status: 'Ok',
            message: 'Record Updated Successfully',
            data: {
                Id: '1004',
                name: 'Mark',
                address: 'Mumbai'
            }
        });
    }





}

export default Controller.getInstance();