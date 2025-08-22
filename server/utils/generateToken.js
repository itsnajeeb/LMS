import jwt from 'jsonwebtoken'
import cookie from 'cookie-parser'

export const generateToken = (res, user, message) => {
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    })
    user.password=undefined

    return res.status(200).json({
        success: true,
        message,
        user
    })
}