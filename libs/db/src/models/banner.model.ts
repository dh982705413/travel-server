import { modelOptions, Prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Banner {
  @Prop()
  title?: string;

  @Prop()
  image: string;

  @Prop()
  time?: Date;

  @Prop({ default: false })
  isCheck?: boolean;
}

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class BannerOption {
  @Prop({ default: 2000 })
  interval?: number;
}
