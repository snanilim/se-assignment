import * as moment from 'moment';
import * as config from 'config';
import User from '../user/user.model';
import RefreshToken from './refreshToken';

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
            password: data.password,
            full_name: data.full_name,
            username: data.username,
            mobile_number: data.mobile_number,
            role: data.role,
            permission: data.permission,
            img_src: data.img_src,
            club_id: data.club_id,
            sponsor_username: data.sponsor_username,
            is_active: data.is_active,
            deleted: data.deleted,
            balance: data.balance,
            ratio: data.ratio,
        });
        const resSaveUser = await user.save();
        // console.log("resSaveUser", resSaveUser)
        const { accessToken } = await User.findAndGenerateToken({ username: data.username, password: data.password });
        const token = generateToken(resSaveUser, accessToken);
        // console.log("user", token);
        const fullData = {
            token,
            user: resSaveUser,
            // agent: agentInfo,
            // club: clubInfo
        };
        // token.club = clubInfo;
        // token.agent = agentInfo;
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