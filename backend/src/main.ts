import express from "express";
import cors from "cors";
import path from "path";

import { productsRoutes } from "src/routes";

const PORT = 3000;

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/static", express.static(__dirname + "/public"));

app.use("/api/product", productsRoutes);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));

export default app;
