import { Injectable } from '@nestjs/common';
import { phrasesSeed } from './data/phrases.seed';
import { PhrasesService } from 'src/phrases/phrases.service';

@Injectable()
export class SeedService {
  constructor(private readonly phraseService: PhrasesService) {}
  async generateSeed() {
    await this.phraseService.deleteAll();

    return this.phraseService.createMany(phrasesSeed);
  }
}
