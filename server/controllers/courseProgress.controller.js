import { CourseProgress } from "../models/courseProgress.js";
import { Course } from "../models/course.model.js";

export const getCourseProgress = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id;

        //Step-1 fetch the user course progress
        const courseProgress = await CourseProgress.findOne({ courseId, userId }).populate("courseId");
        
        const courseDetails = await Course.findById(courseId).populate('lectures')

        if (!courseDetails) {
            return res.status(404).json({
                message: "Course not found",
            })
        }

        // step-2 If not progress found, return course details with an empty progress 
        if (!courseProgress) {
            return res.status(200).json({
                courseDetails,
                completed: false,
                progress: []
            })
        }

        //step-3 return the user's course progress along with course details
        return res.status(200).json({
            courseDetails,
            completed: courseProgress.completed,
            progress: courseProgress.lectureProgress
        })
    }
    catch (err) {
        console.log(err);
    }

}

export const updateLectureProgress = async (req, res) => {
    try {
        const { courseId, lectureId } = req.params;
        const userId = req.id;

        //fetch or create course progress 
        let courseProgress = await CourseProgress.findOne({ courseId, userId });
        
        if (!courseProgress) {
            //If not progress exist, create a new record
            courseProgress =  new CourseProgress({
                userId,
                courseId,
                completed:false,
                lectureProgress: []
            });
        }
        

        //step-4 find the lecture progress in the course progress

        const lectureIndex = courseProgress.lectureProgress.findIndex((lecture) => lecture.lectureId === lectureId)

        if (lectureIndex !== -1) {
            //if lecture already exist, update its status
            courseProgress.lectureProgress[lectureIndex].viewed = true
        } else {
            // Add new lecture progress
            courseProgress.lectureProgress.push({
                lectureId,
                viewed: true
            })
        }

        //if all lecture is completed
        let courseProgressLength = courseProgress.lectureProgress.filter((lectureProg) => lectureProg.viewed)

        const course = await Course.findById(courseId)

        if (course.lectures.length === courseProgressLength) course.completed = true

        await courseProgress.save()

        return res.status(200).json({
            message: "Lecture progress updated successfully"
        })
    } catch (error) {
        console.log(error);

    }
}

export const markAsCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id

        const courseProgress = await CourseProgress.findOne({courseId, userId});
        if (!courseProgress) res.status(404).json({ message: "Course progress not found" });

        courseProgress.lectureProgress.map((lectureProg) => lectureProg.viewed = true)
        courseProgress.completed = true;
        await courseProgress.save();

        return res.status(200).json({
            message: "Course marked as completed"
        })

    } catch (error) {
        console.log(error);
    }
}

export const markAsInCompleted = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.id

        const courseProgress = await CourseProgress.findOne({courseId, userId});
        if (!courseProgress) res.status(404).json({ message: "Course progress not found" });

        courseProgress.lectureProgress.map((lectureProgress) => lectureProgress.viewed = false)
        courseProgress.completed = false;
        await courseProgress.save();

        return res.status(200).json({
            message: "Course marked as incompleted"
        })

    } catch (error) {
        console.log(error);

    }
}