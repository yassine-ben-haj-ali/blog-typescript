import mongoose from "mongoose";
import { ICategory } from "../config/interface";

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model<ICategory>("Category", CategorySchema);