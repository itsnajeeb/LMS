import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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

export const getCreatorCourses = async (req, res,) => {
    try {
        const id = req.id
        const course = await Course.find({ creator: id });
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found "
            })
        }

        return res.status(200).json({
            success: true,
            course,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: false,
            message: "failed to get course details"
        })
    }
}

export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
        const thumbnail = req.file

        let course = await Course.findById(courseId)

        if (!course) {
            return res.status(401).json({
                success: false,
                message: "Course not found"
            })
        }

        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0]
                deleteMediaFromCloudinary(publicId);//delete old image
            }
            //Uploading thumbnail on cloudinary
            courseThumbnail = await uploadMedia(thumbnail.path)
        }

        const updateData = { courseTitle, subTitle, description, category, courseLevel, coursePrice, courseThumbnail: courseThumbnail?.secure_url }

        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true })

        return res.status(200).json({
            success: true,
            message: "Course Updated Successfully ",
            course
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: false,
            message: "failed to get course details"
        })
    }
}

export const getCourseById = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course Not found"
            });
        }
        return res.status(200).json({
            success: true,
            course
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: false,
            message: "failed to get course details"
        })
    }
}


// Lecture add/create/edit/delete logic
export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        if (!lectureTitle) {
            return res.json(400).json({
                success: false,
                message: "Lecture Title is required"
            })
        } if (!courseId) {
            return res.json(400).json({
                success: false,
                message: "Course Id not found"
            })
        }

        const lecture = await Lecture.create({ lectureTitle });

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(401).json({
                Suspense: false,
                message: "Course not found,"
            });
        };
        if (course) {
            course.lectures.push(lecture._id);
            course.save();
        }
        return res.status(200).json({
            success: true,
            message: "Lecture Created Successfully.",
            lecture
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: false,
            message: "failed to create lecture. please try again"
        })
    }

}

export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;


        const course = await Course.findById(courseId).populate("lectures")

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        return res.status(200).json({
            success: true,
            lectures: course.lectures
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: false,
            message: "failed to get Lecture"
        })
    }
}

export const editLecture = async (req, res) => {
    try {
        const { lectureTitle, videoInfo, isPreviewFree } = req.body

        const { courseId, lectureId } = req.params

        const lecture = await Lecture.findById(lectureId);

        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            })
        }
        if (lectureTitle) lecture.lectureTitle = lectureTitle
        if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl
        if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId
        if (isPreviewFree) lecture.isPreviewFree = isPreviewFree

        await lecture.save()

        //Ensure the course still has the lecture id if it was not already added;

        const course = await Course.findById(courseId)

        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id)
            await course.save()
        }
        return res.status(200).json({
            success: true,
            message: "Lecture Updated Successfully",
            lecture
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: false,
            message: "failed video uplaoding"
        })
    }
}

export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId)

        //delete lecture video from cloudinary as well
        if (lecture.publicId) {
            await deleteMediaFromCloudinary(lecture.publicId)
        }

        //Remove lecture id reference from course collection
        await Course.updateOne(
            { lectures: lectureId },//find the course that contain the lecture 
            { $pull: { lectures: lectureId } }//Remove lecture id from the course.lectures
        )
        return res.status(200).json({
            success: true,
            message: "Lecture Removed Successfully"
        })
    }
    catch (err) {
        console.log(error);
        return res.status(500).json({
            message: false,
            message: "Lecture not removed yet"
        })
    }
}

export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        console.log("LEC", lectureId);

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                success: false,
                message: "Lecture not found"
            })
        }
        return res.status(200).json({
            success: true,
            lecture
        })
    }
    catch (err) {
        return res.status(500).json({
            message: false,
            message: "Lecture not removed yet"
        })
    }
}