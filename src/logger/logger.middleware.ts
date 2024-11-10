import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.user = {
      id: 2,
      name: 'min',
      age: 21,
      gender: 'nu'
    };
    console.log(`Request... ${req.method} ${req.originalUrl}`);
    next();
  }
}
