module.exports.internalErrorHandler = function internalErrorHandler(res, error) {
  if (error.details) {
    errorMessages = error.details.map((element) => element.message);
    res.status(400).json(errorMessages);
  } else {
    console.log(error);
    res.sendStatus(500);
  }
};
