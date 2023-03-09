import express from "express";
import { validateObjectId } from "../utils/validateObjectId.mjs";
import { Product } from "./product.mjs";
import fetch from "node-fetch";

const ProductsRouter = express.Router();
ProductsRouter.route("/")
  .get(async (req, res, next) => {
    // http://localhost:8080/v1/products?name=nike2&size[$gte]=9
    // http://localhost:8080/v1/products?name[$regex]=nike (like)
    // http://localhost:8080/v1/products?name[$regex]=nike&sort[name]=-1 (tri dynamique)
    const {
      page = 1,
      limit = 10,
      skip = 0,
      sort = "_id",
      ...filter
    } = req.query;
    try {
      let products = await Product.find(filter)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort(sort);
      return res.json(products);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const prod = new Product(req.body);
      await prod.save();
      return res.status(201).json(prod);
    } catch (error) {
      next(error);
    }
  });

ProductsRouter.route("/fetch-api").get(async (req, res, next) => {
  try {
    const response = await fetch("https://api.github.com/users/github");
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    next(error);
  }
});

ProductsRouter.param("id", validateObjectId).param(
  "id",
  async (req, res, next, value, name) => {
    const product = await Product.findById(value);
    res.locals.product = product;
    return next();
  }
);
ProductsRouter.route("/:id")
  .get(async (req, res) => {
    const { product } = res.locals;
    // res.locals.product
    return res.json(product);
  })
  .patch(async (req, res) => {
    try {
      const { product } = res.locals;
      product.set(req.body);
      await product.save();
      return res.json(product);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res) => {
    try {
      const { product } = res.locals;
      product.overwrite(req.body);
      await product.save();
      return res.json(product);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (_, res) => {
    const { product } = res.locals;
    await product.deleteOne();
    return res.sendStatus(204);
  });

export { ProductsRouter };
