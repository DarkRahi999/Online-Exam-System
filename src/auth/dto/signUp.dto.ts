import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsEnum, IsDateString } from 'class-validator';
import { Gender, UserRole } from '../../utils/enums';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'The last name of the user' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+1234567890', description: 'The phone number of the user' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: 'male', description: 'The gender of the user', enum: Gender })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiPropertyOptional({ example: '1990-01-01', description: 'The date of birth of the user' })
  @IsDateString()
  @IsOptional()
  dob?: string;

  @ApiPropertyOptional({ example: 'Islam', description: 'The religion of the user' })
  @IsString()
  @IsOptional()
  religion?: string;

  @ApiPropertyOptional({ example: '123 Main St', description: 'The local address of the user' })
  @IsString()
  @IsOptional()
  localAddress?: string;

  @ApiPropertyOptional({ example: 'Bangladeshi', description: 'The nationality of the user' })
  @IsString()
  @IsOptional()
  nationality?: string;

  @ApiPropertyOptional({ example: 'B+', description: 'The blood group of the user' })
  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @ApiPropertyOptional({ example: 'STU-001', description: 'The student ID of the user' })
  @IsString()
  @IsOptional()
  studentId?: string;

  // Added fields referenced in seed file
  @ApiPropertyOptional({ description: 'Whether the user accepts terms and conditions' })
  @IsOptional()
  acceptTerms?: boolean;
}

// DTO for user response without sensitive data
export class UserRes {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  firstName: string;

  @ApiPropertyOptional({ example: 'Doe', description: 'The last name of the user' })
  lastName?: string;

  @ApiPropertyOptional({ example: 'male', description: 'The gender of the user' })
  gender?: string;

  @ApiPropertyOptional({ example: '1990-01-01', description: 'The date of birth of the user' })
  dob?: Date;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  email: string;

  @ApiProperty({ example: '+1234567890', description: 'The phone number of the user' })
  phone: string;

  @ApiPropertyOptional({ example: 'Islam', description: 'The religion of the user' })
  religion?: string;

  @ApiPropertyOptional({ example: '123 Main St', description: 'The local address of the user' })
  localAddress?: string;

  @ApiPropertyOptional({ example: 'Bangladeshi', description: 'The nationality of the user' })
  nationality?: string;

  @ApiPropertyOptional({ example: 'B+', description: 'The blood group of the user' })
  bloodGroup?: string;

  @ApiPropertyOptional({ example: 'STU-001', description: 'The student ID of the user' })
  studentId?: string;
}