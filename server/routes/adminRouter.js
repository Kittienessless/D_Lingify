// роутер для ролей
const Router = require('express');
const router = new Router();
const controller = require ('../controllers/adminController');

router.post('/changeUserRole', controller.changeUserRole);
router.get('/userStat', controller.getUserStatistics);
 router.get('/LangStat', controller.getLanguageStatistics);
 router.post('/DeleteUser', controller.deleteUserByAdmin);

module.exports = router