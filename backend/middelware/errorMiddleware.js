const notFound = (req, res, next) => {
  const error = new Error("Not Found - " + req.originalUrl);
  res.sendStatus(404);
  // next(error);
};
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  res.status(statusCode).json({
    message: message,
    stack: err.stack,
  });
};
export { notFound, errorHandler };
