import express from "express";
import authGard from "../middleware/auth";
import postCtrl from "../controllers/PostCtrl";


const router = express.Router();


router.post("/post", authGard, postCtrl.createPost);
router.delete("/post/:postID", authGard, postCtrl.deletePost);
router.put("/post/:postID", authGard, postCtrl.updatePost)
router.get("/post", postCtrl.getPosts)

export default router