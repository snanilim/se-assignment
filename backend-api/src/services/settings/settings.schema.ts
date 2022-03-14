import * as mongoose from 'mongoose';

const schemaOptions = {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
};

const addSchema = mongoose.Schema({
    point_ratio: { // how many point you want to give in 100tk purchase
        type: Number,
        Tim: true
    },
    point_in_tk_ratio:{
        type: Number,
        Tim: true
    },
    silver: {
        type: Number,
        Tim: true
    },
    gold:{
        type: Number,
        Tim: true
    },
    platinum:{
        type: Number,
        Tim: true
    }
}, schemaOptions);

export default addSchema;