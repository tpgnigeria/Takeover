import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TakeoverDto } from './dto/create-takeover.dto';
import { Takeover, TakeoverDocument } from './entities/takeover.entity';
import { CampDto } from './dto/create-camp.dto';
import { Camp, CampDocument } from './entities/camp.entities';
import { Pitch, PitchDocument } from './entities/pitch.registration';
import { PitchDto } from './dto/create-pitch.dto';

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
    return Utils.createEntity<
      TakeoverDocument,
      TakeoverDto,
      keyof TakeoverDocument
    >(
      this.takeoverModel,
      body,
      TAKEOVER_ATTRIBUTES,
      'Takeover registration created successfully',
    );
  }

  async createCamp(body: CampDto): Promise<AppResponse<CampResponse>> {
    try {
      return Utils.createEntity<CampDocument, CampDto, keyof CampDocument>(
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
      return Utils.createEntity<
        PitchDocument,
        PitchDto,
        keyof PitchDocument
      >(
        this.pitchModel,
        body,
        PITCH_ATTRIBUTES,
        'Pitch registration created successfully',
      );
    } catch (error) {
      throw error;
    }
  }
}
