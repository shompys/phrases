import { Module } from '@nestjs/common';
import { PhrasesService } from './phrases.service';
import { PhrasesController } from './phrases.controller';
import { Phrase, PhraseSchema } from './entities/phrase.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PhrasesController],
  providers: [PhrasesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Phrase.name,
        schema: PhraseSchema,
      },
    ]),
  ],
  exports: [PhrasesService],
})
export class PhrasesModule {}
