import Commision from './commission.model';

export const add = async (data) => {
    try {
        const resAdd = await Commision.add(data);
        return resAdd;
    } catch (error) {
        throw error;
    }
};

export const update = async (data, id) => {
    try {
        const resUpdate = await Commision.update(data, id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const deleteOne = async (id) => {
    try {
        const resUpdate = await Commision.deleteThis(id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const getAll = async (query) => {
    try {
        const resGetAll = await Commision.getAll(query);
        return resGetAll;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const resGetOne = await Commision.getOne(id);
        return resGetOne;
    } catch (error) {
        throw error;
    }
};