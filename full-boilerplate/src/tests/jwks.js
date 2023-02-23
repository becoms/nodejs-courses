import createJWKSMock from "mock-jwks";

export const defaultTokenPayload = {
  iss: process.env.AUTH0_URL,
  sub: "auth0|000000000000000000000000",
  aud: [process.env.AUTH0_AUDIENCE, `${process.env.AUTH0_URL}userinfo`],
  iat: Date.now(),
  exp: Date.now() + 7200,
  scope: "openid profile email",
};

const jwks = createJWKSMock(process.env.AUTH0_URL);

export const startJwks = () => {
  jwks.start();
};

export const stopJwks = async () => {
  await jwks.stop();
};

export const createToken = (tokenPayload = defaultTokenPayload) => {
  return jwks.token(tokenPayload);
};
