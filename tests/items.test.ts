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
    // const result = await supertest(app).post("/items").send({
    //   title: item.title,
    //   url: item.url,
    //   description: item.description,
    //   amount: item.amount,
    // });
    const result = await supertest(app).post("/items").send(item);
    const status = result.status;

    expect(status).toEqual(201);
  });
  it("Deve retornar 409, ao tentar cadastrar um item que exista", async () => {
    const item = await createItem();

    await supertest(app).post("/items").send(item);

    // const result = await supertest(app).post("/items").send({
    //   title: item.title,
    //   url: item.url,
    //   description: item.description,
    //   amount: item.amount,
    // });
    const result = await supertest(app).post("/items").send(item);
    const status = result.status;

    expect(status).toEqual(409);
  });
});

describe("Testa GET /items ", () => {
  it.todo("Deve retornar status 200 e o body no formato de Array");
});

describe("Testa GET /items/:id ", () => {
  it.todo("Deve retornar status 200 e um objeto igual a o item cadastrado");
  it.todo("Deve retornar status 404 caso não exista um item com esse id");
});
