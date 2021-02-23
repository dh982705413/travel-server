import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BannerService } from './banner.service';
import { BannerDto } from './dto/banner.dto';

@Controller('banner')
@ApiTags('轮播图')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}
  @Get(':currentPage/:pageSize')
  @ApiOperation({ summary: '获取所有轮播图' })
  async getBanner(
    @Param('currentPage') currentPage?: number,
    @Param('pageSize') pageSize?: number,
  ) {
    return await this.bannerService.getBanner(currentPage || 1, pageSize || 10);
  }

  @Post('setBanner')
  @ApiOperation({ summary: '添加轮播图' })
  @UseInterceptors(FileInterceptor('banner'))
  async setBanner(@UploadedFile() file, @Body() dto: BannerDto) {
    console.log(file, dto);
    return await this.bannerService.setBanner(dto, file);
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

  @Patch('enableBanner/:id')
  @ApiOperation({ summary: '启用轮播图' })
  enableBanner(@Param('id') id: string, @Body() enable: { isCheck: boolean }) {
    return this.bannerService.enableBanner(id, enable.isCheck);
  }

  @Get('getEnableBanner')
  @ApiOperation({ summary: '获取已启用轮播图' })
  getEnableBanner() {
    return this.bannerService.enableBanners();
  }

  @Post('setInterval')
  @ApiOperation({ summary: '设置轮播图播放速度' })
  setInterval(@Body() bannerOption: { interval: number }) {
    return this.bannerService.setInterval(bannerOption.interval);
  }
}
