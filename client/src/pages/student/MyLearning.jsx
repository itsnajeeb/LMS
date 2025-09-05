import React from 'react'
import Course from './Course';
import { useLoadUserQuery } from '../../features/api/authApi';

const MyLearning = () => {
    const { data, isLoading } = useLoadUserQuery();
    const { user } = data || {};

    const enrolledCourses = user?.enrolledCourse || [];
    console.log(enrolledCourses);
    
    return (
        <div className='max-w-4xl mx-auto my-10 px-4'>
            <h1 className='text-2xl font-bold'>MY LEARNING</h1>
            <div className='my-5'>
                {
                    isLoading ? (<MyLearningSkelton />)
                        : enrolledCourses.length === 0 ? (<p>You are not enrolled any course yet</p>)
                            : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {enrolledCourses.map((course, index) => (
                                    <Course key={index} course={course} />)
                                )}
                            </div>
                }
            </div>
        </div>
    )
}

export default MyLearning

const MyLearningSkelton = () => (
    <div className='grid grid-cols-1 gap-4 
    sm:grid-cols-2 md:grid-cols-3 '>
        {[...Array(3)].map((_, index) => (
            <div key={index}
                className='bg-gray-300 rounded-lg h-40 animate-pulse
            dark:bg-gray-700 '></div>
        ))}
    </div>
)