import express from "express";
import { getList, getOptionsById } from "src/controller/products";

const productsRoutes = express.Router();
productsRoutes.get("/getList", getList);
productsRoutes.get("/getOptionsById/:productId", getOptionsById);

export { productsRoutes };
