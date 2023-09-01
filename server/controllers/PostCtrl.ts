import { Request, Response } from "express"
import Post from "../models/Post"
import { IReqAuth } from "../config/interface"
const postCtrl = {
    createPost: async (req: IReqAuth, res: Response) => {
        try {
            if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." })

            const newPost = new Post({
                username: req.user.username,
                ...req.body
            })
            await newPost.save()
            res.json({
                ...newPost._doc,
            })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updatePost: async (req: IReqAuth, res: Response) => {
        const { postID } = req.params
        try {
            if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." })
            const post = await Post.findOneAndUpdate({ _id: postID, username: req.user.username }, req.body);
            if (!post) return res.status(400).json({ msg: "Invalid Authentication." })
            return res.status(200).json({ msg: "Update Success!", post })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deletePost: async (req: IReqAuth, res: Response) => {
        const { postID } = req.params;
        try {
            if (!req.user) return res.status(400).json({ msg: "Invalid Authentification." })
            const post = await Post.findOneAndDelete({ _id: postID, username: req.user.username });
            if (!post) return res.status(400).json({ msg: "Invalid Authentication." })
            res.json({ msg: 'Delete Success!' })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getPosts: async (req: Request, res: Response) => {
        const {username, catName } = req.query;
        let posts;
        try {
            if (username) {
                posts = await Post.find({ username })
            } else if (catName) {
                posts = await Post.find({
                    categories: {
                        $in: [catName],
                    },
                });
            } else {
                posts = await Post.find();
            }
            return res.status(200).json(posts);
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default postCtrl

