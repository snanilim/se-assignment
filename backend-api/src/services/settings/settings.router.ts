import { MainRouter } from '../../core/app/main.router';
import { getOne, update } from './settings.controller';

export class SettingsRouter extends MainRouter{
    constructor(){
        super('settings');
    }

    onInit(): void {
        this.router.route('/getOne/:id').get(getOne);
        this.router.route('/update/:id').post(update);
    }
}
