import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: 'Name',
    example: 'Juan',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Lastname',
    example: 'Serrano',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

   @ApiProperty({
    description: 'Email',
    example: 'wave@example.com ',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;


  @ApiProperty({
    description: 'password',
    example: 'Example123!',
  })
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
  @IsString()
  @IsNotEmpty()
  birthdate: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
