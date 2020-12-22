import { modelOptions, Prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Banner {
  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  time: Date;
}
