import { Module } from '@nestjs/common';
import { DbModule } from 'db/db';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { SceneryModule } from './scenery/scenery.module';
import { BannerModule } from './banner/banner.module';

@Module({
  imports: [DbModule, AuthModule, ArticleModule, SceneryModule, BannerModule],
})
export class AppModule {}
