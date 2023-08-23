import { Mapper, createMap } from '@automapper/core';
import {
  AutomapperProfile,
  InjectMapper,
} from '@timonmasberg/automapper-nestjs';
import { UserDto } from '@dto';
import { UserDocument } from './entities/user.entity';
import { PojosMetadataMap } from '@automapper/pojos';

export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
    this.createMetadata();
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, 'UserDocument', 'UserDto');
    };
  }

  createMetadata(): void {
    PojosMetadataMap.create<UserDocument>('UserDocument', {
      id: String,
      firstName: String,
      lastName: String,
      description: String,
      email: String,
      birthdate: Date,
      gender: String,
    });

    PojosMetadataMap.create<UserDto>('UserDto', {
      id: String,
      firstName: String,
      lastName: String,
      description: String,
      email: String,
      birthdate: Date,
      gender: String,
    });
  }
}
