import * as dotenv from 'dotenv';
import path from 'path';

const envConfigProps = { path: '' };
/* eslint-disable */
switch (process.env.NODE_ENV) {
  case 'test':
    envConfigProps.path = path.join(process.cwd(), '.env');
    break;
  default:
    envConfigProps.path = path.join(process.cwd(), '.env');
}
/* eslint-disable */

dotenv.config(envConfigProps);
