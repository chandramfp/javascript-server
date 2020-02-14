import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
import IUserCreate from '../entities/IUserCreate'
import VersionableRepository from '../versionable/VersionableRepository'



class UserRepository extends VersionableRepository< IUserModel,mongoose.Model<IUserModel>>{
    
    private userModel: mongoose.Model<IUserModel>

    constructor() {
        super(userModel);
        this.userModel = userModel;
    }
    // getObjectId() {
    //     return String(mongoose.Types.ObjectId());
    // }

    create = (data: any): Promise<IUserModel> => {
        //console.log('data', data)
        return super.create(data);
    }

    // count = () => {
    //     return this.userModel.countDocuments();
    // }

    // findOne = (data) => {
    //     return this.userModel.findById(data);
    // }

    // update = (id, data) => {
    //     return this.userModel.update(id, data);
    // }

    update = (id, data) => {
        return super.update(id, data);
    }


    list = () => {
        return super.list();
    }


    delete = (id) => {
        //console.log(id)
        return super.delete(id);
    }

    // delete = (id) => {
    //     return this.userModel.findByIdAndDelete(id);
    // }
}

export default UserRepository;