import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDto } from '@dto';
import { getCompatibility } from './utils/getCompatibility';

@Injectable()
export class RecomService {
    constructor(private readonly userService: UserService) {}

    async getRecommendations(thisMany: number, userId: string): Promise<any | undefined> {
        const allUsers = await this.userService.getAll();
        const currUser = allUsers.filter((user) => user.id == userId);
        const otherUsers = allUsers.filter((user) => user.id != userId);

        const rankedUsers = [];

        for(let i = 0; i < otherUsers.length; i++) {
          rankedUsers.push({
            compatibility: 100,//getCompatibility(currUser, otherUsers[i]),
            user: otherUsers[i]
          })
        }

        const recommendedUsers = rankedUsers.filter((rankedUser) => rankedUser.compatibility > 0);

        return recommendedUsers;
      }
}