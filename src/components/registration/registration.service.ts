import { Injectable } from '@nestjs/common';

import { TakeoverDto } from './dto/create-takeover.dto';

@Injectable()
export class RegistrationService {
  createTakeover(body: TakeoverDto) {
    return 'This action adds a new registration';
  }

  findAll() {
    return `This action returns all registration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }
}
