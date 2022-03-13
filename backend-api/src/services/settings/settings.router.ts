import { MainRouter } from '../../core/app/main.router';
import { add, getAll, getOne, update, deleteOne } from './settings.controller';

export class SettingsRouter extends MainRouter{
    constructor(){
        super('settings');
    }

    onInit(): void {
        this.router.route('/getAll').get(getAll);
        this.router.route('/add').post(add);
        this.router.route('/getOne/:id').get(getOne);
        this.router.route('/update/:id').post(update);
        this.router.route('/delete/:id').post(deleteOne);
    }
}
