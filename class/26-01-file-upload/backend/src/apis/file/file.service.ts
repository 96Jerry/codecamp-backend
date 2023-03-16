import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);
    console.log(waitedFiles); // [file, file]

    const storage = new Storage({
      projectId: '',
      keyFilename: '',
    }).bucket('폴더명');

    // 구글 스토리지에 파일 업로드

    // await 는 promise 에만 쓸 수 있다.

    const results = await Promise.all(
      waitedFiles.map((el) => {
        return new Promise((resolve, reject) => {
          el.createReadStream()
            .pipe(storage.file(el.filename).createWriteStream()) // file 명은 두개가 다르기 때문에 이 부분에서 추가 해준다.
            .on('finish', () => resolve(`폴더명/${el.filename}`))
            .on('error', () => reject());
        });
      }),
    ); // await Promise.all([Promise, Promise])
    // const results = ['폴더명/파일명', '폴더명/파일명']

    return results;
  }
}
