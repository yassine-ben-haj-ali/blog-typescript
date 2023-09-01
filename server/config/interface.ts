import { Document } from "mongoose";
import { Request } from "express";


export interface IUser extends Document {
    username: string
    email: string
    password: string
    profilePic?: string
    _doc: object
}


export interface IPost extends Document {
    title: string
    desc: string
    photo?: string
    username: string
    categories?: string[]
    _doc: object
}

export interface ICategory extends Document {
    name: string
    _doc: object
}

export interface IUserData {
    username: string,
    email: string,
    id: string
}


export interface IDecodedToken {
    userData?: IUserData
    exp: number
    iat: number
}

export interface IReqAuth extends Request {
    user?: IUser
}


