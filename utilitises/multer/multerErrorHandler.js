const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes("image")) {
    console.log(err.message)
    return res.status(400).json({
      state: false,
      error: err.message
    });
  }
  next(err);
};

module.exports = {multerErrorHandler}