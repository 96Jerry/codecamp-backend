import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { getToday } from 'src/commons/library/utils';
import { v4 as uuidv4 } from 'uuid';

const { STORAGE_PROJECT_ID, STORAGE_KEY_FILENAME, STORAGE_BUCKET } =
  process.env;

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);

    const storage = new Storage({
      projectId: STORAGE_PROJECT_ID,
      keyFilename: STORAGE_KEY_FILENAME,
    }).bucket(STORAGE_BUCKET);

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          const fname = `${getToday()}/${uuidv4()}/origin/${el.filename}`;
          el.createReadStream()
            .pipe(storage.file(fname).createWriteStream())
            .on('finish', () => resolve(`${STORAGE_BUCKET}/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    );
    return results; // //
  }
}
