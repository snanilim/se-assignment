import { MainRouter } from '../../core/app/main.router';
import { getAll, register, getOne, update } from './auth.controller';

export class AuthRouter extends MainRouter{
    constructor(){
        super('auth');
    }

    onInit(): void {
        this.router.route('/register').post(register);
        this.router.route('/getAll').get(getAll);
        this.router.route('/getOneUser/:id').get(getOne);
        this.router.route('/update/:id').post(update);
    }
}
