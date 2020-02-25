
import * as mongoose from 'mongoose';
import { DocumentQuery } from 'mongoose';
import { userModel } from '../user/UserModel';


class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>> {

    static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    private modelType: M;

    constructor(modelType) {
        this.modelType = modelType;
    }

    count() {
        return this.modelType.find({ deletedAt: undefined }).count();
    }

    findOne(query) {
        return this.modelType.findOne(query);
    }

    public create(options, userId): Promise<D> {
        const id = VersionableRepository.generateObjectId();

        return this.modelType.create({
            ...options,
            _id: id,
            originalId: id,
            createdBy: userId._id
        });
    }

    public async list(data, skip, limit, sortData) {

        const s = parseInt(skip);
        const l = parseInt(limit);

        return this.modelType.find(data).limit(l).skip(s).sort(sortData);
    }


    public async update(userID, condition, data) {
        const user = await this.modelType.findOne(condition);
        Object.assign(user, data);
        const newid = VersionableRepository.generateObjectId();
        const newObj = {
            ...user.toObject(),
            _id: newid,
            createdBy: userID._id,
            updatedAt: new Date(),
            updatedBy: userID._id,
        };
        this.modelType.create(newObj);
        return await this.modelType.update(condition, { deletedBy: userID._id, deletedAt: new Date() });
    }

    public async delete(id, userId) {

        return await this.modelType.update(id, { deletedAt: new Date(), deletedBy: userId._id });
    }

   

}
export default VersionableRepository;