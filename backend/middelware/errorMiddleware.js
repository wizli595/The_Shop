const notFound = (req, res, next) => {
  const error = new Error("Not Found - " + req.originalUrl);
  res.sendStatus(404);
  next(error);
};
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.log(res.statusCode);
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "Resourse not found";
    statusCode = 404;
  }

  res.status(statusCode).json({
    message: message,
    stack: err.stack,
  });
};
export { notFound, errorHandler };
