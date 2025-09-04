import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({ course }) => {
    return (
        <div className='flex flex-col md:flex-row  items-start md:items-center border-b border-gray-300 py-4 gap-4 '>
            <Link to={`/course-detail/${course._id}`} className='flex flex-col md:flex-row gap-4 w-full md:w-auto'>
                <img src={course?.courseThumbnail || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAOJDNhScfAiq7Gy01zQizSsCxscPXpE_f_w&s'} alt="Image"
                    className='h-32 w-full md:w-60 object-cover rounded' />

                <div className='flex flex-col gap-1'>
                    <h1 className='font-bold text-lg md:text-xl'>{course?.courseTitle}</h1>
                    <p className='text-sm text-gray-600'>{course?.subTitle}</p>
                    <p className='text-sm text-gray-700'>Instructor : <span className='font-semibold'>{course?.creator?.name}</span></p>
                    <Badge className='w-fit mt-2 md:mt-0'>{course?.courseLevel}</Badge>
                    <h1 className='font-bold text-base md:text-lg'>&#8377;{course?.coursePrice}</h1>
                </div>
            </Link>
            <div className='mt-4 md:mt-0 md:text-right w-full md:w-auto'>
            </div>


        </div>
    )
}

export default SearchResult 