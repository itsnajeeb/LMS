import express from 'express'
import { createCourse, editCourse, getCreatorCourses } from '../controllers/course.controller.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
import upload from '../utils/multer.js'
const router = express.Router()

router.route('/createCourse').post(isAuthenticated, createCourse)
router.route('/').get(isAuthenticated, getCreatorCourses)
router.route('/:courseId').put(isAuthenticated, upload.single("courseThumbnail"), editCourse)

export default router