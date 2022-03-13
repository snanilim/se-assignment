import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import * as config from 'config';
import { const_msg } from '../../helper';
import { APIError } from '../../core';
import userSchema from './user.schema';

const roles = ['user', 'admin'];
// userSchema.pre('save', async function save(next) {
//     try {
//       if (!this.isModified('password')) return next();
//       const salt = await bcrypt.genSalt(10);
//       const hash = await bcrypt.hash(this.password, salt);
//       this.password = hash;
//       return next();
//     } catch (error) {
//       return next(error);
//     }
// });

userSchema.method({
    userInfo() {
        const userInfo = {};
        const fields = ['id', 'name', 'email', 'picture', 'role', 'createdAt'];

        fields.forEach((field) => {
            userInfo[field] = this[field];
        });
        return userInfo;
    },

    token() {
        const payload = {
            sub: this.id,
            iat: moment().unix(),
            exp: moment().add(config.get('jwtTimeExpire'), 'minutes').unix(),
        };
        return jwt.sign(payload, config.get('token_secret'));
    },

    async comparePassword(password) {
        // return bcrypt.compare(password, this.password);
        if (password === this.password){
            return true;
        } else {
            return false;
        }
    },
});

userSchema.statics = {
    roles,
    async update(data, id) {
        try {
            const updateInfo = {
                email: data.email,
                password: data.password,
                full_name: data.full_name,
                username: data.username,
                mobile_number: data.mobile_number,
                role: data.role,
                permission: data.permission,
                img_src: data.img_src,
                club_id: data.club_id,
                sponsor_username: data.sponsor_username,
                is_active: data.is_active,
                deleted: data.deleted,
                balance: data.balance,
                ratio: data.ratio,
            };
            const newObj = Object.keys(updateInfo)
            .filter(key => updateInfo[key] !== undefined)
            .filter(key => updateInfo[key] !== 'null')
            .filter(key => updateInfo[key] !== null)
            .reduce((obj, key) => {
                // eslint-disable-next-line no-param-reassign
                obj[key] = updateInfo[key];
                return obj;
            }, {});
            const resUpdate = this.updateOne({ _id: id }, newObj);
            return resUpdate;
        } catch (err) {
            throw new APIError(err);
        }
    },

    async deleteThis(id) {
        try {
            const item = await this.deleteOne({ _id: id });
            return item;
        } catch (err) {
            throw new APIError(err);
        }
    },

    async getOneUser(userID) {
        try {
            const user = await this.findOne({ _id: userID });
            return user;
        } catch (err) {
            throw new APIError(err);
        }
    },

    async checkOneUser(options) {
        try {
            const { username, password } = options;
            if (!username) throw new APIError({ message: const_msg.USERNAME_IS_REQUIRED, status: const_msg.NOT_FOUND_CODE, });
            const user = await this.findOne({ username }).exec();
            const err = {
                status: const_msg.UNAUTHORIZED_CODE,
                isPublic: true,
                message: const_msg.UNAUTHORIZED
            };
            if (password) {
                if (user && await user.comparePassword(password)) {
                    return { data: user };
                }
            } else {
                err.message = const_msg.UNAUTHORIZED;
            }
            throw new APIError(err);
        } catch (err) {
            throw new APIError(err);
        }
    },

    async getAllUser({
        page = 1, perPage = 20, username, email, role, is_active
    }) {
        const queryObj = { username, email, role, is_active };
        const findQuery = Object.keys(queryObj)
            .filter(key => queryObj[key] !== undefined)
            .filter(key => queryObj[key] !== 'null')
            .filter(key => queryObj[key] !== null)
            .reduce((obj, key) => {
                // eslint-disable-next-line no-param-reassign
                obj[key] = queryObj[key];
                return obj;
            }, {});
        try {
            const info = await this.find(findQuery)
                .sort({ createdAt: -1 })
                .skip(perPage * (page - 1))
                .limit(perPage)
                .exec();
            return {data: info};
        } catch (error) {
            return error;
        }
    },

    async findAndGenerateToken(options) {
        try {
            const { username, password, refreshObj } = options;
            if (!username) throw new APIError({ message: const_msg.USERNAME_IS_REQUIRED, status: const_msg.NOT_FOUND_CODE, });
            const user = await this.findOne({ username }).exec();

            const err = {
                status: const_msg.UNAUTHORIZED_CODE,
                isPublic: true,
                message: ''
            };

            if (password) {
                if (user && await user.comparePassword(password)) {
                    return { user, accessToken: user.token() };
                }
                err.message = const_msg.UNAUTHORIZED;
            } else if (refreshObj && refreshObj.userEmail === username) {
                return { user, accessToken: user.token() };
            } else {
                err.message = const_msg.UNAUTHORIZED;
            }
            throw new APIError(err);
        } catch (error) {
            throw error;
        }
    },

    checkDuplicateEmail(error) {

        if (error.code === 11000 && (error.name === 'BulkWriteError' || error.name === 'MongoError')) {
            throw new APIError({
                message: const_msg.FIELD_EXIST,
                error: {
                    location: 'body',
                    message: [const_msg.FIELD_EXIST],
                },
                status: const_msg.CONFLICT_CODE,
                stack: error.stack,
                isPublic: true,
            });
        }
        return error;
    },

    async addValue(user_id, value){
        try{
            const info = await this.updateOne({ _id : user_id },{ $inc: { balance: value } });
            return {data: info};
        } catch (error) {
            throw error;
        }
        
    },

    async decValue(user_id, value){
        try{
            const info = await this.updateOne({ _id : user_id },{ $inc: { balance: -value } });
            return {data: info};
        } catch (error) {
            throw error;
        }
        
    }
};

const User = mongoose.model('User', userSchema);
export default User;
