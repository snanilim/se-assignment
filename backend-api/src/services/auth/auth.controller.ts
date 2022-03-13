import * as service from './auth.service';
import { res_send, const_msg } from '../../helper';

export const register = async (req, res, next) => {
    try {
        const response = await service.register(req.body);
        // console.log("response", response);
        res_send(response, const_msg.CREATED_CODE, req, res, next);
    } catch (error) {
        return next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const response = await service.login(req.body);
        res_send(response, const_msg.CREATED_CODE, req, res, next);
    } catch (error) {
        return next(error);
    }
};

export const userChecker = async (req, res, next) => {
    try {
        const response = await service.userChecker(req.body);
        res_send(response, const_msg.CREATED_CODE, req, res, next);
    } catch (error) {
        return next(error);
    }
};

export const update = async (req, res, next) => {
    const {id} = req.params;
    try {
        const response = await service.update(req.body, id);
        res_send(response, const_msg.SUCCESS_CODE, req, res, next);
    } catch (error) {
        return next(error);
    }
};

export const deleteOne = async (req, res, next) => {
    const {id} = req.params;
    try {
        const response = await service.deleteOne(id);
        res_send(response, const_msg.SUCCESS_CODE, req, res, next);
    } catch (error) {
        return next(error);
    }
};

export const getAll = async (req, res, next) => {
    const { query } = req;
    try {
        const response = await service.getAll(query);
        res_send(response, const_msg.SUCCESS_CODE, req, res, next);
    } catch (error) {
        return next(error);
    }
};

export const getOne = async (req, res, next) => {
    // console.log('req.params.id', req.params.id);
    try {
        const response = await service.getOne(req.params.id);
        res_send(response, const_msg.SUCCESS_CODE, req, res, next);
    } catch (error) {
        return next(error);
    }
};