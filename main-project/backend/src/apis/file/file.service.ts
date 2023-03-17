import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);

    const storage = new Storage({
      projectId: 'sociallogin-380212',
      keyFilename: 'sociallogin-380212-0abab84de713.json',
    }).bucket('gongcha-storage');

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream())
            .on('finish', () => resolve(`gongcha-storage/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    );
    return results; // //
  }
}
