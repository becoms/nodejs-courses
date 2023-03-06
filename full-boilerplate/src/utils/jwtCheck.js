import { expressjwt } from "express-jwt";
import jwks from "jwks-rsa";

export const addEndingSlash = (url) => url ? `${url}${url.endsWith("/") ? "" : "/"}` : "/";

export const jwtCheck = expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${addEndingSlash(process.env.AUTH0_URL)}.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: addEndingSlash(process.env.AUTH0_URL),
  algorithms: ["RS256"],
});
