import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { Article } from './../../../libs/db/src/models/article.model';
import { Ref } from '@typegoose/typegoose';

export class UserDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @Length(2, 12, { message: '用户名长度为2到12位' })
  @ApiPropertyOptional({ description: '用户名', default: 'denghao' })
  username: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @Length(6, 12, { message: '密码长度在6到12位' })
  @ApiPropertyOptional({ description: '密码', default: '123456' })
  password: string;

  avatar?: string;

  articles?: Ref<Article>[];
}
