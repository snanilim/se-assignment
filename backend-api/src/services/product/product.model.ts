import * as mongoose from 'mongoose';
import { const_msg } from '../../helper';
import { APIError } from '../../core';
import { identity } from 'rxjs';
import addSchema from './product.schema';


addSchema.statics = {
    async add(data) {
        // console.log(data);
        try {
            const addInfo = {
                name: data.name,
                price: data.price,
                img_url: data.img_url
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
                name: data.name,
                price: data.price,
                img_url: data.img_url
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


            const info = await this.updateOne({ _id: id }, newObj );
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

    async removeAll(id) {
        try {
            const info = await this.remove({ trace_trans_id: id });
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
        page = 1, perPage = 20,  name
    }) {
        // console.log("id", user_id)
        const queryObj = {  name };
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

    async addValue(id, value){
        try{
            const info = await this.updateOne({ _id : id },{ $inc: { balance: value } });
            return {data: info};
        } catch (error) {
            throw error;
        }
        
    },

    async addInValue(id, value){
        try{
            const info = await this.updateOne({ _id : id },{ $inc: { in_balance: value } });
            return {data: info};
        } catch (error) {
            throw error;
        }
        
    }
};

const product = mongoose.model('product', addSchema);
export default product;
