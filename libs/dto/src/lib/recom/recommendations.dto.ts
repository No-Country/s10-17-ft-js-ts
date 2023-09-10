import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";
import { Type } from 'class-transformer';
import { UserDto } from "../user/user.dto";

export class Recommendations {
    @ApiProperty()
    @IsNumber()
    compatibility: number;

    @ApiProperty()
    user: UserDto;
}