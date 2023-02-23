import express from "express";
import Boom from "@hapi/boom";
import { validateObjectId } from "../utils/validateObjectId.js";
import { Item } from "./shoesList.js";
import { sanitize } from "../utils/sanitize.js";

const ShoesRouter = express.Router();

ShoesRouter.route("/")
  .get(async (req, res) => {
    const { limit = 20, skip = 0, sort = "_id", select, populate, ...filter } = req.query;
    const listQuery = Item.find(filter)
      .limit(Number(limit))
      .skip(Number(skip))
      .sort(sort)
      .select(select)
      .populate(populate);
    const totalCountQuery = Item.find(listQuery.getFilter()).countDocuments();
    const [list, totalCount] = await Promise.all([listQuery, totalCountQuery]);
    res.set("X-Total-Count", String(totalCount));
    return res.json(list);
  })
  .post(async (req, res) => {
    const test = new Item(sanitize(req.body));
    await test.save();
    return res.status(201).json(test);
  });

ShoesRouter.param("id", validateObjectId).param("id", async (req, res, next, value, name) => {
  const { select, populate } = req.query;
  const test = await Item.findById(value).select(select).populate(populate);
  if (test === null) {
    throw Boom.notFound(`${Item.modelName} with \`${name}\` matching \`${value}\` not found.`);
  }
  res.locals.test = test;
  return next();
});

ShoesRouter.route("/:id")
  .get((req, res) => {
    const { test } = res.locals;
    return res.json(test);
  })
  .patch(async (req, res) => {
    const { test } = res.locals;
    test.set(sanitize(req.body));
    await test.save();
    return res.json(test);
  })
  .delete(async (req, res) => {
    const { test } = res.locals;
    await test.remove();
    return res.sendStatus(204);
  });


export { ItemRouter };
