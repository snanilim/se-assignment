import Withdraw from './withdraw.model';

export const add = async (data) => {
    try {
        const resAdd = await Withdraw.add(data);
        return resAdd;
    } catch (error) {
        throw error;
    }
};

export const update = async (data, id) => {
    try {
        const resUpdate = await Withdraw.update(data, id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const deleteOne = async (id) => {
    try {
        const resUpdate = await Withdraw.deleteThis(id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const getAll = async (query) => {
    try {
        const resGetAll = await Withdraw.getAll(query);
        return resGetAll;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const resGetOne = await Withdraw.getOne(id);
        return resGetOne;
    } catch (error) {
        throw error;
    }
};