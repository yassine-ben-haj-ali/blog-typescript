import mongoose from "mongoose";
import { IPost } from "../config/interface";

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        desc: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: false
        },
        username: {
            type: String,
            required: true
        },
        categories: {
            type: Array,
            required: false
        }
    },
    { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);