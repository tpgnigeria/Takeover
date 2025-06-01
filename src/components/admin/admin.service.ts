import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { verify } from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './entities/admin.entity';
import { SignInDto } from './dto/sign-in.dto';

import { AppResponse } from '../../common/types';
import { successResponse } from '../../common/app';
import { AdminRoles, TokenResponse } from './types';
import { Utils } from '../../common/utils';
import { ADMIN_ATTRIBUTES } from '../../common/constants';
import { AdminResponse } from '../registration/types';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  private async signToken(
    id: string,
    email: string,
    role: AdminRoles,
  ): Promise<AppResponse<TokenResponse>> {
    const payload = {
      sub: id,
      email,
      role,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });

    return successResponse('Signed In', { email, role, accessToken: token });
  }

  async create(
    createAdminDto: CreateAdminDto,
  ): Promise<AppResponse<AdminResponse>> {
    try {
      const newAdmin = new this.adminModel(createAdminDto);
      const savedAdmin = await newAdmin.save();

      return successResponse(
        'Admin created successfully',
        Utils.pickAttributes(
          savedAdmin.toObject(),
          ADMIN_ATTRIBUTES as (keyof Admin)[]
        ),
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw error;
    }
  }

  async signIn(body: SignInDto): Promise<AppResponse<TokenResponse>> {
    const admin = await this.adminModel
      .findOne({ email: body.email })
      .select('+password');
    if (!admin) {
      throw new UnauthorizedException(
        'Invalid Credentials',
        'The email you entered does not match any account',
      );
    }

    const passwordValid = await verify(admin.password, body.password);
    if (!passwordValid) {
      throw new UnauthorizedException(
        'Invalid credentials',
        'The password you entered is incorrect',
      );
    }

    return await this.signToken(admin._id.toString(), admin.email, admin.role);
  }

  async findAll() {
    return `This action returns all admin`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  async remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
