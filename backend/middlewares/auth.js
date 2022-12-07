import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/index.js';

export const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError('Для входа аутентифицируйтесь 1'));
  } else {
    const token = authorization.replace(/^Bearer*\s*/i, '');
    try {
      const decoded = jwt.verify(token, 'token-secret-salt');
      const payload = decoded._id;
      req.user = { _id: payload };
      next();
    } catch (err) {
      next(new UnauthorizedError('Для входа аутентифицируйтесь 2'));
    }
  }
};
