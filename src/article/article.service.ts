import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Article } from './../../libs/db/src/models/article.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ArticleDto } from './dto/article.dto';
import { User } from 'db/db/models/user.model';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: ReturnModelType<typeof Article>,
    @InjectModel(User)
    private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async getArticle(currentPage: number, pageSize: number) {
    return await this.articleModel
      .find()
      .populate('author')
      .skip(Number(pageSize) * (Number(currentPage) - 1))
      .limit(Number(pageSize));
  }

  async setArticle(file: any, dto: ArticleDto, id: string) {
    const user = await this.userModel.findById(id);
    const preview = await this.setPrewView(file);
    dto.preview = preview as any;
    const article = await this.articleModel.create(dto);
    user.articles.push(article);
    user.save();
    return { message: '添加成功' };
  }

  async removeArticle(id: string) {
    return await this.articleModel.findByIdAndRemove(id);
  }

  async updateArticle(id: string, dto: ArticleDto, file: any) {
    const preview = await this.setPrewView(file);
    dto.preview = preview as string;
    return await this.articleModel.findByIdAndUpdate(id, dto);
  }

  async findArticleById(id: string) {
    return await this.articleModel.findById(id);
  }

  async setPrewView(file) {
    return new Promise((resolve) => {
      const filename = `${Date.now()}-${file.originalname}-'preview'`;
      const writeImage = createWriteStream(
        join(__dirname, '..', 'upload', filename),
      );
      writeImage.write(file.buffer);
      resolve('http://localhost:3000/static/' + filename);
    });
  }
}
