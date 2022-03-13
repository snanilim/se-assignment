/* tslint:disable:no-var-requires */
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

export const commonInfo = () => {
    const info = {
        filename: `${process.env.LOG_DIR}/%DATE%-combine.log`,
        frequency: '1H',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        level: 'custom',
        handleExceptions: true,
        humanReadableUnhandledException: true,
    };
    return info;
};

export const options = () => {
    const levels = {
        error: 0,
        debug: 1,
        warn: 2,
        data: 3,
        info: 4,
        success: 5,
        silly: 6,
        start: 7,
        end: 8,
        streem: 9,
        custom: 10,
        transection: 11,
    };
    return levels;
};

export const formatInfo = (fileName) => {
    return format.combine(
        format.label({ label: fileName }),
        format.ms(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.json(info => `${info.ms} ${info.level} ${info.timestamp} [${info.label}]: ${info.message}`),
    );
};
