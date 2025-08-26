import cloudinary from 'cloudinary';

import dotenv from 'dotenv'

dotenv.config({});

cloudinary.v2.config({
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    cloud_name: process.env.CLOUD_NAME
})

export const uploadMedia = async (file) => {
    try {
        const uploadResponse = await cloudinary.v2.uploader.upload(file, {
            resource_type: 'auto'
            // folder  :'lmgProject',
        })
        return uploadResponse
    } catch (error) {
        console.log(error);
    }
}

export const delteMediaFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId)
    } catch (error) {
        console.log(error);

    }
}
export const deleteVideoFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId, { resource_type: "video" })
    } catch (error) {
        console.log(error);
        
    }
}

