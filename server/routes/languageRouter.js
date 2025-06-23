  
const Router = require('express');
const router = new Router();
const controller = require ('../controllers/languageController.js');
const multer = require("multer");

const upload = multer({ dest: '../files/uploads/' });

router.post('/createLang', controller.createLanguage); 
router.post('/createLangNeural', controller.createLanguageNeural);
router.get('/getAllLangs', controller.getAllLangs); 
router.get('/lang/:id', controller.getCurrentLang); 
router.put('/updateLangInfo', controller.updateLangInfo);
router.post('/deleteLang', controller.deleteLang);
router.post('/upload/:id', upload.single('file'), controller.upload);
router.post('/getFile', controller.getFile);
router.get('/getAllLangsTitle', controller.getAllLangsTitle);
router.post('/download', controller.downloadFile);
router.post('/changeTitle/:id', controller.changeTitle);
router.post('/changeDesc/:id', controller.changeDesc);
router.post('/SaveAllChangesRules/:id', controller.SaveAllChangesRules);
router.post('/SaveAllChangesVocabular/:id', controller.SaveAllChangesVocabular);

module.exports = router