import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CampDto {
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
  @IsNotEmpty({ message: 'Phone Number is required.' })
  phoneNumber: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: 'Age is required.' })
  age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Address is required.' })
  address: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: 'Student is required.' })
  student: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  school?: string;

  @IsOptional()
  validateSchool() {
    if (this.student === true && (!this.school || this.school.trim() === '')) {
      throw {
        property: 'school',
        constraints: {
          isNotEmpty: 'School is required when student is true.',
        },
      };
    }
    return true;
  }

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Emergency contact is required.' })
  emergencyContact: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: 'Health challenge is required.' })
  healthChallenge: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  challenge?: string;

  @IsOptional()
  validateChallenge() {
    if (
      this.healthChallenge === true &&
      (!this.challenge || this.challenge.trim() === '')
    ) {
      throw {
        property: 'challenge',
        constraints: {
          isNotEmpty: 'Challenge is required when health challenge is true.',
        },
      };
    }
    return true;
  }
}
