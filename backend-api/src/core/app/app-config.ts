import { MainRouter } from './main.router';
import { isConstructor } from '../../helper/utils/shared.utils';
export class AppConfig {
    private routers: any[] = [];
    private apiPrefix: string;

    setRouter(router: any): void {
        this.routers.push(router);
    }

    getRouter(): any[]{
        return this.routers;
    }

    setApiPrefix(prefix: string): void{
        this.apiPrefix = prefix;
    }

    getApiPrefix(): any{
        return this.apiPrefix;
    }
}