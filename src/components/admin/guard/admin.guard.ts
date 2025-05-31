import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Admin, AdminDocument } from '../entities/admin.entity';
import { UnauthorizedException } from '../../../common/exceptions';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(
        'Invalid Credentials',
        'No token provided',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email: string;
        role: string;
      }>(token, {
        secret: this.config.get<string>('JWT_SECRET'),
      });

      const admin = await this.adminModel
        .findById(payload.sub)
        .select('_id email role updatedAt');
      if (!admin) {
        throw new UnauthorizedException(
          'Invalid Credentials',
          'You are not authorized to access this resource.',
        );
      }

      request.admin = admin.toObject();
      context.switchToHttp().getRequest().admin = admin.toObject();

      return true;
    } catch (err) {
      throw new UnauthorizedException(
        'Incalid Credentials',
        'Invalid or expired token',
      );
    }
  }

  private getRequest(context: ExecutionContext): any {
    const ctx = context.switchToHttp().getRequest();
    return ctx.handshake !== undefined ? ctx.handshake : ctx;
  }

  private extractTokenFromHeader(request: any): string | null {
    const authHeader = request.headers?.authorization;
    if (!authHeader || typeof authHeader !== 'string') return null;

    const [, token] = authHeader.split(' ');
    return token || null;
  }
}
