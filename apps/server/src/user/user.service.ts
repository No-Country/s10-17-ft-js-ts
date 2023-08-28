import { CreateUserDto, UpdateUserDto, UserDto } from '@dto';
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository, UserRepositoryKey } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './entities/user.entity';
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
      const isRegistered = await this.isRegistered(createUserDto.email);

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

  async isRegistered(email: string): Promise<UserDocument | null> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) return null;

    return user;
  }

  async update(
    id: string,
    body: UpdateUserDto
  ): Promise<UserDto | undefined | null> {
    return this.userRepository.update(id, body);
  }

  async likedBy(
    userId: string,
    idLiked: string
  ): Promise<UserDto | undefined | null> {
    // idUser(token)  idLiked
    // revisar si en los likedBy del usuario que hace la peticion (idUser(token)) esta el usuario a likear (idLiked): si es asi eliminarlo, y agregar el match en ambos perfiles.
    // por las dudas tambien revisar si el usuario ya estaba en los likedBy del idLiked por las dudas y eliminarlo si esta ahi. Si el usuario (idUser(token)) no estaba likeado revisar los likedBy
    // del usuario (idLiked) y por las dudas revisar si ya estaba agregado para evitar duplicados, Si estaba responder el error y si no estaba agregarlo y responder un 20X.

    const userRegistered = await this.userRepository.findOne({ id: userId });
    const userLiked = await this.userRepository.findOne({ id: idLiked });

    // validar que se encontraron los usuarios

    if (!userRegistered || !userLiked) return;

    console.log('userRegistered', userRegistered);
    console.log('userLiked', userLiked);
    let updatedLikesUser;

    if (userRegistered?.likedBy.includes(idLiked)) {
      // Eliminarlo de los likedBy
      const userRegisteredUpdated = await this.userRepository.updateRemoveLike(
        userId,
        idLiked
      );
      console.log('userRegisteredUpdated', userRegisteredUpdated);
      // userRegistered.likedBy = userRegistered.likedBy.filter()
      // crear el match y agregarlo a ambos perfiles.
    }

    if (userLiked?.likedBy.includes(userId)) {
      // si esta incluido es un error, porque no deberia poder likear a alguien que ya esta likeado. dejarlo likeado y revolver el error
      // Error
    } else {
      // agregar al userLiked.likedBy el userId
      updatedLikesUser = await this.userRepository.updateAddLike(
        userId,
        idLiked
      );
    }
    return updatedLikesUser;
  }

  async confirmVerify(id: string) {
    return this.userRepository.verifyUser(id);
  }

  async getOne(id: string): Promise<UserDto | undefined | null> {
    return this.userRepository.findById(id);
  }

  // async deleteOne(id: string): Promise<UserDto | undefined | null>{
  //   return  this.userRepository.deleteOne(id)
  // }

  // async uploadFile(file: Express.Multer.File): Promise<string> {
  //   try {
  //     const result = await new Promise<string>((resolve, reject) => {
  //       cloudinary.uploader
  //         .upload_stream(
  //           {
  //             resource_type: 'auto',
  //           },
  //           (error: any, result: any) => {
  //             if (error) {
  //               reject(error);
  //             } else {
  //               resolve(result.secure_url);
  //             }
  //           },
  //         )
  //         .end(file.buffer);
  //     });
  //     console.log(result);
  //     return result;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}
