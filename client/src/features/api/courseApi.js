import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const COURSE_API = "https://lms-host-c8ig.onrender.com/api/v1/course"
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

        getPublisedCourse: builder.query({
            query: () => ({
                url: "/published-courses",
                method: "GET"
            })
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
        getLectureById: builder.query({
            query: (lectureId) => ({
                url: `/lecture/${lectureId}`,
                method: "GET"
            }),
        }),
        getSearchCourse: builder.query({
            query: ({ searchQuery, categories, sortByPrice }) => {
                
                //build query string
                let queryString = `/search?query=${encodeURIComponent, searchQuery}`;
                //append categories
                if (categories && categories.length > 0) {
                    const categoriesString = categories.map(encodeURIComponent).join(",");
                    queryString += `&categories=${categoriesString}`;
                }
                //append sort by price is available
                if (sortByPrice) {
                    queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`
                }
                
                return {
                    url: queryString,
                    method: "GET"
                }
            }
        }),
        publishCourse: builder.mutation({
            query: ({ courseId, query }) => ({
                url: `/${courseId}?publish=${query}`,
                method: "PATCH",
            })

        }),


    })
})

export const {
    useCreateCourseMutation,
    useGetPublisedCourseQuery,
    useGetCreatorCourseQuery,
    useEditCourseMutation,
    useGetCourseByIdQuery,
    useCreateLectureMutation,
    useGetCourseLectureQuery,
    useEditLectureMutation,
    useRemoveLectureMutation,
    useGetLectureByIdQuery,
    usePublishCourseMutation,
    useGetSearchCourseQuery,
} = courseApi