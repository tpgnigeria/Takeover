import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsIn,
  IsNumber,
} from 'class-validator';
import { Days, InviteSource } from '../types';
import { ApiProperty } from '@nestjs/swagger';

export class TakeoverDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required.' })
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Full name is required.' })
  fullName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required.' })
  phoneNumber: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'Age is required.' })
  age: number;

  @ApiProperty()
  @IsEnum(['male', 'female'])
  @IsNotEmpty({ message: 'Gender is required.' })
  gender: 'male' | 'female';

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty({ message: 'Day(s) attending is required.' })
  @IsIn(['thursday', 'friday', 'saturday', 'sunday'], { each: true })
  daysAttending: Days[];

  @ApiProperty()
  @IsEnum(['social_media', 'friend', 'church', 'advert', 'online', 'other'])
  @IsNotEmpty({ message: 'Invite Source is required.' })
  invite: InviteSource;

  @ApiProperty()
  @IsOptional()
  @IsString()
  inviteOther?: string;

  @IsOptional()
  validateInviteOther() {
    if (
      this.invite === 'other' &&
      (!this.inviteOther || this.inviteOther.trim() === '')
    ) {
      throw {
        property: 'inviteOther',
        constraints: {
          isNotEmpty: 'inviteOther is required when invite is "other".',
        },
      };
    }
    return true;
  }

  @ApiProperty()
  @IsOptional()
  @IsString()
  info?: string;
}
