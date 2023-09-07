export class UserDislike {
  userId: string;
  times: number;

  constructor(userId: string, times: number) {
    this.userId = userId;
    this.times = times;
  }
}
