import dotenv from "dotenv";
import { createTerminus, HealthCheckError } from "@godaddy/terminus";
import http from "http";
import mongoose from "mongoose";
import app from "./app.js";
import { initData } from "./items/itemRouter.js";
import "dotenv-defaults/config"

// Inject environment variables defined in the `.env` file placed at the root of the project.
dotenv.config();

const connectToDatabase = async (url, options) => {
  console.log(`Connecting to database "${url}"`);
  try {
    await mongoose.connect(url, {
      // Use the new MongoDB driver implementation for parsing connection strings.
      // See: https://mongoosejs.com/docs/deprecations.html#the-usenewurlparser-option
      useNewUrlParser: true,
      // Allow the MongoDB driver to periodically check for changes in a MongoDB shared cluster.
      // See: https://mongoosejs.com/docs/deprecations.html#useunifiedtopology
      useUnifiedTopology: true,
      ...options,
    });
    console.log(`Connected to database "${url}"`);
  } catch (error) {
    console.log(`Failed to connect to database "${url}"`);
    throw error;
  }
};

const startHTTPServer = async (server, options) => {
  const address = `http://${options.host}:${options.port}`;
  console.log(`Starting HTTP server on "${address}"`);
  // const spinner = ora(`Starting HTTP server on "${address}"`).start();
  return new Promise((resolve, reject) => {
    server
      .listen(options, () => {
        console.log(`HTTP server started on "${address}"`);
        // spinner.succeed(`HTTP server started on "${address}"`);
        return resolve();
      })
      .on("error", (error) => {
        console.log(`Failed to start HTTP server on "${address}"`);
        // spinner.fail(`Failed to start HTTP server on "${address}"`);
        return reject(error);
      })
      .on("SIGTERM", () => process.exit(0))
      .on("SIGINT", () => process.exit(0))
      .on("uncaughtException", () => process.exit(0));
  });
};

const server = http.createServer(app);

createTerminus(server, {
  onSignal: async () => {
    await mongoose.connection.close();
  },
  healthChecks: {
    "/healthcheck": async () => {
      return mongoose.connection.readyState === 1
        ? Promise.resolve()
        : Promise.reject(new HealthCheckError("Database not connected"));
    },
  },
});

console.log(`Starting backend v${process.env.npm_package_version}`);

// Retrieve mongodb information from environement variables and connect to the database.
// While the connection is being established, mongoose will buffer operations.
// See: https://mongoosejs.com/docs/connections.html#buffering
connectToDatabase(process.env.MONGO_URL, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
}).then(() => initData());

// Retrieve HTTP server host and port from environment variables,
// create HTTP server and listen to connections.
startHTTPServer(server, {
  host: process.env.HOST,
  port: Number(process.env.PORT),
});

export default app;
