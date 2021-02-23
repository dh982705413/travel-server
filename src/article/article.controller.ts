import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { ArticleDto } from './dto/article.dto';

@Controller('article')
@ApiTags('文章')
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService) {}

  @Get(':currentPage/:pageSize')
  @ApiOperation({ summary: '获取文章' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getArticle(
    @Param('currentPage') currentPage: number = 1,
    @Param('pageSize') pageSize: number = 0,
    @Req() req,
  ) {
    return await this.ArticleService.getArticle(
      currentPage,
      pageSize,
      req.user,
    );
  }

  @Post('setArticle')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('preview'))
  @ApiOperation({ summary: '添加文章' })
  async setArticle(@UploadedFile() file, @Body() dto: ArticleDto, @Req() req) {
    return await this.ArticleService.setArticle(file, dto, req.user._id);
  }

  @Delete('remove/:id')
  @ApiOperation({ summary: '删除文章' })
  async reomveArticle(@Param('id') id: string) {
    return await this.ArticleService.removeArticle(id);
  }

  @Patch('edit/:id')
  @ApiOperation({ summary: '编辑文章' })
  @UseInterceptors(FileInterceptor('preview'))
  async editArticle(
    @Param('id') id: string,
    @Body() dto: ArticleDto,
    @UploadedFile() file,
  ) {
    return this.ArticleService.updateArticle(id, dto, file);
  }

  @Get(':id')
  @ApiOperation({ summary: '文章详情' })
  async articleDesc(@Param('id') id: string) {
    return await this.ArticleService.findArticleById(id);
  }
}
