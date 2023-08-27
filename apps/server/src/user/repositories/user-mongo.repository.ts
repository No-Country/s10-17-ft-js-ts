import { CreateUserDto, UserDto, UpdateUserDto } from '@dto';
import { FilterQuery, Model } from 'mongoose';
import { User } from '../entities/user.entity';
import { UserRepository } from '../user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { InjectMapper } from '@timonmasberg/automapper-nestjs';
import { Mapper } from '@automapper/core';
import { v4 as uuid } from 'uuid';

export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectMapper() private readonly mapper: Mapper
  ) {}
  //                                            Promise<UserDto>
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userModel.create({
      ...createUserDto,
      id: uuid(),
    });

    return this.mapper.map(newUser, 'UserDocument', 'UserDto');
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserDto | undefined | null> {
    return await this.userModel.findOneAndUpdate({ id }, updateUserDto, {
      new: true,
    });
  }

  async findById(id: string): Promise<UserDto | null> {
    return await this.findOne({ id });
  }

  async findByEmail(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    if (!user) return false;
    return true;
  }

  async findOne(filter: FilterQuery<User>): Promise<UserDto | null> {
    const user = await this.userModel.findOne(filter);
    if (!user) return null;
    return this.mapper.map(user, 'UserDocument', 'UserDto');
  }

  async findMany(filter: FilterQuery<User>): Promise<UserDto[]> {
    const items = await this.userModel.find(filter);
    return this.mapper.mapArray(items, 'UserDocument', 'UserDto');
  }

  async updateAddLike(
    userId: string,
    idLiked: string
  ): Promise<UserDto | null | undefined> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { id: idLiked },
      { $addToSet: { likedBy: userId } },
      { new: true }
    );
    return updatedUser;
  }

  async updateRemoveLike(
    userId: string,
    idLiked: string
  ): Promise<UserDto | null | undefined> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { id: idLiked },
      { $pull: { likedBy: userId } },
      { new: true }
    );
    return updatedUser;
  }

  // async deleteOne(id: string): Promise<UserDto | undefined | null>{
  // return await this.userModel.deleteOne({id})
  // }

  async verifyUser(id: string): Promise<boolean> {
    const userUpdated = await this.userModel.findOneAndUpdate(
      { id },
      { isVerified: true },
      { new: true }
    );
    if (!userUpdated) return false;
    return true;
  }
}
