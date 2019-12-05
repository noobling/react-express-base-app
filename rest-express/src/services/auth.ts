import { AUTH0_DOMAIN, AUTH0_AUDIENCE } from './../config';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

/**
 * This is the data returned when calling
 * /userinfo endpoint in auth0
 */
export interface Auth0User {
  sub: string;
  nickname: string;
  name: string;
  picture?: string;
  updated_at: string;
}

export const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: AUTH0_AUDIENCE,
  issuer: `${AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});
