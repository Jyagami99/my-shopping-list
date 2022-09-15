import { faker } from "@faker-js/faker";
export async function createItem() {
  const item = {
    title: faker.lorem.word(2),
    url: faker.internet.url(),
    description: faker.lorem.paragraph(1),
    amount: 1,
  };
  return item;
}
