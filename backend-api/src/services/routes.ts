import { UserRouter } from './user/user.router';
import { AccountRouter } from './account/account.router';
import { AuthRouter } from './auth/auth.router';

import { CommissionRouter } from './userCommission/commission.router';
import { SettingsRouter } from './settings/settings.router';
import { OrderRouter } from './order/order.router';
import { ProductRouter } from './product/product.router';
import { CTransectionRouter } from './cTransection/transection.router';

export const routes = [
    new AuthRouter(),
    new CommissionRouter(),
    new SettingsRouter(),
    new OrderRouter(),
    new ProductRouter(),
    new CTransectionRouter()
];