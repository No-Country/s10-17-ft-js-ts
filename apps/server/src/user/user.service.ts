import { CreateUserDto, UpdateUserDto, UserDto } from '@dto';
import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository, UserRepositoryKey } from './user.repository';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './entities/user.entity';
import { UserDislike } from './entities/user-dislike.entity';
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
      throw new BadRequestException(error);
    }
  }

  async getAll() {
    try {
      return this.userRepository.findMany({});
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async isRegistered(email: string): Promise<UserDocument | null> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) return null;
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async update(
    id: string,
    body: UpdateUserDto
  ): Promise<UserDto | undefined | null> {
    try {
      return this.userRepository.update(id, body);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async likedBy(
    userId: string,
    idLiked: string
  ): Promise<UserDto | undefined | null> {
    try {
      // idUser(token)  idLiked
      // revisar si en los likedBy del usuario que hace la peticion (idUser(token)) esta el usuario a likear (idLiked): si es asi eliminarlo, y agregar el match en ambos perfiles.
      // por las dudas tambien revisar si el usuario ya estaba en los likedBy del idLiked y eliminarlo si esta ahi. Si el usuario (idUser(token)) no estaba likeado revisar los likedBy
      // del usuario (idLiked) y por las dudas revisar si ya estaba agregado para evitar duplicados, Si estaba responder el error y si no estaba agregarlo y responder un 20X.

      if (userId === idLiked)
        throw new BadRequestException(
          `Cannot dislike yourself. User IDs must be different.`
        );

      const userRegistered = await this.userRepository.findById(userId);
      const userLiked = await this.userRepository.findById(idLiked);

      // validar que se encontraron los usuarios
      if (!userRegistered || !userLiked)
        throw new NotFoundException(`User not found`);

      if (userLiked?.likedBy.includes(userId)) {
        // si esta incluido es un error, porque no deberia poder likear a alguien que ya esta likeado. dejarlo likeado y devolver el error
        // Error
        throw new BadRequestException(
          `User with ID ${userId} already liked user with ID ${idLiked}`
        );
      }

      let updatedLikesUser;

      if (userRegistered?.likedBy.includes(idLiked)) {
        // esto es un match.

        // Eliminarlo de los likedBy
        const userRegisteredUpdated =
          await this.userRepository.updateRemoveLike(userId, idLiked);
        console.log('userRegisteredUpdated', userRegisteredUpdated);
        // agregar el _id del usuario a la propiedad match del otro. x2

        const addMatch = await this.userRepository.updateAddMatch(
          userId,
          idLiked
        );
        const addMatch2 = await this.userRepository.updateAddMatch(
          idLiked,
          userId
        );

        // lanzar notificacion de match
      } else {
        updatedLikesUser = await this.userRepository.updateAddLike(
          userId,
          idLiked
        );
      }
      // agregar al userLiked.likedBy el userId

      return updatedLikesUser;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async disLikeBy(
    userId: string,
    idDisliked: string
  ): Promise<UserDto | undefined | null> {
    try {
      // verifico que los ids no sean iguales.
      if (userId === idDisliked)
        throw new BadRequestException(
          `Cannot like yourself. User IDs must be different`
        );

      // busco los usuarios
      const userRegistered = await this.userRepository.findById(userId);
      const userDisliked = await this.userRepository.findById(idDisliked);

      // verifico que existan los usuario y que fueron encontrados
      if (!userRegistered || !userDisliked)
        throw new NotFoundException(`User not found`);

      // veo si ya le habia dado dislike.
      const alreadyDisliked = userDisliked.dislikedBy.some(
        (dislike) => dislike.userId === userId
      );

      let updateDisliked;
      if (alreadyDisliked) {
        // si ya le habia dado, sumar 1 al times del dislike.
        // llamar al repositorio y que sume uno
        updateDisliked = await this.userRepository.updateDislikeTimes(
          idDisliked,
          userId
        );
      } else {
        // si no le habia dado, crear dislike con times en 1.
        const dislike = new UserDislike(userId, 1);
        updateDisliked = await this.userRepository.updateAddDislike(
          idDisliked,
          dislike
        );
      }

      return updateDisliked;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async confirmVerify(id: string) {
    try {
      return this.userRepository.verifyUser(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async getOne(id: string): Promise<UserDto | undefined | null> {
    try {
      return this.userRepository.findById(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async prueba(
    userId: string,
    idLiked: string
  ): Promise<UserDto | undefined | null> {
    try {
      console.log(userId, idLiked);
      const userRegisteredUpdated = await this.userRepository.updateRemoveLike(
        userId,
        idLiked
      );
      console.log(userRegisteredUpdated);
      return userRegisteredUpdated;
    } catch (error) {
      console.log(error);
    }
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
