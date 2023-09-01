import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { IDecodedToken, IReqAuth } from "../config/interface";



const { ACCESS_TOKEN_SECRET } = process.env
const authGard = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
        let token = req.header("authorization");
        if (!token) return res.status(403).json("Access Denied");
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const decoded = <IDecodedToken>jwt.verify(token, `${ACCESS_TOKEN_SECRET}`)
        if (!decoded) return res.status(400).json({ msg: "invalid authentification" })
        console.log(decoded)
        const user = await User.findOne({ _id: decoded.userData?.id }).select("-password");
        if (!user) return res.status(400).json({ msg: "user does not exist" })
        console.log(user);
        req.user = user
        next()
    } catch (err: any) {
        return res.status(403).json({ msg: err.message })
    }
}

export default authGard