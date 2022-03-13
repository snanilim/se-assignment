import { JwtOptions } from '../packages/jwt/jwt-options.interface';
import { resolve } from 'path';
import { readFileSync } from 'fs';

export const jwtConfig: JwtOptions = {
    secretOrPrivateKey:
      process.env.JWT_SECRET_KEY || readFileSync(resolve('.jwt', 'jwtRS256.key')),
    secretOrPublicKey:
      process.env.JWT_PUBLIC_KEY ||
      readFileSync(resolve('.jwt', 'jwtRS256.key.pub')),
    signOptions: {
      algorithm: 'RS256',
      issuer: process.env.JWT_ISSUER || '@nl-middleware/auth',
      expiresIn: process.env.JWT_EXPIRY || 3600,
    },
    verifyOptions: {
      algorithms: ['RS256'],
      issuer: process.env.JWT_ISSUER || '@nl-middleware/auth',
    },
  };
