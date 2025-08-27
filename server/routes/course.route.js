import express from 'express'
import { createCourse } from '../controllers/course.controller.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
const router = express.Router()

router.route('/createCourse').post(isAuthenticated, createCourse)

export default router