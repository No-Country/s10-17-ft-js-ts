import { CreateUserDto, UserDto, UpdateUserDto } from '@dto';
import { FilterQuery } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { UserDislike } from './entities/user-dislike.entity';
import { UserCategory } from './entities/user-categorys.entity';

export interface UserRepository {
  create(createUserDto: CreateUserDto): Promise<UserDto>;
  update(
    id: string,
    UpdateUserDto: UpdateUserDto
  ): Promise<UserDto | undefined | null>;
  findById(id: string): Promise<UserDto | null>;
  findOne(id: string): Promise<UserDto | null>;
  findByEmail(email: string): Promise<UserDocument | null>;
  findMany(filter: FilterQuery<User>): Promise<UserDto[]>;
  updateAddLike(
    userId: string,
    idLiked: string
  ): Promise<UserDto | undefined | null>;
  updateRemoveLike(
    userId: string,
    idLiked: string
  ): Promise<UserDto | undefined | null>;
  // deleteOne(id:string): Promise<UserDto | undefined | null>;
  verifyUser(id: string): Promise<UserDto | null>;
  updateAddMatch(
    userId: string,
    idMatched: string
  ): Promise<UserDto | undefined | null>;
  updateAddDislike(
    idDisliked: string,
    dislike: UserDislike
  ): Promise<UserDto | undefined | null>;
  updateDislikeTimes(
    idDisliked: string,
    userId: string
  ): Promise<UserDto | undefined | null>;
  existingCategory(
    userId: string,
    name: string
  ): Promise<UserDto | undefined | null>;
  updateAddCategory(
    userId: string,
    category: UserCategory
  ): Promise<UserDto | undefined | null>;
  updateCategory(
    userId: string,
    category: UserCategory
  ): Promise<UserDto | undefined | null>;
  confirmProfileConfigured(id: string): Promise<UserDto | null>;
  updateAddImage(
    userId: string,
    URL: string
  ): Promise<UserDto | null | undefined>;
}

export const UserRepositoryKey = Symbol('UserRepository');
