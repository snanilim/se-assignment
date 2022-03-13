import * as mongoose from 'mongoose';
import * as config from 'config';
import { Winston, Logger } from '../../helper';

export const dbInitializer = () => {
    const db = mongoose.connection;
    const winstonInit = new Winston();
    const winston = winstonInit.logger('db.ts');
    const mongo_uri = config.get('mongo_uri');
    const logger = new Logger('DB');

    mongoose.connect(mongo_uri, { keepAlive: 1, useNewUrlParser: true, });

    db.on('open', (ref) => { winston.info('Mongodb Connected Succesfully'); });

    db.on('error', (error) => {
        winston.error(`MongoDB Connection was faield: ${error.message}`);
        logger.error(`MongoDB Connection was faield: ${error.message}`);
        // process.exit(-1);
    });

    if (config.util.getEnv('NODE_ENV') === 'development')
        mongoose.set('debug', true);

    return db;
};
