const { Router } = require('express');
const routerAdmin = Router();
const { validate } = require('../utilitises/validate');
const { loginSchema, registerSchema } = require('../utilitises/validationShema/loginRegisterShema');
const { authentication } = require('../utilitises/jwt')

// CONTROLLERS
const logRegControllers = require('../controllers/logRegControllers');
const userControllers = require('../controllers/userControllers');
const contentControllers = require('../controllers/contentControllers');
const { commentSchema } = require('../utilitises/validationShema/commentSchema');
const { likeSchema } = require('../utilitises/validationShema/likeShema');

module.exports = routerAdmin