import { expressjwt } from 'express-jwt';

const { JWT_SECRET } = process.env;
console.log(JWT_SECRET);

export const getTokenFromHeaders = (req) => {
  const {
    headers: { authorization },
  } = req;
  if (!authorization) return null;
  const [target, token] = authorization.split(' ');
  if (target === 'Token' || target === 'Bearer') {
    return token;
  }
  return null;
};

export default {
  required: expressjwt({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
    getToken: getTokenFromHeaders,
  }),
  optional: expressjwt({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};
