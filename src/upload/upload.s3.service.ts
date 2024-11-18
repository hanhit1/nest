import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class UploadS3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION, // Vùng AWS (vd: us-east-1)
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
  }

  async upload(file: Express.Multer.File): Promise<{ url: string }> {
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME, 
      Key: file.originalname,             
      Body: file.buffer,                   
      ContentType: file.mimetype,          
    };

    await this.s3Client.send(new PutObjectCommand(uploadParams));

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalname}`;
    return { url: fileUrl };
  }
}
