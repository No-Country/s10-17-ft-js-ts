import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'Name',
    example: 'Juan',
  })
  firstName: string;

  @ApiProperty({
    description: 'Lastname',
    example: 'Serrano',
  })
  lastName: string;

  @ApiProperty({
    description: 'Email',
    example: 'wave@example.com ',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'profile description',
    example: 'text of exam',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'array images',
    example: '["urlexample.jpg", "url2example.jpg"]',
  })
  @IsArray()
  images: string[];

  // matches: User[]

  @ApiProperty({
    description: 'birthdate',
    example: '10/12/1998',
  })
  @IsNotEmpty()
  birthdate: Date;

  @ApiProperty()
  likedBy: string[];

  @ApiProperty({
    description: 'user gender',
    example: 'male',
  })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({
    description: 'user gender wants',
    example: 'female',
  })
  wantsGender: string;

  @ApiProperty({
    description: 'user id',
    example: '99a978f9-45f0-402e-a868-fabc422a3e71',
  })
  id: string;

  @ApiProperty({
    description: 'age range',
    example: '[18, 30]',
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  ageRange?: number[];

  @ApiProperty({
    description: 'isVerified',
    example: 'false/true',
  })
  isVerified: boolean
}
