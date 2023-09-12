import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { GenderEnum } from '../enums/gender.enum';
import { Avatars } from '../enums/avatar.enum';
import { LookingForEnum } from '../enums/lookinFor.enum';


export class UpdateUserDto {

  @ApiProperty({
    description: 'The first name of the user',
    example: 'Juan',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Serrano',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'A brief description or bio of the user',
    example: 'text of exam',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: '"wantsGender" property describes the preferred gender of individuals a user is interested in meeting',
    example: 'text of exam',
  })
  @IsString()
  @IsEnum(GenderEnum, { each: true })
  @IsOptional()
  wantsGender?: string;

  @ApiProperty({
    description: 'The preferred age range of individuals the user is interested in',
    example: '[18, 28]',
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsOptional()
  @IsNumber({}, { each: true })
  ageRange?: number[];

  @ApiProperty({
    description: 'The users date of birth. Only YYYY-MM-DD format',
    example: '2022-11-08',
  })
  @IsOptional()
  @IsDateString()
  birthdate?: Date;


  @ApiProperty({
    description: "The gender identity of the user (Enum).",
    example: 'male',
    enum: GenderEnum
  })
  @IsOptional()
  @IsEnum(GenderEnum, { each: true })
  @IsString()
  gender?: string;

  @ApiProperty({
    description: 'lookingFor',
    example: '',
  })
  @IsOptional()
  @IsString()
  @IsEnum(LookingForEnum, { each: true })
  lookingFor?: string


  @ApiProperty({
    description: 'avatar',
    example: 'link of avatar ENUM',
  })
  @IsOptional()
  @IsString()
  @IsEnum(Avatars, { each: true })
  avatar?: string

  @ApiProperty({
    description: 'latitude',
    example: '40.7128',
  })
  @IsNumber()
  @IsOptional()
  latitude?: number

  @ApiProperty({
    description: 'longitude',
    example: '-74.0060',
  })
  @IsNumber()
  @IsOptional()
  longitude?: number

  @ApiProperty({
    description: 'range in KM ',
    example: 'default: 200',
  })
  @IsNumber()
  @IsOptional()
  zone?: number

}
