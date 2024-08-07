import jwt from 'jsonwebtoken'

export function generateToken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
}