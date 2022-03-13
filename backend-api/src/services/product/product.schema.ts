import * as mongoose from 'mongoose';

const schemaOptions = {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
};

const addSchema = mongoose.Schema({
    name: {
        type: String,
        Tim: true
    },
    price:{
        type: Number,
        Tim: true
    }
}, schemaOptions);

export default addSchema;