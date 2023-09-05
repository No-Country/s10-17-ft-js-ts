import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { Type } from 'class-transformer';

export class Genres {
    @ApiProperty()
    @IsString()
    belongsTo: string;

    @ApiProperty()
    @IsArray()
    @Type(() => String)
    genres: string[];
}