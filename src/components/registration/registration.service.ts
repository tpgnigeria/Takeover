import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TakeoverDto } from './dto/create-takeover.dto';
import { Takeover, TakeoverDocument } from './entities/takeover.entity';
import { successResponse } from '../../common/app';
import { Utils } from '../../common/utils';
import { AppResponse } from '../../common/types';
import { TAKEOVER_ATTRIBUTES } from '../../common/constants';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(Takeover.name)
    private readonly takeoverModel: Model<TakeoverDocument>,
  ) {}

  async createTakeover(
    body: TakeoverDto,
  ): Promise<AppResponse<Partial<Takeover>>> {
    const attendee = new this.takeoverModel(body);
    const savedAttendee = await attendee.save();

    return successResponse(
      'Admin created successfully',
      Utils.pickAttributes(
        savedAttendee.toObject(),
        TAKEOVER_ATTRIBUTES as (keyof Takeover)[],
      ),
      HttpStatus.CREATED,
    );
  }

  findAll() {
    return `This action returns all registration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }
}
