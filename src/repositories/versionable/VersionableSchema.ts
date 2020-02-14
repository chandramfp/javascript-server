import * as mongoose from 'mongoose'

class VersionableSchema extends mongoose.Schema {

    constructor(schema, options) {
        const baseSchema = {
            createdAt: {
                type: Date,
                default: Date.now
            },
            originalId: String,
            createdBy: String,
            updatedAt: Date,
            updatedBy: String,
            deletedAt: Date,
            deletedBy: String
        }
        super({ ...schema, ...baseSchema }, options)
    }
}

export default VersionableSchema;