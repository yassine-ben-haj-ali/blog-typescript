import express from "express";
import { validRegister } from "../middleware/valid";
import authCtrl from "../controllers/AuthCtrl";

const router = express.Router();

router.post("/auth/register", validRegister, authCtrl.Register);
router.post("/auth/login", authCtrl.Login);
router.get("/auth/logout",authCtrl.logout);
router.get("/auth/refresh",authCtrl.refreshToken);

export default router;