import { MainRouter } from '../../core/app/main.router';
import { JwtService } from '../../packages/jwt/jwt.service';

export class AccountRouter extends MainRouter{
    private readonly jwtService: JwtService;
    constructor(){
        super('account');
        this.jwtService = JwtService.getInstance();
    }

    async token(req, res, next){
        const token = this.jwtService.sign({ name: 'test' }, { subject: 'id' });
        return res.json(token);
    }

    onInit(): void{
        this.router.post('/token', (req, res, next) => this.token(req, res, next));
    }
}