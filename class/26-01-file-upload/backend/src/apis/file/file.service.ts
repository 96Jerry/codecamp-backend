import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async upload({ files }) {
    // const waitedFiles = await Promise.all(files);
    // console.log(waitedFiles);
    const myfile = files[0];

    const storage = new Storage({
      projectId: '',
      keyFilename: '',
    })
      .bucket('폴더명')
      .file(myfile.filename);
    // 구글 스토리지에 파일 업로드

    // await 는 promise 에만 쓸 수 있다.
    await new Promise((resolve, reject) => {
      myfile
        .createReadStream()
        .pipe(storage.createWriteStream())
        .on('finish', () => resolve('철수'))
        .on('error', () => reject('영희'));
    });
    return ['url'];
  }
}
