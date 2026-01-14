const { Router } = require('express');
const router = Router();
const { validate } = require('../utilitises/validate');
const { loginSchema, registerSchema } = require('../utilitises/validationShema/loginRegisterShema');
const { authentication } = require('../utilitises/jwt')

// Controller

const logRegControllers = require('../controllers/logRegControllers');
const userControllers = require('../controllers/userControllers');
const contentControllers = require('../controllers/contentControllers');
const imageControllers = require('../controllers/imageControllers');
const testControllers = require('../controllers/controllers');

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

router.get("/follow/:userId", authentication, userControllers.getFollow)


// Search Route

// router.get("/search", userControllers.getUserById)

// Content Interaction

router.get("/image/:imageId", contentControllers.getImageById)

router.get("/content/image/:contentId", contentControllers.getAddImageView)

router.get("/content/comment/:contentId", contentControllers.getAddCommentView)

// Admin Routes

module.exports = router;