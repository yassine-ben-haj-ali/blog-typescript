import { ChangeEvent, FormEvent } from "react"
import store from "../store"
export type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
export type FormSubmit = FormEvent<HTMLFormElement>
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export interface IUserLogin {
    email: string,
    password: string
}

export type ICategory = {
    name: string
}
export interface IPost {
    post: {
        _id: string
        title: string
        desc: string
        photo?: string
        username: string
        categories?: ICategory[]
        createdAt: string
    }
}



