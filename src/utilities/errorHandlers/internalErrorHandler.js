module.exports.internalErrorHandler = function internalErrorHandler(res, error) {
  // joi validation error
  if (error.details) {
    errorMessages = error.details.map((element) => element.message);
    return res.status(400).json(errorMessages);
  }

  console.log(error);

  if (error.code === 'ER_DUP_ENTRY') {
    res.json({ error: 'Duplicate entry' });
  } else {
    res.sendStatus(500);
  }
};
