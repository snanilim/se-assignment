import { MainRouter } from '../../core/app/main.router';
import { get, post } from './user.controller';

export class UserRouter extends MainRouter{
    constructor(){
        super('user');
    }

    onInit(): void{
        this.router.route('/getOneUser/:id').get(get);
    }
}