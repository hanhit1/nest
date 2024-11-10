// src/database/providers/options.provider.ts

import { Injectable } from '@nestjs/common';

export interface DatabaseOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

@Injectable()
export class OptionsProvider {
  get(): DatabaseOptions {
    return {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'hanhpro',
      password: process.env.DB_PASSWORD || '152004',
      database: process.env.DB_NAME || 'test',
    };
  }
}
