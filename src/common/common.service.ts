import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class CommonService {
  async uploadImage(file: any, suffix: string = 'common') {
    return new Promise((resolve, rejected) => {
      try {
        const filename = `${Date.now()}-${file.originalname}-${suffix}`;
        const writeImage = createWriteStream(
          join(__dirname, '..', 'upload', filename),
        );
        writeImage.write(file.buffer);
        const url = 'http://localhost:3000/static/' + filename;
        resolve(url);
      } catch (e) {
        rejected(e);
      }
    });
  }
}
