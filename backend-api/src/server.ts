import * as dotenv from 'dotenv';
dotenv.config();
import * as config from 'config';
import 'reflect-metadata';
import { App, dbInitializer } from './core';
import { dbConfig } from './configer';
import { AppConfig } from './core/app/app-config';
import { routes } from './services/routes';

async function bootstrap() {
    await dbInitializer();

    const app = new App(new AppConfig());
    app.bodyParser();
    app.helmet();
    app.cors();
    app.morgan();
    app.apiPrefix(`${config.get('version')}/api`);
    app.modulesInitializer(routes);
    await app.listen();
}
bootstrap();
