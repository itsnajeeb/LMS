import jwt from 'jsonwebtoken'
const isAuthenticated = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User Authentication Failed. Please Login "
            })
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)

        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token. Please login again"
            })
        }

        req.id = decode.id;

        next()
    } catch (error) {
        if (error.name = 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: "Token Expired. Please login again"
            })
        }
        if (error.name = "jsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid Token. Please login again"
            })
        }

        return res.status(501).json({
            success: false,
            message: "Authorization Failed !"
        })
    }
}
export default isAuthenticated