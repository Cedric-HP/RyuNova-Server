const multer  = require('multer')
const storage = require('./storage')

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowed = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp"
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only png, jpg, jpeg, webp allowed"));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

module.exports = upload



