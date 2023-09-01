import { Request, Response } from "express";
import bcrypt from "bcrypt"
import User from "../models/User";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../config/generateToken";
import { IDecodedToken, IReqAuth } from "../config/interface";

const authCtrl = {

    Register: async (req: Request, res: Response) => {
        try {
            const hashedPass = await bcrypt.hash(req.body.password, 12);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass,
            });

            const user = await newUser.save();
            res.status(200).json(user);

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }

    },
    Login: async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json("Wrong credentials!");
            const validated = await bcrypt.compare(password, user.password);
            if (!validated) return res.status(400).json("Wrong credentials!");
            const userData = { username: user.username, email: user.email, id: user._id }
            const access_token = generateAccessToken({ userData });
            console.log("first")
            const refresh_token = generateRefreshToken({ userData });
            res.cookie("refreshtoken", refresh_token, {
                httpOnly: true,
                maxAge: 5 * 24 * 60 * 60 * 1000,
                signed: true
            });
            const cookies = req.signedCookies;
            console.log(cookies)
            res.status(200).json({ user: { userData: { ...user._doc }, access_token } });
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: async (req: Request, res: Response) => {
        const { REFRESH_TOKEN_SECRET } = process.env
        try {
            const cookies = req.signedCookies;
            console.log("ahla", cookies)
            if (!cookies?.refreshtoken) return res.status(404).json({ msg: "Unothorized" })
            const refresh_token = cookies.refreshtoken;
            console.log("refresh", typeof (refresh_token));
            const decoded = <IDecodedToken>jwt.verify(refresh_token, `faza`)
            if (!decoded) return res.status(400).json({ msg: "invalid authentification" })
            const user = await User.findOne({ _id: decoded.userData?.id }).select("-password")
            if (!user) return res.status(404).json({ msg: "user does not exist." })
            const userData = { username: user.username, email: user.email, id: user._id }
            const access_token = generateAccessToken({ userData })
            return res.status(200).json({
                access_token,
                user
            })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: (req: IReqAuth, res: Response) => {
        try {

            res.clearCookie("refreshtoken")
            return res.status(200).json({ msg: "logged out!" })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }


    }


}




export default authCtrl
