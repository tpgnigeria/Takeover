import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TakeoverDto } from './dto/create-takeover.dto';
import { Takeover, TakeoverDocument } from './entities/takeover.entity';
import { CampDto } from './dto/create-camp.dto';
import { Camp, CampDocument } from './entities/camp.entities';
import { Pitch, PitchDocument } from './entities/pitch.registration';
import { PitchDto } from './dto/create-pitch.dto';

import { successResponse } from '../../common/app';
import { Utils } from '../../common/utils';
import { AppResponse } from '../../common/types';
import {
  CAMP_ATTRIBUTES,
  PITCH_ATTRIBUTES,
  TAKEOVER_ATTRIBUTES,
} from '../../common/constants';
import { CampResponse, PitchResponse, TakeoverResponse } from './types';

@Injectable()
export class RegistrationService {
  constructor(
    @InjectModel(Takeover.name)
    private readonly takeoverModel: Model<TakeoverDocument>,
    @InjectModel(Camp.name)
    private readonly campModel: Model<CampDocument>,
    @InjectModel(Pitch.name)
    private readonly pitchModel: Model<PitchDocument>,
  ) {}

  async createTakeover(
    body: TakeoverDto,
  ): Promise<AppResponse<TakeoverResponse>> {
    try {
      const attendee = new this.takeoverModel(body);
      const savedAttendee = await attendee.save();

      return successResponse(
        'Takeover registration created successfully',
        Utils.pickAttributes(
          savedAttendee.toObject(),
          TAKEOVER_ATTRIBUTES as (keyof Takeover)[],
        ),
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw error;
    }
  }

  async createCamp(body: CampDto): Promise<AppResponse<CampResponse>> {
    try {
      const camp = new this.campModel(body);
      const savedCamp = await camp.save();

      return successResponse(
        'Camp registration created successfully',
        Utils.pickAttributes(
          savedCamp.toObject(),
          CAMP_ATTRIBUTES as (keyof Camp)[],
        ),
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw error;
    }
  }

  async createPitch(body: PitchDto): Promise<AppResponse<PitchResponse>> {
    try {
      const pitch = new this.pitchModel(body);
      const savedPitch = await pitch.save();

      return successResponse(
        'Pitch registration created successfully',
        Utils.pickAttributes(
          savedPitch.toObject(),
          PITCH_ATTRIBUTES as (keyof Pitch)[],
        ),
        HttpStatus.CREATED,
      );
    } catch (error) {
      throw error;
    }
  }
}
