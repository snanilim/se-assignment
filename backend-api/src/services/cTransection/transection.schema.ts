import * as mongoose from 'mongoose';

const schemaOptions = {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
};

const addSchema = mongoose.Schema({
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
    },
    updateor_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
    },
    trans_type: {
        type: String,
        enum: ['deposit', 'withdraw', 'win', 'loss', 'return', 'addcoin'],
        trim: true
    },
    trace_trans_id: {
        type: String,
        trim: true
    },
    for_admin: {
        type: String,
        enum: ['add', 'sub'],
        trim: true
    },
    for_user: {
        type: String,
        enum: ['add', 'sub'],
        trim: true
    },
    for_lab: {
        type: String,
        enum: ['add', 'sub'],
        trim: true
    },
    for_com: {
        type: String,
        enum: ['add', 'sub'],
        trim: true
    },
    amount: {
        type: Number,
        Tim: true
    }
}, schemaOptions);

export default addSchema;