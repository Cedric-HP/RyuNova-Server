const { Router } = require('express');
const router = Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const { validate } = require('../utilitises/validate');
const { imageSchema } = require('../utilitises/validationShema/imageShema');
const { loginSchema, registerSchema } = require('../utilitises/validationShema/loginRegisterShema');
const { authentication } = require('../utilitises/jwt')

// Controller

const logRegControllers = require('../controllers/logRegControllers');
const userControllers = require('../controllers/userControllers');
const contentControllers = require('../controllers/contentControllers');
const imageControllers = require('../controllers/imageControllers');

// Log Register Routes

router.post("/register", validate(registerSchema) ,logRegControllers.postRegister)

router.post("/login", validate(loginSchema), logRegControllers.postLogin)

router.get("/logout", authentication, logRegControllers.postLogout);

router.get("/checkduplicate", logRegControllers.getCheckDuplicate)

// router.post("/user/update", validate(registerSchema) ,logRegControllers.postRegister)

// router.post("/user/delet", validate(registerSchema) ,logRegControllers.postRegister)

// User Routes

router.get("/profile", authentication, userControllers.getProfile)

router.get("/profile/:userId", userControllers.getUserById)

// Images Routes

router.get("/image/:imageId", contentControllers.getImageById)

// router.get("/image/thumbail/:imageId", contentControllers.getImageById)

router.get("/image/full/:imageId", imageControllers.postImage)

router.post("/image/upload", authentication, validate(imageSchema), upload.single("image"), imageControllers.postImage)

// Search Route

// router.get("/search", userControllers.getUserById)

// Admin Routes

module.exports = router;