import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateUserDto{

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
    description: 'The users date of birth. Only YYYY/MM/DD format',
    example: 'YYYY/MM/DD',
  })
  @IsOptional()
  @IsDateString()
  birthdate?: Date;


  @ApiProperty({
      description:"The gender identity of the user.",
    example: 'male',
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({
      description:" The user's current address",
    example: 'Curazao',
  })
  @IsOptional()
  @IsString()
  address?: string;


}
