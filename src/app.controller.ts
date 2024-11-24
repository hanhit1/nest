import { AppService } from './app.service';
import { Controller, Get, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get()
  welcome(@Res() res: Response) {
    const indexPath = join(__dirname, '..', '..', 'public', 'index.html');
    return res.sendFile(indexPath);
  }
}