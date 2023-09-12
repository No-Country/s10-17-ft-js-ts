import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import {
  AutomapperProfile,
  InjectMapper,
} from '@timonmasberg/automapper-nestjs';
import { UserDto } from '@dto';
import { UserDocument } from './entities/user.entity';
import { PojosMetadataMap } from '@automapper/pojos';
import { Schema } from 'mongoose';

export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
    this.createMetadata();
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        'UserDocument',
        'UserDto',
        forMember<UserDocument, UserDto>(
          (destination) => destination.id,
          mapFrom((source) => source._id)
        )
      );
    };
  }

  createMetadata(): void {
    PojosMetadataMap.create<UserDocument>('UserDocument', {
      _id: Schema.Types.ObjectId,
      firstName: String,
      lastName: String,
      description: String,
      email: String,
      birthdate: Date,
      gender: String,
      ageRange: Array,
      likedBy: Array,
      isVerified: Boolean,
      dislikedBy: Array,
      matches: Array,
      categorys: Array,
      isProfileConfigured: Boolean,
    });

    PojosMetadataMap.create<UserDto>('UserDto', {
      firstName: String,
      lastName: String,
      description: String,
      email: String,
      birthdate: Date,
      gender: String,
      ageRange: Array,
      likedBy: Array,
      isVerified: Boolean,
      dislikedBy: Array,
      matches: Array,
      categorys: Array,
      isProfileConfigured: Boolean,
    });
  }
}
