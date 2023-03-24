import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FileResolver {
  constructor(
    private readonly fileService: FileService, //
  ) {}
  @Mutation(() => [String])
  uploadFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
    // graphqlUpload 파일이며 fileUpload 타입으로 사용된다
  ) {
    return this.fileService.upload({ files });
  }
}
