import { Injectable } from '@nestjs/common';

import { TakeoverRegistrationDto } from './dto/takeover-registration.dto';

@Injectable()
export class RegistrationService {
  createTakeover(body: TakeoverRegistrationDto) {
    return 'This action adds a new registration';
  }

  findAll() {
    return `This action returns all registration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }
}
