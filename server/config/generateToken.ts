import jwt from 'jsonwebtoken'
import { Response } from 'express'

const {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET
} = process.env

export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, `${ACCESS_TOKEN_SECRET}`, { expiresIn: '1m' })
}

export const generateRefreshToken = (payload: object) => {
    const token = jwt.sign(payload, `faza`, { expiresIn: '5d' })
    return token;
}


