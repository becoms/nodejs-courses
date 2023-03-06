import express from "express";
import { ShoesRouter } from "./shoes/shoesRouter"

const app = express();

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

app.enable("trust proxy");
// Our application routes:
app.use("/v1/shoes", ShoesRouter);


app.listen(8080, () => {
    console.log(`Simple-boilerplate listening on port 8080`)
})