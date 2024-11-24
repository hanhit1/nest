import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/user.entity';
import {UserModule} from './users/user.module'
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './logger/logger.middleware';
import { FileEntity } from './upload/file.entity';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './products/product.module';
import { productEntity } from './products/product.entity';
import { SocketModule } from './socket/socket.module';
import { TasksService } from './tasks/tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { OrdersModule } from './modules/orders/orders.module';
import { DatabaseService } from './modules/database/database.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.${process.env.NODE_ENV}.env`, `.local.env`], 
    }),
    
    DatabaseModule.forRoot([User,FileEntity,productEntity], {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }),
    UserModule,
    UploadModule,
    ProductModule,
    SocketModule,
    ScheduleModule.forRoot(),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, TasksService, DatabaseService], 
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method : RequestMethod.ALL}); 
  }
}
