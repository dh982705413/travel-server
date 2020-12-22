import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { User } from 'db/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'denghao',
    } as StrategyOptions);
  }

  async validate(id: string) {
    return await this.userModel.findById(id).populate('articles');
  }
}
