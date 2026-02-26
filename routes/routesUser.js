const { Router } = require('express');
const routerUser = Router();
const { validate } = require('../utilitises/validate');
const { authentication } = require('../utilitises/jwt')

// SCHEMA
const { loginSchema, registerSchema } = require('../utilitises/validationShema/loginRegisterShema');

// CONTROLLERS
const logRegControllers = require('../controllers/logRegControllers');
const userControllers = require('../controllers/userControllers');

routerUser.post("/register", validate(registerSchema) ,logRegControllers.postRegister)

routerUser.post("/login", validate(loginSchema), logRegControllers.postLogin)

routerUser.get("/logout", authentication, logRegControllers.postLogout);

routerUser.get("/checkduplicate", logRegControllers.getCheckDuplicate)

// routerUser.post("/update", validate(registerSchema) ,logRegControllers.postRegister)

// routerUser.post("/delet", validate(registerSchema) ,logRegControllers.postRegister)

routerUser.get("/profile", authentication, userControllers.getProfile)

module.exports = routerUser;