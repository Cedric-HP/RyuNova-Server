const { Router } = require('express');
const storage = require("../utilitises/storage")
const routerImage = Router();
const multer  = require('multer')
const upload = multer({ storage })
const { validate } = require('../utilitises/validate');
const { imageSchema } = require('../utilitises/validationShema/imageShema');
const { authentication } = require('../utilitises/jwt')
const imageControllers = require('../controllers/imageControllers');

routerImage.post("/", upload.single("image"), authentication, validate(imageSchema), imageControllers.postImage)

module.exports = routerImage;