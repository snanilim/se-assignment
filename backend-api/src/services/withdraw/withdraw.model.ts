import * as mongoose from 'mongoose';
import { const_msg } from '../../helper';
import { APIError } from '../../core';
import { identity } from 'rxjs';

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
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
    },
    payment_method: {
        type: String,
        enum: ['bkash', 'rocket', 'nagad', 'skrill', 'paypal', 'upay'],
        trim: true,
    },
    to_number: {
        type: String,
        trim: true,
    },
    amount: {
        type: Number,
        trim: true
    },
    trans_id: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ['pending', 'rejected', 'accepted'],
        default: 'pending',
        trim: true
    },
    personal_agent: {
        type: String,
        enum: ['personal', 'agent'],
        trim: true
    }
}, schemaOptions);

addSchema.statics = {

    async add(data) {
        // console.log(data);
        try {
            const addInfo = {
                user_id: data. user_id,
                payment_method: data.payment_method,
                to_number: data.to_number,
                amount: data.amount,
                trans_id: data.trans_id,
                status: data.status,
                personal_agent: data.personal_agent,
            };
            const add = new this(addInfo);
            const info = await add.save();
            return {data: info};
        } catch (err) {
            throw new APIError(err);
        }
    },

    async update(data, id) {
        try {
            const updateInfo = {
                user_id: data. user_id,
                payment_method: data.payment_method,
                to_number: data.to_number,
                amount: data.amount,
                trans_id: data.trans_id,
                status: data.status,
                personal_agent: data.personal_agent,
            };
            const info = await this.updateOne({ _id: id }, updateInfo);
            return {data: info};
        } catch (err) {
            throw new APIError(err);
        }
    },

    async deleteThis(id) {
        try {
            const info = await this.deleteOne({ _id: id });
            return {data: info};
        } catch (err) {
            throw new APIError(err);
        }
    },

    async getOne(id) {
        try {
            const info = await this.findOne({ _id: id });
            return {data: info};
        } catch (err) {
            throw new APIError(err);
        }
    },

    async getOneByname(name) {
        try {
            const info = await this.findOne({ name });
            return {data: info};
        } catch (err) {
            throw new APIError(err);
        }
    },

    async getAll({
        page = 1, perPage = 20, user_id, payment_method, to_number, trans_id, status,
    }) {
        // console.log("id", user_id)
        const queryObj = { user_id, payment_method, to_number, trans_id, status };
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
};

const Withdraw = mongoose.model('Withdraw', addSchema);
export default Withdraw;
