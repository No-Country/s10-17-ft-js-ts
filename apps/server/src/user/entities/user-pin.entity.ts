export class UserPin {
  name: string;
  imgUrl: string;
  categoryName: string;
  subCategories: string[];

  constructor(
    name: string,
    imgUrl: string,
    subCategories: string[],
    categoryName: string
  ) {
    this.name = name;
    this.imgUrl = imgUrl;
    this.subCategories = subCategories;
    this.categoryName = categoryName;
  }
}
