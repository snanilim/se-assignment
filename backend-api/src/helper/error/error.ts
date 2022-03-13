import * as config from 'config';
import { Winston, Logger } from '../../helper';
import { resEnd } from '../logger/logger.util';
import { APIError } from '../../core';
import { const_msg } from '../utils/const-msg.util';

const handeler = (err, req, res, next) => {
    const logger = new Logger('Error');
    const errorMessage = {
        message: err.message,
        error: err.error,
        stack: err.stack,
    };

    if (config.util.getEnv('NODE_ENV') !== 'development') {
        delete errorMessage.stack;
    }

    logger.error({ status: err.status || 500, message: errorMessage, transactionID: req.uniqID });

    res.status(err.status || 500);
    res.json(errorMessage);
    resEnd(req, res);
    return res.end();
};

export const errorHandler = handeler;

export const notFound = (req, res, next) => {
    const err = new APIError({
        message: const_msg.NOT_FOUND,
        status: const_msg.NOT_FOUND_CODE,
    });
    return handeler(err, req, res, next);
};