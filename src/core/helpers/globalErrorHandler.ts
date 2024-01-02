import HTTP_STATUS_CODES from 'http-status-codes';
import { CustomError } from '.';
import { NextFunction, Request, Response } from 'express';

export const getResponse = (type: string, message: string, status?: number) => ({
  status,
  error: new CustomError(status, `${type} ${message}`),
});

export const evalueError = (err: Error) => {
  const instance = err.constructor.name;
  const type = err.name;
  const { message, code, status } = <CustomError & { status: number }>err;
  const customCode = code || status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

  const errorHandlers = {
    CastError: () => getResponse(type, message, HTTP_STATUS_CODES.BAD_REQUEST),
    ValidationError: () => getResponse(type, message, HTTP_STATUS_CODES.BAD_REQUEST),
    UnauthorizedError: () => getResponse(type, message, HTTP_STATUS_CODES.UNAUTHORIZED),
    default: () => getResponse(type, message, customCode),
  };

  const handler = errorHandlers[instance] || errorHandlers[type] || errorHandlers.default;
  return handler();
};

function globalErrorHandler(err: Error, _req: Request, reply: Response, _next: NextFunction) {
  const { status, error } = evalueError(err);
  return reply.status(status).json({ errors: [error.message] });
}

export default globalErrorHandler;
