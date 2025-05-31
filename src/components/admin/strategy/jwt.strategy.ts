import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Model } from 'mongoose';

import { Admin, AdminDocument } from '../entities/admin.entity';
import { AdminRoles } from '../types';
import { UnauthorizedException } from '../../../common/exceptions';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET')!,
    });
  }

  async validate(payload: { sub: string; email: string; role: AdminRoles }) {
    const admin = await this.adminModel.findById(payload.sub);
    if (!admin) {
      throw new UnauthorizedException(
        'Invalid Credentials',
        'You are not authorized to access this resource.',
      );
    }

    return {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      updatedAt: admin.updatedAt,
    };
  }
}
