import { SignOptions, sign, verify } from 'jsonwebtoken';
import { JwtOptions } from './jwt-options.interface';
import { jwtConfig } from '../../configer/jwt.config';

export class JwtService{
    private static instance: JwtService;

    constructor(
        private readonly options?: JwtOptions
    ){}

    static getInstance(): JwtService{
        if (!this.instance){
            this.instance = new JwtService(jwtConfig);
        }
        return this.instance;
    }

    sign(payload, options?: SignOptions){
        return sign(payload, this.options.secretOrPrivateKey, { ...this.options.signOptions, ...options });
    }

    verify(token, options?: SignOptions){
        return verify( token, this.options.secretOrPrivateKey, {...this.options.verifyOptions, ...options});
    }
}