function errorHandler(error, req, res, next) {
  if (error.code && error.message) {
    res.status(error.code).json({ message: error.message });
  } else {
    res.status(500).json({ message: "Failed to make request" });
  }
}

module.exports = errorHandler;
