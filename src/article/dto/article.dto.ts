import { ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'db/db/models/user.model';
import { Ref } from '@typegoose/typegoose';

export class ArticleDto {
  @ApiPropertyOptional({ description: '文章作者' })
  author?: Ref<User>;

  @ApiPropertyOptional({ description: '文章标题' })
  title: string;

  @ApiPropertyOptional({ description: '文章预览图片' })
  preview: string;

  @ApiPropertyOptional({ description: '文章内容' })
  content: string;

  @ApiPropertyOptional({ description: '文章投票数' })
  vote: number;
}
