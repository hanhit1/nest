import { Injectable } from '@nestjs/common';
import { UploadLocalService } from './upload.local.service';
import { UploadS3Service } from './upload.s3.service';
import { UploadConfig } from './upload.config';
@Injectable()
export class UploadFactory {
    constructor(
        private readonly uploadLocalService: UploadLocalService,
        private readonly uploadS3Service: UploadS3Service
    ) { }
    getUploadService() {
        switch (UploadConfig.uploadMethod) {
            case 'local':
                return this.uploadLocalService;
            case 's3':
                return this.uploadS3Service;
            default:
            throw new Error('Unsupported upload method');  
        }
    }
}