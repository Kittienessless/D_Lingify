// TODO:
// роутер для авторизации- вход и выход
const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController.js");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware.js");
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 4, max: 32 }),
  controller.registration
);
router.post("/login", controller.login);
router.post("/googleAuth", controller.googleAuth);
router.post("/logout", controller.logout);

router.get("/getOneUserByPK", authMiddleware, controller.getOneUserByPK);
router.get("/refresh", controller.refresh);
router.get("/GoogleRefresh", controller.GoogleRefresh);
router.get("/activate/:link", controller.activate);

module.exports = router;
