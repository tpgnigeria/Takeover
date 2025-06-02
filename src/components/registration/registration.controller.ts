import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { RegistrationService } from './registration.service';
import { TakeoverDto } from './dto/create-takeover.dto';
import { CampDto } from './dto/create-camp.dto';
import { PitchDto } from './dto/create-pitch.dto';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('takeover')
  createTakeover(@Body() createTakeoverDto: TakeoverDto) {
    return this.registrationService.createTakeover(createTakeoverDto);
  }

  @Post('camp')
  createCamp(@Body() createCampDto: CampDto) {
    return this.registrationService.createCamp(createCampDto);
  }

  @Post('pitch')
  createPitch(@Body() createPitchDto: PitchDto) {
    return this.registrationService.createPitch(createPitchDto);
  }
}
