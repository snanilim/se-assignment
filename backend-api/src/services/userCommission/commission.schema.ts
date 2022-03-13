import * as mongoose from 'mongoose';

const schemaOptions = {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
};

const addSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
    },
    point: {
        type: Number,
        Tim: true
    },
    point_in_tk:{
        type: Number,
        Tim: true
    }
}, schemaOptions);

export default addSchema;