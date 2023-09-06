import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { getCompatibility } from './utils/getCompatibility';

@Injectable()
export class RecomService {
  constructor(private readonly userService: UserService) {}

  async getRecommendations(
    thisMany: number,
    userId: string
  ): Promise<any[] | undefined> {
    const allUsers = await this.userService.getAll();
    const currUser = allUsers.find((user) => user.id === userId);
    const otherUsers = allUsers.filter((user) => user.id !== userId);

    if (!currUser) {
      return undefined; // Handle the case where the current user is not found.
    }

    const recommendedUsers = otherUsers
      .filter((user) => !user.likedBy.includes(userId))
      .map((user) => ({
        compatibility: getCompatibility(currUser, user),
        user,
      }))
      .filter((rankedUser) => rankedUser.compatibility > 0);

    return recommendedUsers;
  }
}
