import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { getCompatibility } from './utils/getCompatibility';
import { Recommendations } from '@dto';
import { isSimilar } from './utils/isSimilar';

@Injectable()
export class RecomService {
  constructor(private readonly userService: UserService) {}

  async getRecommendations(
    thisMany: number,
    userId: string
  ): Promise<Recommendations[] | undefined> {
    const allUsers = await this.userService.getAll();
    const currUser = allUsers.find((user) => user.id === userId);
    const otherUsers = allUsers.filter((user) => user.id !== userId);

    if (!currUser) {
      return undefined; // Handle the case where the current user is not found.
    }

    try {
      const recommendedUsers = otherUsers
        .filter((user) => !user.likedBy.includes(userId))
        .map((user) => ({
          compatibility: getCompatibility(currUser, user),
          user,
        }));
      //.filter((rankedUser) => rankedUser.compatibility > 0);

      return recommendedUsers.slice(0, thisMany);
    } catch (error) {
      console.log(error);
      return otherUsers.map((user) => ({
        compatibility: 100,
        user,
      }));
    }
  }

  async getPines(id: string, email: string) {
    const userA = await this.userService.getOne(id);
    const userB = await this.userService.getOneByEmail(email);
    const samePines: any[] = [];
    for (let i = 0; i < 6; i++) {
      userA?.categorys[i].pins.map((pin) => {
        userB?.categorys[i].pins.forEach((element) => {
          isSimilar(pin.name, element.name) ? samePines.push(pin) : null;
        });
      });
    }
    return samePines;
  }
}
