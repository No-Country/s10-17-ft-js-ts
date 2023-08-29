import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({
    example: "gustavo@wave.com"
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: "12345678aA*"
  })
  @IsString()
  password: string;
}
