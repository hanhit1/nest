import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import i18n from '../../../i18nextConfig';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const lang = request.headers['accept-language'] || 'en';
    const messageKey = 'errors.' + exception.message;
    i18n.changeLanguage(lang);
    const localizedMessage = i18n.t(messageKey) || exception.message;
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: localizedMessage,
    });
  }
}
