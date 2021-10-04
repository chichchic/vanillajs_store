import express from "express";

import { extractOptions } from "src/utility/extract";

import list from "src/data/list.json";
import options from "src/data/options.json";

function getList(req: express.Request, res: express.Response) {
  res.status(200).json(list);
}

function getOptionsById(req: express.Request, res: express.Response) {
  const result = extractOptions(Number(req.params.productId));
  if (result === null) {
    res.status(404).end();
  } else {
    res.status(200).json(result);
  }
}

export { getList, getOptionsById };
