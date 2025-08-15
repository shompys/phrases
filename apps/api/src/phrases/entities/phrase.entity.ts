import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Phrase extends Document {
  @Prop({
    required: true,
  })
  phrase: string;
}
export const PhraseSchema = SchemaFactory.createForClass(Phrase);

PhraseSchema.set('toJSON', {
  transform: (doc, ret) => {
    const { _id, __v, ...rest } = ret;
    return {
      ...rest,
      id: ret._id,
    };
  },
});
