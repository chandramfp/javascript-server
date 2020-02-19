
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
        return this.modelType.find({deletedAt: undefined}).count();
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

    public async list(data,skip, limit, sortData) {

        const l = parseInt(limit);
        const s = parseInt(skip);

        return this.modelType.find(data).skip(s).limit(l).sort(sortData);
    }


    public update(id, data, userId) {

        this.modelType.findById(id).then(user => {
            const updatedData = Object.assign(user, data);

            this.updateAndCreate(updatedData, userId);
        }).catch(error => {
            throw error;
        });
        const deleteddata = {
            deletedBy: userId._id,
            deletedAt: new Date()
        };
        return this.modelType.update(id, deleteddata);
    }

    public updateAndCreate(options, userId) {
        const id = VersionableRepository.generateObjectId();
        return this.modelType.create({
            originalId: options.originalId,
            ...options.toObject(),
            _id: id,
            createdBy: userId._id,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedBy: userId._id,
        });
    }


    public async delete(id, userId) {

        return await this.modelType.update(id, { deletedAt: new Date(), deletedBy: userId._id});
    }

}
export default VersionableRepository;