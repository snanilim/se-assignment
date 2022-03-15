import Order from './order.model';
import Settings from '../settings/settings.model';
import CTransection from '../cTransection/transection.model';


export const add = async (data) => {
    try {
        console.log("data", data);
        // check slab
        const settingsInfo = await Settings.getOne('622eddc3461c99340fd0c670');
        console.log("settingsInfo", settingsInfo);

        // Add order
        let orderdata = {};
        orderdata.
        const resOrder = await Order.add(orderdata);

        // transection history
        let transdata = {};
        transdata.
        const resTrans = await CTransection.add(transdata);

        // user commission
        let transdata = {};
        transdata.
        const resTrans = await CTransection.add(transdata);

        // return resAdd;
    } catch (error) {
        throw error;
    }
};

export const update = async (data, id) => {
    try {
        const resUpdate = await Order.update(data, id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const deleteOne = async (id) => {
    try {
        const resUpdate = await Order.deleteThis(id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const getAll = async (query) => {
    try {
        const resGetAll = await Order.getAll(query);
        return resGetAll;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (id) => {
    try {
        const resGetOne = await Order.getOne(id);
        return resGetOne;
    } catch (error) {
        throw error;
    }
};