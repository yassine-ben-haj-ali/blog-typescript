import { Request, Response } from "express";
import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors"
import cookieParser from "cookie-parser";
import routes from "./routes";
import corsOptions from "./config/corsOptions";

import dotenv from "dotenv"
dotenv.config();


const app = express();
const port = process.env.PORT || 8800


app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cors(corsOptions));
app.use(cookieParser("secret"))


import './config/database'
import { IReqAuth } from "./config/interface";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload/", upload.single("file"), (req: IReqAuth, res: Response) => {
    try {
        if (!req.user) return res.status(400).json({ msg: "user does not exist" })
        res.status(200).json("File has been uploaded");
    } catch (err) {
        console.log(err)
    }
});


app.use("/api", routes)



app.listen(port, () => {
    console.log('backend is running')
})