import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exist with this email "
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const CretedUser = await User.create({
            name,
            email,
            password: hashPassword
        })
        CretedUser.password = undefined;
        if (CretedUser) {

            res.status(200).json({
                success: true,
                message: "User Created Successfully",
                CretedUser
            })
        }
        else {
            res.status(401).json({
                success: false,
                message: "User Creation Failed. Please try again",
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong please try again"
        })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("isMathc > ", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password"
            })
        }
        generateToken(res, user, `Welcome back ${user.name}`)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        })
    }


}