import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin, AdminSchema } from './entities/admin.entity';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy],
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.register({})
  ],
})
export class AdminModule {}
