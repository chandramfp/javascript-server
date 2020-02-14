import * as mongoose from 'mongoose';
import UserSchema from './UserSchema';
import IUserModel from './IUserModel';

const toConvert = {
    transfers: (doc: any, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret._v;

    }
};
export const userSchema = new UserSchema({
    collction: 'Users',
    toJSON: toConvert,
    toObject: toConvert,
});
export const userModel: mongoose.Model<IUserModel> =
mongoose.model<IUserModel>('User', userSchema, 'Users', true);