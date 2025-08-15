import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePhraseDto } from './dto/create-phrase.dto';
import { UpdatePhraseDto } from './dto/update-phrase.dto';
import { Model } from 'mongoose';
import { Phrase } from './entities/phrase.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Pagination } from './interfaces';

@Injectable()
export class PhrasesService {
  constructor(
    @InjectModel(Phrase.name)
    private readonly phraseModel: Model<Phrase>,
  ) {}
  async create(createPhraseDto: CreatePhraseDto): Promise<any> {
    createPhraseDto.phrase = createPhraseDto.phrase.toLocaleLowerCase();

    const phrase = await this.phraseModel.create(createPhraseDto);
    return phrase;
  }

  async findByPage(
    pageNumber: number,
    limit: number,
  ): Promise<Pagination<Phrase[]>> {
    if (limit <= 0) {
      throw new BadRequestException('limit must be greater than 0');
    }

    const skip = (pageNumber - 1) * limit;

    const phrases = await this.phraseModel.find().skip(skip).limit(limit);
    const totalCount = await this.phraseModel.countDocuments();

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: phrases,
      itemsCount: phrases.length,
      currentPage: pageNumber,
      totalItems: totalCount,
      totalPages,
      prevPage: pageNumber > 1 ? pageNumber - 1 : null,
      nextPage: pageNumber < totalPages ? pageNumber + 1 : null,
    };
  }

  async findOne(id: string) {
    const phrase = await this.phraseModel.findById(id);

    return phrase;
  }

  async update(id: string, updatePhraseDto: UpdatePhraseDto) {
    const phraseUpdated = await this.phraseModel.findByIdAndUpdate(
      id,
      updatePhraseDto,
      { new: true },
    );
    if (!phraseUpdated) {
      throw new NotFoundException('Phrase not found');
    }

    return phraseUpdated;
  }

  async remove(id: string) {
    const phraseDeleted = await this.phraseModel.findByIdAndDelete(id);

    if (!phraseDeleted) {
      throw new NotFoundException('Phrase not found');
    }

    return phraseDeleted;
  }
}
