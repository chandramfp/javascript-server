import * as mongoose from 'mongoose';



class UserSchema extends mongoose.Schema {
    constructor(option) {
        const UserSchema = {
            id: String,
            name: String,
            address: String,
            email: String,
            dob: Date,
            mobile: Number,
            hobbies: [String]
        }
        super(UserSchema, option);
    }
}

export default UserSchema;
