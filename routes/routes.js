const { Router } = require('express');
const router = Router();
const logRegControllers = require('../controllers/logRegControllers');
const { validate } = require('../utilitises/validate');
const { registerSchema } = require('../utilitises/validationShema/registerDataShema');
const { loginSchema } = require('../utilitises/validationShema/loginRegisterShema');
const { authentication } = require('../utilitises/jwt')
// const { authenticationPSW } = require('../utils/psw')

router.post('/register', validate(registerSchema) ,logRegControllers.postRegister)

router.post('/login', validate(loginSchema), logRegControllers.postLogin)

router.get('/status', authentication, logRegControllers.status);

// router.get('/api/:entity', authenticationPSW, odysseyController.getEntity);

// router.post('/api/:entity', odysseyController.postEntity);

// router.put('/api/:entity/:id', authenticationPSW, odysseyController.putEntity);

// router.delete('/api/:entity/:id', authenticationPSW, odysseyController.deleteEntity);

// router.post('/api/navigation/:mode', authenticationPSW, odysseyController.navigation);

module.exports = router;