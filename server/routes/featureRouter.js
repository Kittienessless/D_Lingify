// роутер для ролей
const Router = require('express');
const router = new Router();
const controller = require ('../controllers/featureController');

router.post('/text', controller.generateTextNeural);
router.post('/translate', controller.translateTextNeural); 

module.exports = router