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
    trace_trans_id: {
        type: String,
        Tim: true
    },
    product_id: {
        type: String,
        Tim: true
    },
    price:{
        type: Number,
        Tim: true
    }
}, schemaOptions);

export default addSchema;