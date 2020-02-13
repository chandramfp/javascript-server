
import * as mongoose from 'mongoose';
import { DocumentQuery } from 'mongoose';


class VersionableRepository<D extends mongoose.Document, M extends mongoose.Model<D>>{

    static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }
    private modelType: M;

    constructor(modelType) {
        this.modelType = modelType;
    }

    count() {
        return this.modelType.countDocuments();
    }

    findOne(query) {
        return this.modelType.findOne(query);
    }

    public create(options): Promise<D> {
        const id = VersionableRepository.generateObjectId();

        return this.modelType.create({
            ...options,
            _id: id,
            originalId: id,
            createdBy: id
        })
    }

    

    public list() {
        return this.modelType.find({deletedAt: undefined});
    }


    public update(id, data) {

        this.modelType.findById(id).then(user => {
            //console.log('user',user)
            const updatedData = Object.assign(user, data);
            this.updateAndCreate(updatedData);
        }).catch(error => {
            throw error
        });
        const deleteddata = {
            deletedBy: id,
            deletedAt: new Date()
        }
        return this.modelType.update(id, deleteddata);
    }

    public updateAndCreate(options) {
        console.log(options);
        const id = VersionableRepository.generateObjectId();
        return this.modelType.create({
            // name: options.name,
            // hobbies: options.hobbies,
            // email: options.email,
            // address: options.address,
            // role: options.role,
            originalId: options.originalId,
            ...options.toObject(),
            _id: id,
            createdBy: id,
            createdAt: new Date(),
            updatedAt: new Date(),
            updatedBy: id,
            
        });
    }


    public async delete(id: string) {
        
        return await this.modelType.update(id,{deletedAt: new Date(),deletedBy: id});
    }






}
export default VersionableRepository;