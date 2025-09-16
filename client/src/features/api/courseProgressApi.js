import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const COURSE_PROGRESS_API = "https://lms-host-c8ig.onrender.com/api/v1/progress"
export const courseProgressApi = createApi({
    reducerPath: 'courseProgressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_PROGRESS_API,
        credentials: "include"
    }),

    endpoints: (builder) => ({
        getCourseProgress: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET",
            }),
        }),
        updateLectureProgress: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}/view`,
                method: "POST"
            })
        }),
        completeCourse: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/completed`,
                method: "POST"
            })
        }),
        inCompleteCourse: builder.mutation({
            query: (courseId) => ({
                url: `/${courseId}/incompleted`,
                method: "POST"
            })
        })
    })

})

export const {
    useGetCourseProgressQuery,
    useUpdateLectureProgressMutation,
    useCompleteCourseMutation,
    useInCompleteCourseMutation
} = courseProgressApi