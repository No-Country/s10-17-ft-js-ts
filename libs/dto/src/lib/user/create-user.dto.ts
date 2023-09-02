import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Name',
    example: 'Juan',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firstName?: string;

  @ApiProperty({
    description: 'Lastname',
    example: 'Serrano',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  lastName?: string;

  @ApiProperty({
    description: 'Email',
    example: 'wave@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'password',
    example: 'Example123!',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'The password must contain at least one lowercase letter, a capital letter, a number and a special character',
    },
  )
  password: string;

  @ApiProperty({
    description: 'birthdate',
    example: '10/12/1998',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  birthdate?: Date;

  @ApiProperty({})
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({
    example: 'male',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  gender?: string;

  @ApiProperty({
    example: 'Curazao',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;
}
