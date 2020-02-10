import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
import IUserCreate from '../entities/IUserCreate'



class UserRepository {
    private userModel: mongoose.Model<IUserModel>

    constructor() {
        this.userModel = userModel;userModel
    }

    create = (data: IUserCreate) => {
        console.log('data',data)
        return this.userModel.create(data);
    }

    count = () => {
        return this.userModel.countDocuments();
    }

    findOne = (data) => {
        return this.userModel.findById(data);
    }
        
    update = (id, data) => {
        return this.userModel.update(id, data);
    }
        
    list = () => {
        return this.userModel.find();
    }
        
    delete = (id) => {
        return this.userModel.findByIdAndDelete(id);
    }
}

export default UserRepository;