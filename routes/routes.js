const { Router } = require('express');
const router = Router();
// const odysseyController = require('../controllers/controllers');
const logRegControllers = require('../controllers/logRegControllers');
// const { authentication } = require('../utils/jwt')
// const { authenticationPSW } = require('../utils/psw')

router.post('/register', logRegControllers.postRegister)

router.post('/login', logRegControllers.postLogin)

// router.get('/status', odysseyController.getStatus);

// router.get('/api/:entity', authenticationPSW, odysseyController.getEntity);

// router.post('/api/:entity', odysseyController.postEntity);

// router.put('/api/:entity/:id', authenticationPSW, odysseyController.putEntity);

// router.delete('/api/:entity/:id', authenticationPSW, odysseyController.deleteEntity);

// router.post('/api/navigation/:mode', authenticationPSW, odysseyController.navigation);

module.exports = router;