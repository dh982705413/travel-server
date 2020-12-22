import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Banner } from './../../libs/db/src/models/banner.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BannerDto } from './dto/banner.dto';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner)
    private readonly bannerModel: ReturnModelType<typeof Banner>,
  ) {}

  async getBanner() {
    return await this.bannerModel.find();
  }

  async setBanner(dto: BannerDto) {
    const banner = this.bannerModel.create(dto);
    return banner;
  }

  async removeBanner(id: string) {
    return this.bannerModel.findByIdAndRemove(id);
  }

  async uploadBanner(id: string, dto: BannerDto) {
    return this.bannerModel.findByIdAndUpdate(id, dto);
  }
}
