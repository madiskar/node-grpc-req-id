import { GenericServiceCall, NextFunction, GenericCallHandler } from '@mdkr/grpc-chain';
import * as crypto from 'crypto';

export default function (length = 24): GenericCallHandler {
  return (call: GenericServiceCall, next: NextFunction): void => {
    call.ctx.locals.reqId = crypto
      .randomBytes(Math.ceil((length * 3) / 4))
      .toString('base64')
      .slice(0, length)
      .replace(/\+/g, '0')
      .replace(/\//g, '0');
    next();
  };
}
