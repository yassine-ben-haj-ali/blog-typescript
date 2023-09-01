import { IReqAuth } from "../config/interface";
import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcrypt"


const userCtrl = {

    updateUser: async (req: IReqAuth, res: Response) => {
        try {
            if (!req.user) return res.status(404).json({ msg: "invalid authentification." })
            await User.findOneAndUpdate({ _id: req.user._id },
                {
                    $set: req.body,
                },
                { new: true })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req: Request, res: Response) => {
        const { userID } = req.params
        try {

            const user = await User.findById(userID).select("-password")
            if (!user) return res.status(404).json({ msg: "user does not exist" })
            return res.status(200).json(user)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req: IReqAuth, res: Response) => {
        const { password } = req.body;
        try {
            if (!req.user) return res.status(400).json({ msg: "invalid authentification" })
            const hashedPass = await bcrypt.hash(password, 12);
            await User.findOneAndUpdate(req.user._id, {
                password: hashedPass
            });
            res.status(200).json({ msg: "Reset Password Success!" })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default userCtrl