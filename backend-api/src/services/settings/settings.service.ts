import Settings from './settings.model';

export const add = async (data) => {
    try {
        const resAdd = await Settings.add(data);
        return resAdd;
    } catch (error) {
        throw error;
    }
};

export const update = async (data, id) => {
    try {
        const resUpdate = await Settings.update(data, id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const deleteOne = async (id) => {
    try {
        const resUpdate = await Settings.deleteThis(id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const getAll = async (query) => {
    try {
        const resGetAll = await Settings.getAll(query);
        return resGetAll;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const resGetOne = await Settings.getOne(id);
        return resGetOne;
    } catch (error) {
        throw error;
    }
};