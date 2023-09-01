import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../user/user.dto';

export class AuthResponseDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  user: UserDto;
}
