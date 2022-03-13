import { const_msg } from '../../helper';
import { APIError } from '../../core';

import Transection from './transection.model';
import User from '../user/user.model';

export const add = async (data) => {
    try {
        const resAdd = await Transection.add(data);
        return resAdd;
    } catch (error) {
        throw error;
    }
};

export const update = async (data, id) => {
    try {
        const data_status = data.status;
        const oneDepInfo = await Transection.getOne(id)

        console.log("oneDepInfo", oneDepInfo)
        const value = oneDepInfo.data.amount;

        if (data_status == 'accepted'){
            if(oneDepInfo.data.status == 'accepted'){ // if alrady accepted
                const err = {
                    status: const_msg.BAD_REQUEST_CODE,
                    isPublic: true,
                    message: "Amount already accepted"
                };
                throw new APIError(err);
            }
            const user_id = oneDepInfo.data.user_id;
            const addInfo = await User.addValue(user_id, value);

            const resUpdate = await Transection.update(data, id);
            return resUpdate;
        }
        const resUpdate = await Transection.update(data, id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const deleteOne = async (id) => {
    try {
        const resUpdate = await Transection.deleteThis(id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const getAll = async (query) => {
    try {
        const resGetAll = await Transection.getAll(query);
        return resGetAll;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const resGetOne = await Transection.getOne(id);
        return resGetOne;
    } catch (error) {
        throw error;
    }
};