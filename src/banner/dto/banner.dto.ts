import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BannerDto {
  @IsNotEmpty({ message: '标题不能为空' })
  @ApiPropertyOptional({ description: '轮播图标题' })
  title: string;

  @IsNotEmpty({ message: '日期不能为空' })
  @ApiPropertyOptional({ description: '轮播图日期' })
  time: Date;

  @IsNotEmpty({ message: '图片不能为空' })
  @ApiPropertyOptional({ description: '轮播图图片' })
  image: string;
}
