import * as mongoose from 'mongoose';
import IUserModel from './IUserModel';
import { userModel } from './UserModel';
import IUserCreate from '../entities/IUserCreate';
import VersionableRepository from '../versionable/VersionableRepository';



class UserRepository extends VersionableRepository< IUserModel, mongoose.Model<IUserModel>> {

    private userModel: mongoose.Model<IUserModel>;

    constructor() {
        super(userModel);
        this.userModel = userModel;
    }

    create = (data, userId): Promise<IUserModel> => {

        return super.create(data, userId);
    }

    count = () => {
        return super.count();
    }

    update = (id, data, userId) => {
        return super.update(userId, id, data);
    }


   

    list = (data, skip, limit, sortData) => {
        return super.list(data, skip, limit, sortData);
    }


    delete = (id, userId) => {
        // console.log(id)
        return super.delete(id, userId);
    }

}
export default UserRepository;