import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const COURSE_API = "http://localhost:8080/api/v1/course"
export const courseApi = createApi({
    reducerPath: 'courseApi',
    tagTypes: ['Refetch_Creator_course', 'Refetch_Lecture'],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include"
    }),

    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: '/createCourse',
                method: "POST",
                body: { courseTitle, category }
            }),
            invalidatesTags: ['Refetch_Creator_course']
        }),
        getCreatorCourse: builder.query({
            query: () => ({
                url: "",
                method: "GET",
            }),
            providesTags: ['Refetch_Creator_course']
        }),
        editCourse: builder.mutation({
            query: ({ formData, courseId }) => ({
                url: `/${courseId}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ['Refetch_Creator_course']
        }),
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET",
            })
        }),
        getCourseLecture: builder.query({
            query: (courseId) => ({
                url: `${courseId}/lecture`,
                method: "GET",
            }),
            providesTags: ['Refetch_Lecture']
        }),

        createLecture: builder.mutation({
            query: ({ lectureTitle, courseId }) => ({
                url: `${courseId}/lecture`,
                method: "POST",
                body: { lectureTitle },
            }),
            invalidatesTags: ['Refetch_Lecture']
        }),

        editLecture: builder.mutation({
            query: ({ lectureTitle, videoInfo, isPreviewFree, courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: "POST",
                body: { lectureTitle, videoInfo, isPreviewFree }
            }),
            invalidatesTags: ['Refetch_Lecture']
        }),

        removeLecture: builder.mutation({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Refetch_Lecture']
        }),
        getLectureById : builder.query({
            query:(lectureId)=>({
                    url:`/lecture/${lectureId}`,
                    method:"GET"
            }),
        })

    })
})

export const {
    useCreateCourseMutation,
    useGetCreatorCourseQuery,
    useEditCourseMutation,
    useGetCourseByIdQuery,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,
} = courseApi