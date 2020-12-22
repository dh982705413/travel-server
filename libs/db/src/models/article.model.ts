import { Prop, Ref } from '@typegoose/typegoose';
import { User } from './user.model';

export class Article {
  @Prop()
  title: string;

  @Prop()
  preview: string;

  @Prop()
  content: string;

  @Prop()
  vote: number;

  @Prop({ ref: () => User })
  author?: Ref<User>;
}
