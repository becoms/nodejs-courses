import mongoose from "mongoose";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(422).send(err);
  }
  return res.status(err.statusCode ?? 500).send(err);
};
