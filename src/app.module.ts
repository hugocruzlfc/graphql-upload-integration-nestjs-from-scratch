import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { UploadFileModule } from './upload-file/upload-file.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: {
        path: join(process.cwd(), 'src/schema.gql'),
      },
      playground: true,
      buildSchemaOptions: {
        dateScalarMode: 'isoDate',
      },
    }),
    UploadFileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
