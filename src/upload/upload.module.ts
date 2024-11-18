import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadFactory } from './upload.factory';
import { UploadLocalService } from './upload.local.service';
import { UploadController } from './upload.controller';
import { UploadS3Service } from './upload.s3.service';
import { MulterModule } from '@nestjs/platform-express/multer';
import { memoryStorage } from 'multer';

@Module({
  imports:[MulterModule.register({
    dest: '/uploads',
    storage: memoryStorage(),
  })],
  controllers:[UploadController],
  providers: [UploadService, UploadFactory, UploadLocalService, UploadS3Service],
  exports: [UploadService],
})
export class UploadModule {}
