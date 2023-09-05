import { Mapper } from '@automapper/core';
import { CreateUserDto, UpdateUserDto, UserDto } from '@dto';
import { InjectModel } from '@nestjs/mongoose';
import { InjectMapper } from '@timonmasberg/automapper-nestjs';
import { FilterQuery, Model } from 'mongoose';
import { UserDislike } from '../entities/user-dislike.entity';
import { User, UserDocument } from '../entities/user.entity';
import { UserRepository } from '../user.repository';

// enum ArrayUpdateMethod {
//   Pull = 'pull',
//   AddToSet = 'addToSet',
//   Push = 'push',
//   Pop = 'pop',
//   PullAll = 'pullAll',
// }

export class UserMongoRepository implements UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectMapper() private readonly mapper: Mapper // private readonly arrayUpdateMethods = { //   [ArrayUpdateMethod.Pull]: (propertyName: ArrayUpdateMethod, value: string) => ({ $pull: { [propertyName]: value } }), //   [ArrayUpdateMethod.AddToSet]: (propertyName: ArrayUpdateMethod, value: string) => ({ $addToSet: { [propertyName]: value } }), // }
  ) {}

  //                                            Promise<UserDto>
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userModel.create({
      ...createUserDto,
      passwordHash: createUserDto.password,
    });

    return this.mapper.map(newUser, 'UserDocument', 'UserDto');
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserDto | undefined | null> {
    return await this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, {
      new: true,
    });
  }

  async findById(id: string): Promise<UserDto | null> {
    return await this.userModel.findById(id);
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ email });
    return user;
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
      { _id: idLiked },
      { $addToSet: { likedBy: userId } },
      { new: true }
    );
    return this.mapper.map(updatedUser, 'UserDocument', 'UserDto');
  }

  async updateRemoveLike(
    userId: string,
    idLiked: string
  ): Promise<UserDto | null | undefined> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { likedBy: idLiked } },
      { new: true }
    );
    console.log(updatedUser);
    return this.mapper.map(updatedUser, 'UserDocument', 'UserDto');
  }

  async updateAddMatch(
    userId: string,
    idMatched: string
  ): Promise<UserDto | null | undefined> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: idMatched },
      { $addToSet: { matches: userId } },
      { new: true }
    );
    return this.mapper.map(updatedUser, 'UserDocument', 'UserDto');
  }

  async updateArrayProperti(
    userId: string,
    idLiked: string,
    method: string,
    property: string
  ): Promise<UserDto | null | undefined> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { id: idLiked },
      { $pull: { likedBy: userId } },
      { new: true }
    );
    return this.mapper.map(updatedUser, 'UserDocument', 'UserDto');
  }

  // async deleteOne(id: string): Promise<UserDto | undefined | null>{
  // return await this.userModel.deleteOne({id})
  // }

  async verifyUser(email: string): Promise<UserDto | null> {
    const userUpdated = await this.userModel.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!userUpdated) return null;

    return this.mapper.map(userUpdated, 'UserDocument', 'UserDto');
  }

  async updateAddDislike(
    idDisliked: string,
    dislike: UserDislike
  ): Promise<UserDto | undefined | null> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: idDisliked },
      { $addToSet: { dislikedBy: dislike } },
      { new: true }
    );
    return this.mapper.map(updatedUser, 'UserDocument', 'UserDto');
  }

  async updateDislikeTimes(
    idDisliked: string,
    userId: string
  ): Promise<UserDto | undefined | null> {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: idDisliked, 'dislikedBy.userId': userId },
      { $inc: { 'dislikedBy.$.times': 1 } }, // Incrementa el campo 'times' del elemento coincidente
      { new: true }
    );

    return this.mapper.map(updatedUser, 'UserDocument', 'UserDto');
  }
}
