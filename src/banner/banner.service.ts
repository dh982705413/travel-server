import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Banner, BannerOption } from './../../libs/db/src/models/banner.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BannerDto } from './dto/banner.dto';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner)
    private readonly bannerModel: ReturnModelType<typeof Banner>,
    @InjectModel(BannerOption)
    private readonly bannerOptModel: ReturnModelType<typeof BannerOption>,
    private readonly CommonService: CommonService,
  ) {}

  async getBanner(currentPage: number, pageSize: number) {
    const banners = await this.bannerModel
      .find()
      .skip(Number(pageSize) * (Number(currentPage) - 1))
      .limit(Number(pageSize));
    const total = await this.bannerModel.count();
    const interval = await this.getBannnerInterval();
    return {
      banners,
      total,
      interval,
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

  async enableBanner(id: string, isCheck: boolean) {
    const { length } = await this.enableBanners();
    if (isCheck && length >= 8) {
      throw new HttpException('超出上限', HttpStatus.FORBIDDEN);
    } else {
      const banner = await this.bannerModel.findByIdAndUpdate(id, {
        isCheck,
      });
      return banner;
    }
  }

  async enableBanners() {
    const banners = await this.bannerModel.find();
    const enableBanners = banners.filter((v) => v.isCheck);
    const interval = await this.getBannnerInterval();
    return {
      enableBanners,
      length: enableBanners.length,
      interval,
      isFull: enableBanners.length >= 8,
    };
  }

  async setInterval(interval: number) {
    const option = await this.bannerOptModel.findOne();
    if (!option) {
      await this.bannerOptModel.create({ interval });
    } else {
      option.interval = interval;
      option.save();
    }
    return this.bannerOptModel.findOne();
  }

  async getBannnerInterval() {
    const bannerOpt = await this.bannerOptModel.findOne();
    return bannerOpt.interval;
  }
}
