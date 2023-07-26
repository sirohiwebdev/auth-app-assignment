import { Router } from "express";
import { authController } from "../controllers/authController";
import { authentication } from "../middlewares/authentication";
import passport from "../middlewares/passport";

const router = Router();

router.get("/test", (req, res, next) => {
  return res.status(200).json({ success: true });
});

router.get("/login/google", passport.authenticate("google"));
router.get("/login/facebook", passport.authenticate("facebook"));
router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/me", authentication, authController.me);

router.get(
  "/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "/",
    failureMessage: true,
  }),
  function (req, res) {
    //     @ts-gnore
    return res.json(req.user);
  },
);

router.get(
  "/redirect/facebook",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    failureMessage: true,
  }),
  function (req, res) {
    //     @ts-ignore
    return res.json(req.user);
  },
);

export default router;
