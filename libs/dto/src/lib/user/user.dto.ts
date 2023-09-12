import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CategoryDto } from './update-categorys-user.dto';

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

  @ApiProperty({
    description: 'birthdate (valid Format ISO)',
    example: '1998-09-10',
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

  @ApiProperty({
    description: 'isProfileConfigured',
    example: 'false/true',
  })
  isProfileConfigured: boolean;

  @ApiProperty({
    description: 'user id',
    example: '609c1f8d8b937f120c551234',
  })
  id: string

  @ApiProperty({
    description: 'Users who disliked this user',
    example: '[{ "userId": "user1", "times": 2 }, { "userId": "user2", "times": 1 }]',
  })
  dislikedBy: any[];

  @ApiProperty({
    description: 'An array containing the IDs of users with whom the current user has matched',
    example: '["609c1f8d8b937f120c551234","609c1f8d8b937f120c551235","609c1f8d8b937f120c551236"]',
  })
  matches: string[]

  @ApiProperty({
    description: 'Categorys',
    example: '[ { "name": "videogames", "rate": 2 , pins:[{},{},{}] } ]',
  })
  categorys: CategoryDto[]

  @ApiProperty({
    description: 'lookingFor',
    example: 'Enum: ',
  })
  lookingFor: string

  @ApiProperty({
    description: 'User Avatar',
    example: 'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119146/Frame_427319187_c6ldi6.png',
  })
  avatar: string


  @ApiProperty({
    description: 'range in KM ',
    example: 'default: 200',
  })
  zone: number

  @ApiProperty({
    description: 'latitude',
    example: '40.7128',
  })
  latitude?: number

  @ApiProperty({
    description: 'longitude',
    example: '-74.0060',
  })
  longitude?: number
}
