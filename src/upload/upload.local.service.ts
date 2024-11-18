import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadLocalService {
  async upload(file: Express.Multer.File): Promise<{ url: string }> {
      const uploadPath = path.join(process.cwd(), 'uploads', file.originalname);
    console.log(file);
    console.log(uploadPath);
    fs.writeFileSync(uploadPath, file.buffer);
    return { url: `/uploads/${file.originalname}` };
  }
}