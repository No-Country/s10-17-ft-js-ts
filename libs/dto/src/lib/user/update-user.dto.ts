import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateUserDto{

  @ApiProperty({
    description: 'profile description',
    example: 'text of exam',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'profile description',
    example: 'text of exam',
  })
  @IsString()
  @IsOptional()
  wantsGender?: string;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsOptional()
  @IsNumber({}, { each: true })
  ageRange?: number[];

  // servicio
  // @IsOptional()
  // isVerified?: boolean;

}
