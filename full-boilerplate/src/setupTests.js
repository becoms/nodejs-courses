// Run some code to configure or set up the jest before each test file in the suite is executed.
// (e.g.: setup global setup or teardown, add custom matchers, etc.)
import { startJwks, stopJwks } from "./tests/jwks";

process.env.TRADING_API_URL = "https://api-demo.fxcm.com";
process.env.TRADING_API_TOKEN = "dd8c2d937bc4f330635ab4eb8d361eb8af9249f4";

beforeAll(async () => {
  startJwks();
});

afterAll(async () => {
  await stopJwks();
});
