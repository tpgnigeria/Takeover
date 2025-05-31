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

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post()
  createTakeover(@Body() createTakeoverDto: TakeoverDto) {
    return this.registrationService.createTakeover(createTakeoverDto);
  }

  @Get()
  findAll() {
    return this.registrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registrationService.findOne(+id);
  }
}
