import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';

@Controller('article')
@ApiTags('文章')
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService) {}

  @Get(':currentPage/:pageSize')
  @ApiOperation({ summary: '获取文章' })
  async getArticle(
    @Param('currentPage') currentPage: number = 1,
    @Param('pageSize') pageSize: number = 0,
  ) {
    return await this.ArticleService.getArticle(currentPage, pageSize);
  }

  @Post('setArticle')
  @ApiOperation({ summary: '添加文章' })
  async setArticle(@Body() dto: ArticleDto) {
    return await this.ArticleService.setArticle(dto);
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: '删除文章' })
  async reomveArticle(@Param('id') id: string) {
    return await this.ArticleService.removeArticle(id);
  }

  @Patch('edit/:id')
  @ApiOperation({ summary: '编辑文章' })
  async editArticle(@Param('id') id: string, @Body() dto: ArticleDto) {
    return this.ArticleService.updateArticle(id, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: '文章详情' })
  async articleDesc(@Param('id') id: string) {
    return await this.ArticleService.findArticleById(id);
  }
}
