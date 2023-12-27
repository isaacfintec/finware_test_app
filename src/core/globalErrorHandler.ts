import HTTP_STATUS_CODES from 'http-status-codes';
import { CustomError } from './helpers';
import { Request, Response } from 'express';

const getResponse = (type: string, message: string, status?: number) => ({
  status,
  error: new CustomError(type, message),
});

const evalueError = (err: Error) => {
  const instance = err.constructor.name;
  const type = err.name;
  const { message, code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR } = <CustomError>err;

  const errorHandlers = {
    CastError: () => getResponse(type, message, HTTP_STATUS_CODES.BAD_REQUEST),
    ValidationError: () => getResponse(type, message, HTTP_STATUS_CODES.BAD_REQUEST),
    default: () => getResponse(type, message, code),
  };

  const handler = errorHandlers[instance] || errorHandlers.default;
  return handler();
};

const globalErrorHandler = (err: Error, _req: Request, res: Response) => {
  const { status, error } = evalueError(err);
  return res.status(status).json({ errors: [error] });
};

export default globalErrorHandler;
