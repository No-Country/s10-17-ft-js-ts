import { IsArray, IsString, IsNumber, ArrayMinSize, ArrayMaxSize, IsEnum, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryEnum } from '../enums/category.enum';


class PinDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  imgUrl: string

  @IsNotEmpty()
  @IsArray()
  subCategories: string[]

}

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(CategoryEnum, { each: true })
  name: CategoryEnum;

  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PinDto)
  pins: PinDto[];
}

export class CategoryArrayDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  items: CategoryDto[];
}

