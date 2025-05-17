// роутер для ролей
const Router = require('express');
const router = new Router();
const controller = require ('../controllers/adminController');

router.put('/admin', controller.changeUserRole);
router.get('/userStat', controller.getUserStatistics);
 router.get('/LangStat', controller.getLanguageStatistics);

module.exports = router