import { modelOptions, Prop } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class BannerOption {
  @Prop({ default: 2000 })
  interval?: number;
}
