import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CategoryEnum } from '../enums/category.enum';
import { ApiProperty } from '@nestjs/swagger';

// agregar el nombre de las catergorias dentro de los pines. lo tengo que cambiar aca, en la clase, y en el servicio.
class PinDto {
  @ApiProperty({
    description: 'The name of the pin',
    example: 'Pin Name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The URL of the image associated with the pin',
    example: 'https://example.com/pin-image.jpg',
  })
  @IsNotEmpty()
  @IsString()
  imgUrl: string

  @ApiProperty({
    description: 'The name of the category. Should be one of the values from the CategoryEnum',
    example: 'Category Name',
    enum: [CategoryEnum],
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(CategoryEnum, { each: true })
  categoryName: CategoryEnum;

  @ApiProperty({
    description: 'An array of subcategories associated with the pin',
    example: ['Subcategory 1', 'Subcategory 2'],
    type: [String],
  })
  @IsNotEmpty()
  @IsArray()
  subCategories: string[]

}

export class CategoryDto {
  @ApiProperty({
    description: 'The name of the category. Should be one of the values from the CategoryEnum',
    example: 'Category Name',
    enum: [CategoryEnum],
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(CategoryEnum, { each: true })
  name: CategoryEnum;

  @ApiProperty({
    description: 'The rate or score associated with the category',
    example: 4.5,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @ApiProperty({
    description: 'An array of pins associated with the category',
    type: [PinDto],
  })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PinDto)
  pins: PinDto[];
}
