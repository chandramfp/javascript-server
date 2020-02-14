import * as mongoose from 'mongoose';
import IVersionableDocument from '../versionable/IVersionableDocument'

interface IUserModel extends IVersionableDocument {
    id: string,
    name: string,
    address: string,
    email: string,
    dob: Date,
    mobile: number,
    hobbies: string[],
    password: String,
    originalId: String,
    role: String
}

export default IUserModel;