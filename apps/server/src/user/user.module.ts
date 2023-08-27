import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserRepositoryKey } from './user.repository';
import { UserMongoRepository } from './repositories/user-mongo.repository';
import { UserProfile } from './user.profile';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserProfile,
    {
      provide: UserRepositoryKey,
      useClass: UserMongoRepository,
    },
  ],
})
export class UserModule {}
