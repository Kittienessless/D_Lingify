  
const Router = require('express');
const router = new Router();
const controller = require ('../controllers/languageController.js');

router.post('/createLang', controller.createLanguage); 
router.post('/createLangNeural', controller.createLanguageNeural);
router.get('/getAllLangs', controller.getAllLangs); 
router.get('/lang/:id', controller.getCurrentLang); 
router.put('/updateLangInfo', controller.updateLangInfo);
router.delete('/deleteLang/:id', controller.deleteLang);
router.post('/upload', controller.upload);

module.exports = router