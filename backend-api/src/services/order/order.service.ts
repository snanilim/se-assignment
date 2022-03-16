import Order from './order.model';
import Settings from '../settings/settings.model';
import CTransection from '../cTransection/transection.model';
import userCommission from '../userCommission/commission.model';


export const add = async (data) => {
    try {
        console.log("data", data);
        // check slab
        const settingsIn = await Settings.getOne('622eddc3461c99340fd0c670');
        const settingsInfo = settingsIn.data;
        console.log("settingsInfo", settingsInfo);

        // Add order
        let orderdata = {user_id: String, trace_trans_id: String, product_id: String, price: Number};
        orderdata.user_id = data.user_id
        orderdata.trace_trans_id = data.trace_trans_id
        orderdata.product_id = data.product_id
        orderdata.price = data.price
        const resOrder = await Order.add(orderdata);

        // transection history
        let transdata = {trace_trans_id: String, user_id: String, point_ratio: Number, point_in_tk_ratio: Number, amount: Number};
        transdata.trace_trans_id = data.trace_trans_id
        transdata.user_id = data.user_id
        transdata.point_ratio = settingsInfo.point_ratio
        transdata.point_in_tk_ratio = settingsInfo.point_in_tk_ratio
        transdata.amount = data.price
        const resTrans = await CTransection.add(transdata);

        
        
        // user commission
        const getCommissionInfo = await userCommission.getOne(data.user_id);
        const getCommission = getCommissionInfo.data
        console.log("getCommission", getCommission)

        let commissiondata = {point: Number, point_in_tk: Number, user_type: String};
        let user_type = getCommission.user_type

        const calPoint = (data.price / 100) * settingsInfo.point_ratio;
        const calPointTk = calPoint * settingsInfo.point_in_tk_ratio;

        commissiondata.point = getCommission.point + calPoint;
        commissiondata.point_in_tk = getCommission.point_in_tk + calPointTk;

        if(commissiondata.point > settingsInfo.silver){
            user_type = "silver"
        }else if(commissiondata.point > settingsInfo.gold){
            user_type = "gold"
        }else if(commissiondata.point > settingsInfo.platinum){
            user_type = "platinum"
        }

        commissiondata.user_type = user_type

        const resCommission = await userCommission.update(commissiondata, data.user_id);

        return resCommission;
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