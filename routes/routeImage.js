const { Router } = require('express');
const routerImage = Router();
const upload = require("../utilitises/multer/upload")
const { validate } = require('../utilitises/validate');
const { imageSchema } = require('../utilitises/validationShema/imageShema');
const { authentication } = require('../utilitises/jwt')
const imageControllers = require('../controllers/imageControllers');

routerImage.post("/", 
    authentication,
    upload.single("image"),
    validate(imageSchema), 
    imageControllers.postImage)

module.exports = routerImage;