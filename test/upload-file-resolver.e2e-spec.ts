import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createWriteStream, unlinkSync } from 'fs';
import * as path from 'path';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return success on file upload', async () => {
    // Path to the file to upload
    const filePath = path.join(__dirname, 'test-file.jpg');
    // Create a test file
    createWriteStream(filePath).write('Test file content');

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .set('x-apollo-operation-name', 'upload_file')
      .set('Content-Type', 'multipart/form-data')
      .field(
        'operations',
        JSON.stringify({
          query: `mutation ($file: Upload!) { upload_file(file: $file) } `,
          variables: {
            file: null,
          },
        }),
      )
      .field('map', JSON.stringify({ '0': ['variables.file'] }))
      .field('0', filePath);

    expect(response.status).toBe(200);
    expect(response.body.data.upload_file).toBe(true);

    // Clean up the test file
    unlinkSync(filePath);
  });
});
