const { Router } = require('express');
const routerInteraction = Router();
const { validate } = require('../utilitises/validate');
const { authentication } = require('../utilitises/jwt')

// SCHEMA
const { commentSchema } = require('../utilitises/validationShema/commentSchema');
const { likeSchema } = require('../utilitises/validationShema/likeShema');

// CONTROLLERS
const userControllers = require('../controllers/userControllers');
const contentControllers = require('../controllers/contentControllers');

// ROUTES
routerInteraction.get("/follow/:userId", authentication, userControllers.getFollow)

routerInteraction.get("/view/image/:contentId", contentControllers.getAddImageView)

routerInteraction.get("/view/article/:contentId", contentControllers.getAddArticleView)

routerInteraction.post("/like", authentication, validate(likeSchema), contentControllers.postLike)

routerInteraction.post("/comment", authentication, validate(commentSchema), contentControllers.postComment)

module.exports = routerInteraction