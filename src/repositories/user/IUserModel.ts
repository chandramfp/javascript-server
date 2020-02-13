import * as mongoose from 'mongoose';
import IVersionableDocument from '../versionable/IVersionableDocument'

interface IUserModel extends IVersionableDocument {
    id: string,
    name: string,
    address: string,
    email: string,
    dob: Date,
    mobile: number,
    hobbies: string[]
}

export default IUserModel;