// TODO:
// роутер для пользователя - crud

const Router = require("express");
const router = new Router();
const controller = require("../controllers/userController.js");
const authMiddleware = require("../middlewares/auth-middleware.js");

router.get("/allUsers", authMiddleware, controller.getUsers);
router.post("/resetPwdUserByPK", controller.resetPwdUserByPK);
router.post("/DeleteUserByPK", controller.DeleteUserByPK);
router.get("/langs", controller.getAllLangsByUser);
router.get("/reset/:link", controller.reset);
router.post("/newPwd", controller.GetNewPassword);
router.post("/changeGivenName", controller.changeGivenName);
router.post("/changeFamilyName", controller.changeFamilyName);


module.exports = router;
