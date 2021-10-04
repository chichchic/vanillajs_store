import request from "supertest";
import app from "src/main";

import list from "src/data/list.json";

import { extractOptions } from "src/utility/extract";

let firstProduct: product;
it("GET /api/product/getList", async () => {
  const res = await request(app).get("/api/product/getList");
  expect(res.statusCode).toBe(200);
  expect(res.body).toStrictEqual(list);
  firstProduct = res.body[0];
});

it("GET /api/product/getOptionsById/:productId", async () => {
  const res = await request(app).get(
    `/api/product/getOptionsById/${firstProduct.id}`
  );
  expect(res.statusCode).toBe(200);
  expect(res.body).toStrictEqual(extractOptions(firstProduct.id));
});

it("GET /api/product/getOptionsById/:productId", async () => {
  const res = await request(app).get(`/api/product/getOptionsById/a`);
  expect(res.statusCode).toBe(404);
});
