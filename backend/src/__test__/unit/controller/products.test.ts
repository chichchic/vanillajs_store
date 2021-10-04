import httpMocks from "node-mocks-http";

import * as productController from "src/controller/products";

import list from "src/data/list.json";
import { extractOptions } from "src/utility/extract";

const productId = 1;

let req: any, res: any, next: any;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product Controller getList Test", () => {
  it("should have getList function", () => {
    expect(typeof productController.getList).toBe("function");
  });
  it("should return 200 response code", async () => {
    await productController.getList(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy;
  });
  it("should return json body in response", async () => {
    await productController.getList(req, res);
    expect(res._getJSONData()).toStrictEqual(list);
  });
});

describe("Product Controller getOptionsById Test", () => {
  it("should have getList function", () => {
    expect(typeof productController.getOptionsById).toBe("function");
  });
  it("should return 200 response code", async () => {
    req.params.productId = productId;
    await productController.getOptionsById(req, res);
    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy;
  });
  it("should return json body in response", async () => {
    req.params.productId = productId;
    await productController.getOptionsById(req, res);
    expect(res._getJSONData()).toStrictEqual(extractOptions(productId));
  });
  it("should return 404 when product doesnt exist", async () => {
    req.params.productId = -1;
    await productController.getOptionsById(req, res);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy;
  });
});
