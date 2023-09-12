import { UserPin } from './user-pin.entity';

export class UserCategory {
  name: string;
  rate: number;
  pins: UserPin[];
  constructor(name: string, rate: number, pins: UserPin[]) {
    this.name = name;
    this.rate = rate;
    this.pins = pins;
  }
}
