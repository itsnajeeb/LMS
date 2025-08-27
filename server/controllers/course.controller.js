import { Course } from "../models/course.model.js";

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;

        if (!courseTitle || !category) {
            return res.status(400).json({
                success: false,
                message: "Course Title and Category is required"
            });
        }

        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id
        });
        if (course) {
            return res.status(200).json({
                success: false,
                message: "Course Created Successfully",
                course
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "Course creation Failed Please try again"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: false,
            message: "failed to create course"
        })
    }

}