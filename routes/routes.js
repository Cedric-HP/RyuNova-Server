const { Router } = require('express');
const router = Router();
const { validate } = require('../utilitises/validate');
const { loginSchema, registerSchema } = require('../utilitises/validationShema/loginRegisterShema');
const { authentication } = require('../utilitises/jwt')

// CONTROLLERS
const logRegControllers = require('../controllers/logRegControllers');
const userControllers = require('../controllers/userControllers');
const contentControllers = require('../controllers/contentControllers');
const { commentSchema } = require('../utilitises/validationShema/commentSchema');
const { likeSchema } = require('../utilitises/validationShema/likeShema');

// LOG REGISTER ROUTES
router.post("/register", validate(registerSchema) ,logRegControllers.postRegister)

router.post("/login", validate(loginSchema), logRegControllers.postLogin)

router.get("/logout", authentication, logRegControllers.postLogout);

router.get("/checkduplicate", logRegControllers.getCheckDuplicate)

// router.post("/user/update", validate(registerSchema) ,logRegControllers.postRegister)

// router.post("/user/delet", validate(registerSchema) ,logRegControllers.postRegister)


// USER ROUTES
router.get("/profile", authentication, userControllers.getProfile)

router.get("/profile/:userId", userControllers.getUserById)

router.get("/follow/:userId", authentication, userControllers.getFollow)


// CONTENT ROUTES
// Search Route
router.get("/search", contentControllers.getSearch)

router.get("/comment/search", contentControllers.getComment)

router.get("/image/:imageId", contentControllers.getImageById)

// Content Interaction
router.get("/content/image/:contentId", contentControllers.getAddImageView)

router.post("/content", authentication, validate(likeSchema), contentControllers.postLike)

// router.get("/content/article/:contentId", contentControllers.getAddArticleView)

router.post("/comment", authentication, validate(commentSchema), contentControllers.postComment)



// ADMIN ROUTES

module.exports = router;