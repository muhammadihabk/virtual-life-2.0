export function errorHandler(res, error) {
  console.log(error);
  // joi validation error
  if (error.details) {
    const errorMessages = error.details.map((element) => element.message);
    return res.status(400).json(errorMessages);
  }

  // MySQL error
  if (error.code === 'ER_DUP_ENTRY') {
    res.status(400).json({ error: 'Duplicate entry' });
  } else if (error.code === 'ER_NO_REFERENCED_ROW') {
    res.status(404).json({ error: 'Not found' });
  } else {
    res.sendStatus(500);
  }
};
