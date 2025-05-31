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

export class PitchDto {
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
  @Min(18)
  @Max(40)
  @IsNotEmpty({ message: 'Age is required.' })
  age: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: 'Exists is required.' })
  exists: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cac?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  businessName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  proposedName?: string;

  @IsOptional()
  validateExistsTrue() {
    if (this.exists) {
      const missingFields: string[] = [];

      if (!this.cac || this.cac.trim() === '') missingFields.push('cac');
      if (!this.businessName || this.businessName.trim() === '')
        missingFields.push('businessName');
      if (!this.location || this.location.trim() === '')
        missingFields.push('location');

      if (missingFields.length > 0) {
        throw {
          property: missingFields.join(', '),
          constraints: {
            isNotEmpty: `${missingFields.join(', ')} ${missingFields.length === 1 ? 'is' : 'are'} required when exists is true.`,
          },
        };
      }
    }
    return true;
  }

  @IsOptional()
  validateExistsFalse() {
    if (
      !this.exists &&
      (!this.proposedName || this.proposedName.trim() === '')
    ) {
      throw {
        property: 'proposedName',
        constraints: {
          isNotEmpty: 'Proposed name is required when exists is false.',
        },
      };
    }
    return true;
  }

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'Description is required.' })
  description: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty({ message: 'Exhibits is required.' })
  exhibits: boolean;
}
