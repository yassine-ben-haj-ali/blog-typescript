import express from "express";
import userCtrl from "../controllers/UserCtrl";

const router = express.Router();

router.put("/user", userCtrl.updateUser);
router.get("/user/:userID", userCtrl.getUser);
router.put("/reset_password", userCtrl.resetPassword);

export default router;