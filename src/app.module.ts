import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/user.entity';
import {UserModule} from './users/user.module'
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './logger/logger.middleware';
import { FileEntity } from './upload/file.entity';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    DatabaseModule.forRoot([User,FileEntity], {
      host: 'localhost',
      port: 3306,
      username: 'hanhpro',
      password: '152004',
      database: 'test',
    }),
    UserModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method : RequestMethod.ALL}); 
  }
}
