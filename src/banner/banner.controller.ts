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
import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';

@Controller('banner')
@ApiTags('轮播图')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}
  @Get()
  @ApiOperation({ summary: '获取所有轮播图' })
  async getBanner() {
    return await this.bannerService.getBanner();
  }

  @Post('setBanner')
  @ApiOperation({ summary: '添加轮播图' })
  async setBanner(@Body() dto: BannerDto) {
    return await this.bannerService.setBanner(dto);
  }

  @Delete('removeBanner/:id')
  @ApiOperation({ summary: '删除轮播图' })
  async removeBanner(@Param('id') id: string) {
    return await this.bannerService.removeBanner(id);
  }

  @Patch('updateBanner/:id')
  @ApiOperation({ summary: '更新轮播图' })
  async updateBanner(@Param('id') id: string, @Body() dto: BannerDto) {
    return await this.bannerService.uploadBanner(id, dto);
  }
}
