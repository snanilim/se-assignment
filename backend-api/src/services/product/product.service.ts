import Product from './product.model';

export const add = async (data) => {
    try {
        const resAdd = await Product.add(data);
        return resAdd;
    } catch (error) {
        throw error;
    }
};

export const update = async (data, id) => {
    try {
        const resUpdate = await Product.update(data, id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const deleteOne = async (id) => {
    try {
        const resUpdate = await Product.deleteThis(id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const getAll = async (query) => {
    try {
        const resGetAll = await Product.getAll(query);
        return resGetAll;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const resGetOne = await Product.getOne(id);
        return resGetOne;
    } catch (error) {
        throw error;
    }
};