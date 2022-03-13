import {ConnectionOptions} from 'typeorm';

export const dbConfig:ConnectionOptions = {
    type: "mongodb",
    host: "localhost",
    database: "test-type-orm",
    synchronize: true,
    logging: false,
}
