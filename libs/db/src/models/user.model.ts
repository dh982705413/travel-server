import { modelOptions, Prop, ArrayProp, Ref } from '@typegoose/typegoose';
import * as bcrypt from 'bcrypt';
import { Article } from './article.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({
    select: false,
    set: (val) => {
      return val && bcrypt.hashSync(val, 10);
    },
    get: (val) => {
      return val;
    },
  })
  password: string;

  @Prop({ default: '' })
  avatar?: string;

  @Prop({ ref: () => Article })
  articles?: Ref<Article>[];
}
