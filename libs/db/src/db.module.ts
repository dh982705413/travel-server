import { Global, Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Article } from './models/article.model';
import { Banner, BannerOption } from './models/banner.model';
import { User } from './models/user.model';

const models = TypegooseModule.forFeature([
  User,
  Banner,
  Article,
  BannerOption,
]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/test', {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    models,
  ],
  exports: [models],
})
export class DbModule {}
