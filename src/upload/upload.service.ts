import { Injectable } from '@nestjs/common';
import { UploadFactory } from './upload.factory';
import { FileEntity } from './file.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UploadService { 
    constructor(
        private readonly uploadFactory: UploadFactory,
        @InjectRepository(FileEntity)  private readonly fileRepository: Repository<FileEntity>,
    ) { }
    async handleUpload(file: Express.Multer.File): Promise<any> {
        try {
            const uploadService = this.uploadFactory.getUploadService();
            const uploadResult = await uploadService.upload(file); 
            const newFile = this.fileRepository.create({
                fileName: file.originalname,
                fileUrl: uploadResult.url,
            });
            try {
                await this.fileRepository.save(newFile);
            } catch (error)
            {
                console.log(error)
            }
            return { success: true, ...uploadResult };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
}