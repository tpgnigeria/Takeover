import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin, AdminDocument } from './entities/admin.entity';
import { AppResponse } from '../../common/types';
import { ConflictException } from '../../common/exceptions';
import { successResponse } from '../../common/app';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  ) {}

  async create(
    createAdminDto: CreateAdminDto,
  ): Promise<AppResponse<Partial<Admin>>> {
    try {
      const newAdmin = new this.adminModel(createAdminDto);
      const savedAdmin = await newAdmin.save();

      const { _id, fullName, email, role } = savedAdmin.toObject();
      return successResponse(
        'Admin created successfully',
        { _id, fullName, email, role },
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw error;
    }
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
