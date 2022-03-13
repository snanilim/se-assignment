import { MainRouter } from '../../core/app/main.router';
import { register, login, userChecker, getAll, getOne, update, deleteOne } from './auth.controller';

export class AuthRouter extends MainRouter{
    constructor(){
        super('auth');
    }

    onInit(): void {
        this.router.route('/register').post(register);
        this.router.route('/login').post(login);
        this.router.route('/userChecker').post(userChecker);
        this.router.route('/getAll').get(getAll);
        this.router.route('/getOneUser/:id').get(getOne);
        this.router.route('/update/:id').post(update);
        this.router.route('/delete/:id').post(deleteOne);
    }
}
