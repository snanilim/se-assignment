import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as moment from 'moment';

const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true,
        index: true,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    userEmail: {
        type: String,
        ref: 'User',
        required: true,
    },
    expires: {
        type: Date,
    },
});

refreshTokenSchema.statics = {

    generate(user) {
        const userId = user.id;
        const userEmail = user.email;
        const token = `${userId}.${crypto.randomBytes(40).toString('hex')}`;
        const expires = moment().add(30, 'days').toDate();
        // eslint-disable-next-line no-use-before-define
        const tokenObj = new RefreshToken({
            token, userId, userEmail, expires,
        });
        tokenObj.save();
        return tokenObj;
    },
};

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
export default RefreshToken;
