const { Router } = require('express');
const routerContent = Router();

// CONTROLLERS
const userControllers = require('../controllers/userControllers');
const contentControllers = require('../controllers/contentControllers');

// ROUTES
routerContent.get("/search", contentControllers.getSearch)

routerContent.get("/comment/search", contentControllers.getComment)

routerContent.get("/image/:imageId", contentControllers.getImageById)

routerContent.get("/profile/:userId", userControllers.getUserById)

module.exports = routerContent