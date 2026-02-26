const multer = require('multer')
const path = require("path");
const fs = require("fs");

const VALID_CATEGORIES = ["image", "avatar", "banner"];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let category = req.headers["x-image-category"];

      if (!VALID_CATEGORIES.includes(category)) {
        category = "image";
      }

      const dir = `api/${category}/full`;

      fs.mkdirSync(dir, { recursive: true });

      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    },
})

module.exports = storage