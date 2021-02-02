import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDto } from 'src/auth/dto/user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from './../../libs/db/src/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonService } from './../common/common.service';

@ApiTags('认证')
@Controller('auth')
export class AuthController {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    private readonly jwtServer: JwtService,
    private readonly CommonService: CommonService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async register(@Body() user: UserDto) {
    return await this.userModel.create(user);
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() user: UserDto, @Req() req) {
    return {
      token: this.jwtServer.sign(String(req.user._id)),
    };
  }

  @Get('userInfo')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '用户信息' })
  @ApiBearerAuth()
  getUserInfo(@Req() req) {
    return req.user;
  }

  @Post('setAvatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard('jwt'))
  async setAvatar(@UploadedFile() file, @Req() req) {
    const user = await this.userModel.findById(req.user._id);
    if (file) {
      this.CommonService.uploadImage(file, 'avatar');
    }
    user.save();
  }
}
