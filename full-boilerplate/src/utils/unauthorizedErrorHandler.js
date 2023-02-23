import Boom from "@hapi/boom";
import { UnauthorizedError } from "express-jwt";

export const unauthorizedErrorHandler = (err, req, res, next) => {
  if (!err) {
    return next();
  }
  if (!(err instanceof UnauthorizedError)) {
    return next(err);
  }
  return next(Boom.unauthorized(err.message));
};
