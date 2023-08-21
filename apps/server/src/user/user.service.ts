import { CreateUserDto, UserDto } from '@dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    return {};
  }
}
