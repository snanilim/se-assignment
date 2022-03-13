import { SignOptions, VerifyOptions, DecodeOptions } from 'jsonwebtoken';

export interface JwtOptions{
    secretOrPublicKey: string | Buffer;
    secretOrPrivateKey: string | Buffer;
    signOptions?: SignOptions;
    verifyOptions?: VerifyOptions;
    decodeOptions?: DecodeOptions;
}