import * as moment from 'moment';
import * as config from 'config';
import User from '../user/user.model';
import RefreshToken from './refreshToken';
import userCommission from '../userCommission/commission.model';

const generateToken = (user, accessToken) => {
    try {
        const tokenType = 'Bearer';
        const refreshToken = RefreshToken.generate(user).token; // its only reply token from full obj
        const expireTime = moment().add(config.get('jwtTimeExpire'), 'days').unix();

        return {
            tokenType,
            refreshToken,
            accessToken,
            expireTime,
        };
    } catch (error) {
        throw error;
    }
};

export const register = async (data) => {
    try {
        const user = new User({
            email: data.email,
            full_name: data.full_name,
            username: data.username,
            mobile_number: data.mobile_number,
        });
        const resSaveUser = await user.save();
        const resCommissionUser = await userCommission.add({user_id: resSaveUser.id})
        const fullData = {
            user: resSaveUser,
        };
        return fullData;
    } catch (error) {
        throw User.checkDuplicateEmail(error);
    }
};

export const login = async (userData) => {
    try {
        const { user, accessToken } = await User.findAndGenerateToken(userData);
        const token = generateToken(user, accessToken);

        const fullData = {
            token,
            user,
            // agent: agentInfo,
            // club: clubInfo
        };
        return fullData;
    } catch (error) {
        throw User.checkDuplicateEmail(error);
    }
};

export const userChecker = async (userData) => {
    try {
        const info = await User.checkOneUser(userData);
        return info;
    } catch (error) {
        throw error;
    }
};

export const update = async (data, id) => {
    try {
        const resUpdate = await User.update(data, id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const deleteOne = async (id) => {
    try {
        const resUpdate = await User.deleteThis(id);
        return resUpdate;
    } catch (error) {
        throw error;
    }
};

export const getAll = async (query) => {
    try {
        const resGetAll = await User.getAllUser(query);
        return resGetAll;
    } catch (error) {
        throw error;
    }
};

export const getOne = async (userId) => {
    try {
        const user = await User.getOneUser(userId);
        return user;
    } catch (error) {
        throw error;
    }
};