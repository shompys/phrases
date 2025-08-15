import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePhraseDto {
  @IsString()
  @IsNotEmpty()
  phrase: string;
}
