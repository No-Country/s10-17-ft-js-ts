import { CreateUserDto, UserDto } from '@dto';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository, UserRepositoryKey } from './user.repository';
import * as bcrypt from 'bcrypt';
// import { appConfig } from '../app/app.config';
// import { ConfigType } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositoryKey)
    private readonly userRepository: UserRepository // @Inject(appConfig.KEY) // private readonly config: ConfigType<typeof appConfig>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto | undefined> {
    try {
      // hashear la pass
      // createUserDto.password = await bcrypt.hash(
      //   createUserDto.password,
      //   this.config.hash.salt
      // );

      createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
      // createUserDto.password = await bcrypt.hash(createUserDto.password, process.env.HASH_SALT);

      // validar si el email ya esta usado
      const isRegistered: boolean = await this.isRegistered(
        createUserDto.email
      );

      if (isRegistered) {
        throw new BadRequestException('Email already exists');
      }

      // crearlo y retornarlo.
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    return this.userRepository.findMany({});
  }

  async isRegistered(email: string): Promise<boolean> {
    return this.userRepository.findByEmail(email);
  }
}
