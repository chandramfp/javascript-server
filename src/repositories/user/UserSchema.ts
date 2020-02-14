import * as mongoose from 'mongoose';
import VersionableSchema from '../versionable/VersionableSchema';



class UserSchema extends VersionableSchema {
    constructor(option) {
        const UserSchema = {
            id: String,
            name: String,
            address: String,
            email: String,
            dob: Date,
            mobile: Number,
            hobbies: [String],
            role: String,
            password: String
        }
        super(UserSchema, option);
    }
}

export default UserSchema;
