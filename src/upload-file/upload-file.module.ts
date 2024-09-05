import { Module } from '@nestjs/common';
import { UploadFileResolver } from './upload-file.resolver';

@Module({
  imports: [],
  providers: [UploadFileResolver],
})
export class UploadFileModule {}
