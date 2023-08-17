import { CreateItemDto, ItemDto } from '@dto';
import { faker } from '@faker-js/faker';

export function makeCreateItemDto(): CreateItemDto {
  return {
    name: faker.commerce.product(),
    price: faker.number.int(),
    description: faker.lorem.sentence(),
  };
}

export function makeItemDto(): ItemDto {
  return {
    id: faker.string.uuid(),
    ...makeCreateItemDto(),
  };
}
