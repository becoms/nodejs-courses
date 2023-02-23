import express from "express";
import { ShoesRouter } from "./shoes/shoesRouter"

const app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test") {
    // These middlewares are added for development purposes.
    // Depending on the use case, you can move these middleware outside of this `if` block or
    // you can edit your HTTP server (e.g.: Apache, NGINX, etc.) to handle the following cases:

    // Log HTTP requests
    // app.use(morgan("dev"));
}

// Add CORS headers.
// app.use(
//     cors({
//         exposedHeaders: ["X-Total-Count"],
//         maxAge: 600,
//     })
// );

// Add security headers to every requests.
// app.use(helmet());

// Allow express to parse JSON bodies.
app.use(express.json({
    limit: "1mb", // default is too small (100kb), increase it for base64 payloads
}));

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.enable("trust proxy");

// Limit request rate on API, `windowMs` and `max` can be adjusted to match the desired rate.
// see https://github.com/nfriedly/express-rate-limit for more information
// app.use(
//     rateLimit({
//         windowMs: 60 * 60 * 1000, // 1 hour
//         max: 5000, // 5000 requests can be executed during the `windowMs` time window
//         message: Boom.tooManyRequests("Too many requests, please try again later.").output.payload,
//     })
// );

// JWT authentication
// app.use(jwtCheck);

// Our application routes:
app.use("/v1/shoes", ShoesRouter);

// Handle requests matching no routes.
// app.use(notFoundHandler);

// app.use(unauthorizedErrorHandler);

// Handle body parser syntax errors
// app.use(bodyParserErrorHandler);

// Add validation error information
// app.use(validationErrorHandler);

// Handle errors passed using `next(error)`.
// app.use(errorHandler);

app.listen(8080, () => {
    console.log(`Simple-boilerplate listening on port 8080`)
})