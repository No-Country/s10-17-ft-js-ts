import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { PojosMetadataMap } from '@automapper/pojos';
import { UserDto } from '@dto';
import {
  AutomapperProfile,
  InjectMapper,
} from '@timonmasberg/automapper-nestjs';
import { UserDocument } from './entities/user.entity';

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
          mapFrom((source) => source._id.toHexString())
        )
      );
    };
  }

  createMetadata(): void {
    PojosMetadataMap.create<UserDocument>('UserDocument', {
      _id: String,
      firstName: String,
      lastName: String,
      description: String,
      images: Array,
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
      latitude: Number,
      longitude: Number,
      zone: Number,
      avatar: String,
    });

    PojosMetadataMap.create<UserDto>('UserDto', {
      firstName: String,
      lastName: String,
      description: String,
      images: Array,
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
      latitude: Number,
      longitude: Number,
      zone: Number,
      avatar: String,
    });
  }
}
