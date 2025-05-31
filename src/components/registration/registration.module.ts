import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { Takeover, TakeoverSchema } from './entities/takeover.entity';
import { Pitch, PitchSchema } from './entities/pitch.registration';
import { Camp, CampSchema } from './entities/camp.entities';

@Module({
  controllers: [RegistrationController],
  providers: [RegistrationService],
  imports: [
    MongooseModule.forFeature([
      { name: Takeover.name, schema: TakeoverSchema },
      { name: Pitch.name, schema: PitchSchema },
      { name: Camp.name, schema: CampSchema },
    ]),
  ],
})
export class RegistrationModule {}
