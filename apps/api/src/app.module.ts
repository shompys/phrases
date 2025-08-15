import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { PhrasesModule } from './phrases/phrases.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', '..', '..', '.env'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? ''),
    PhrasesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
