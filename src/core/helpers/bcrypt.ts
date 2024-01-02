import bcrypt from 'bcrypt';

import { CustomError } from './CustomErros';

export function validatePswd(pswd: string, hash: string) {
  const result = compare(pswd, hash);
  const failMessage = 'Unable to process: Credentials could not be verified.';
  if (!result) throw new CustomError(400, failMessage);
  return result;
}

export function compare(pswd: string, hash: string) {
  return bcrypt.compareSync(pswd, hash);
}

export function encrypt(pswd: string) {
  const SALT_ROUNDS = 10;
  return bcrypt.hashSync(pswd, SALT_ROUNDS);
}
