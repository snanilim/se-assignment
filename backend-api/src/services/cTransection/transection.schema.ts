import * as mongoose from 'mongoose';

const schemaOptions = {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
};

const addSchema = mongoose.Schema({
    trace_trans_id: {
        type: String,
        trim: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true
    },
    point_ratio: {
        type: Number,
        trim: true
    },
    point_in_tk_ratio: {
        type: Number,
        trim: true
    },
    amount: {
        type: Number,
        Tim: true
    }
}, schemaOptions);

export default addSchema;