import express from "express";
import { ShoesRouter } from "./shoes/shoesRouter.mjs";
import mongoose from "mongoose";
import { ProductsRouter } from "./product/ProductRouter.mjs";
import { notFoundHandler } from "./utils/notFoundHandler.js";
import { errorHandler } from "./utils/ErrorHandler.js";
import { validationErrorHandler } from "./utils/validationErrorHandler.js";

const app = express();

const connectDb = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/nomDeLaBase");
    } catch (error) {
        
    }
 
};

connectDb();

// Allow express to parse JSON bodies.
app.use(express.json({
  limit: "1mb", // default is too small (100kb), increase it for base64 payloads
}));

app.use(
  express.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use("/v1/shoes", ShoesRouter);
app.use("/v1/products", ProductsRouter);

// Handle errors
app.use(errorHandler);

// Handle requests matching no routes.
// As it is declared after all Routers
// Only run if no route matched
app.use(notFoundHandler);

app.listen(8080, () => {
  console.log(`Simple-boilerplate listening on port 8080`);
});
