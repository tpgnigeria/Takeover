import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TakeoverDto } from './dto/create-takeover.dto';
import { Takeover, TakeoverDocument } from './entities/takeover.entity';
import { CampDto } from './dto/create-camp.dto';
import { Camp, CampDocument } from './entities/camp.entities';
import { Pitch, PitchDocument } from './entities/pitch.registration';
import { PitchDto } from './dto/create-pitch.dto';

import { AppUtils, DBUtils } from '../../common/utils';
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
    return DBUtils.createEntity(
      this.takeoverModel,
      body,
      TAKEOVER_ATTRIBUTES,
      'Takeover registration created successfully',
    );
  }

  async createCamp(body: CampDto): Promise<AppResponse<CampResponse>> {
    try {
      return DBUtils.createEntity(
        this.campModel,
        body,
        CAMP_ATTRIBUTES,
        'Camp registration created successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  async createPitch(body: PitchDto): Promise<AppResponse<PitchResponse>> {
    try {
      return DBUtils.createEntity(
        this.pitchModel,
        body,
        PITCH_ATTRIBUTES,
        'Pitch registration created successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  async findRegistrations(): Promise<AppResponse<TakeoverResponse[]>> {
    return DBUtils.findEntities(
      this.takeoverModel,
      TAKEOVER_ATTRIBUTES,
      'Registrations retrieved successfully',
    );
  }

  async findRegistration(
    id: string,
  ): Promise<AppResponse<TakeoverResponse | null>> {
    const filter = { _id: id };

    return DBUtils.findEntity(
      this.takeoverModel,
      filter,
      TAKEOVER_ATTRIBUTES,
      'Registration retrieved successfully',
      'Registration Not Found',
    );
  }

  async findCampRegistrations(): Promise<AppResponse<CampResponse[]>> {
    return DBUtils.findEntities(
      this.campModel,
      CAMP_ATTRIBUTES,
      'Camp registrations retrieved successfully',
    );
  }

  async findCampRegistration(
    id: string,
  ): Promise<AppResponse<CampResponse | null>> {
    const filter = { _id: id };

    return DBUtils.findEntity(
      this.campModel,
      filter,
      CAMP_ATTRIBUTES,
      'Camp registration retrieved successfully',
      'Camp Registration Not Found',
    );
  }
  async findPitchRegistrations(): Promise<AppResponse<PitchResponse[]>> {
    return DBUtils.findEntities(
      this.pitchModel,
      PITCH_ATTRIBUTES,
      'Pitch registrations retrieved successfully',
    );
  }

  async findPitchRegistration(
    id: string,
  ): Promise<AppResponse<PitchResponse | null>> {
    const filter = { _id: id };

    return DBUtils.findEntity(
      this.pitchModel,
      filter,
      PITCH_ATTRIBUTES,
      'Pitch registration retrieved successfully',
      'Pitch Registration Not Found',
    );
  }
}
