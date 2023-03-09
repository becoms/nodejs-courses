import Boom from "@hapi/boom";
import compression from "compression";
import cors from "cors";
import express from "express";
import "express-async-errors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { ItemRouter } from "./items/itemRouter.js";
import { bodyParserErrorHandler } from "./utils/bodyParserErrorHandler.js";
import { errorHandler } from "./utils/errorHandler.js";
import { jwtCheck } from "./utils/jwtCheck.js";
import { notFoundHandler } from "./utils/notFoundHandler.js";
import { unauthorizedErrorHandler } from "./utils/unauthorizedErrorHandler.js";
import { validationErrorHandler } from "./utils/validationErrorHandler.js";

const app = express();

if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
  // These middlewares are added for development purposes.
  // Log HTTP requests
  app.use(morgan("dev"));
}

// Add gzip compression.
app.use(compression());

// Add CORS headers.
app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    maxAge: 600,
  })
);

// Add security headers to every requests.
app.use(helmet());

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

// Limit request rate on API, `windowMs` and `max` can be adjusted to match the desired rate.
// see https://github.com/nfriedly/express-rate-limit for more information
app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5000, // 5000 requests can be executed during the `windowMs` time window
    message: Boom.tooManyRequests("Too many requests, please try again later.").output.payload,
  })
);

// JWT authentication
// app.use(jwtCheck);

// Our application routes:
app.use("/v1/item", ItemRouter);

// Handle requests matching no routes.
app.use(notFoundHandler);

app.use(unauthorizedErrorHandler);

// Handle body parser syntax errors
app.use(bodyParserErrorHandler);

// Add validation error information
app.use(validationErrorHandler);

// Handle errors passed using `next(error)`.
app.use(errorHandler);

export default app;
