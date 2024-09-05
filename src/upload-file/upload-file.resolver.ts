import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class UploadFileResolver {
  @Query(() => String)
  health_check(): string {
    return 'Resolver is working! 🚀';
  }

  @Mutation(() => Boolean)
  async upload_file(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<boolean> {
    try {
      console.log(file);
      const { createReadStream } = file;

      const stream = createReadStream();

      // Do something with the stream or process the file

      console.log(stream);
      return true;
    } catch (err) {
      return false;
    }
  }
}
