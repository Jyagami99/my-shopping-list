import supertest from "supertest";
import app from "../src/app";
import { prisma } from "../src/database";
import { createItem } from "./factories/itemsFactory";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "items"`;
});

describe("Testa POST /items ", () => {
  it("Deve retornar 201, se cadastrado um item no formato correto", async () => {
    const item = await createItem();
    const result = await supertest(app).post("/items").send(item);
    const status = result.status;

    expect(status).toEqual(201);
  });
  it("Deve retornar 409, ao tentar cadastrar um item que exista", async () => {
    const item = await createItem();

    await supertest(app).post("/items").send(item);

    const result = await supertest(app).post("/items").send(item);
    const status = result.status;

    expect(status).toEqual(409);
  });
});

describe("Testa GET /items ", () => {
  it("Deve retornar status 200 e o body no formato de Array", async () => {
    const item = await createItem();

    await supertest(app).post("/items").send(item);

    const result = await supertest(app).get("/items");
    const status = result.status;

    expect(status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});

describe("Testa GET /items/:id ", () => {
  it("Deve retornar status 200 e um objeto igual a o item cadastrado", async () => {
    const item = await createItem();

    const createdItem = await supertest(app).post("/items").send(item);

    const { body: newItem } = createdItem;

    console.log({ newItem });

    const result = await supertest(app).get(`/items/${newItem.id}`).send();

    const status = result.status;

    expect(status).toBe(200);
    expect(newItem).toMatchObject(result.body);
  });
  it("Deve retornar status 404 caso não exista um item com esse id", async () => {
    const result = await supertest(app).get("/items/1");
    const status = result.status;

    expect(status).toBe(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
