import * as mongoose from 'mongoose';

const schemaOptions = {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  };

const roles = ['user', 'admin'];
const userSchema = mongoose.Schema({
    email: {
        type: String,
        match: /^\S+@\S+\.\S+$/,
        required: true,
        maxlength: 50,
        minlength: 3,
        trim: true,
        lowercase: true,
        unique: true,
    },
    full_name: {
        type: String,
        maxlength: 50,
        minlength: 3,
        trim: true,
    },
    username: {
        type: String,
        maxlength: 50,
        minlength: 3,
        trim: true,
        unique: true,
        required: true,
    },
    mobile_number: {
        type: String,
        maxlength: 14,
        minlength: 11,
        trim: true,
        unique: true,
        required: true,
    },
    

}, schemaOptions);

export default userSchema;