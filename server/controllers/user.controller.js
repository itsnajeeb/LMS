import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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
                message: "Account Created Successfully",
            })
        }
        else {
            res.status(401).json({
                success: false,
                message: "Acount Creation Failed. Please try again",
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

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Email or Password"
            })
        }
        generateToken(res, user, `Welcome back ${user.name}`)


    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to login"
        })
    }


}

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logged Out Successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }
}

export const getUserProfile = async (req, res, next) => {

    try {
        const id = req.id;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Profile data not found."
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch your Profile data"
        })
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const id = req.id;
        const { name } = req.body

        // if (!req.file.path) {
        //     return res.status(302).json({
        //         success: false,
        //         message: "req file path not found"
        //     })
        // }

        const user = await User.findById(id)


        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not Found !"
            })
        }
        //extract public id of the old image from the url is it exist;

        if (user.profileUrl) {
            const publicId = user.profileUrl.split("/").pop().split(".")[0];//Extract Public id
            deleteMediaFromCloudinary(publicId)
        }

        // upload new photo 
        let profileUrl;
        let updatedData = {
            name: "",
            profileUrl: ""
        }
        if (req.file?.path) {
            let filePath = req.file.path

            const cloudResponse = await uploadMedia(filePath)

            profileUrl = cloudResponse.secure_url;
        }
        else {
            profileUrl = user.profileUrl;
        }
        if (!name || name == "") {
            updatedData.name = user.name
        }

        updatedData = { name }

        if (profileUrl) {
            updatedData.profileUrl = profileUrl;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true }).select('-password')

        return res.status(200).json({
            success: true,
            updatedUser,
            message: "Profile Updated Successfully"
        })
    } catch (error) {
        console.log(error);
    }
}