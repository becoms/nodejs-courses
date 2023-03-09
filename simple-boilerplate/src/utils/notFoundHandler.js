export const notFoundHandler = (req, res, next) => {
  return res.status(404).send({ error: `Error 404 : Not Found - ${req.method} ${req.path}` })
};
