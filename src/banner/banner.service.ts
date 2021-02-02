import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Banner } from './../../libs/db/src/models/banner.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BannerDto } from './dto/banner.dto';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner)
    private readonly bannerModel: ReturnModelType<typeof Banner>,
    private readonly CommonService: CommonService,
  ) {}

  async getBanner(currentPage: number, pageSize: number) {
    const banners = await this.bannerModel
      .find()
      .skip(Number(pageSize) * (Number(currentPage) - 1))
      .limit(Number(pageSize));
    const total = await this.bannerModel.count();
    return {
      banners,
      total,
    };
  }

  async setBanner(dto: BannerDto, file: any) {
    const url = (await this.CommonService.uploadImage(
      file,
      'banner',
    )) as string;
    dto.image = url;
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
