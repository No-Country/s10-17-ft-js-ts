export class UserPin {
  name: string;
  imgUrl: string;
  subCategories: string[];

  constructor(name: string, imgUrl: string, subCategories: string[]) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.subCategories = subCategories;
  }
}
