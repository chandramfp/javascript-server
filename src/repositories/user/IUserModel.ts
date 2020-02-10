import * as mongoose from 'mongoose';

interface IUserModel extends mongoose.Document{
    _id: string,
    name: string,
    address: string,
    email: string,
    dob: Date,
    mobile: number,
    hobbies: string[]
}

export default IUserModel;