import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='flex gap-12 '>
            <div className='hidden lg:block w-[250px] sm:w-[300px] space-y-8 border border-gray-300 bg-[#f0f0f0] p-5 sticky top-0 h-[calc(100vh-64px)]
    dark:border-gray-700'>
                <div className='space-y-4   '>
                    <Link to={"dashboard"} className='flex gap-2 font-semibold'>
                        <ChartNoAxesColumn size={22} />
                        <h1>Dashboard</h1>
                    </Link>
                    <Link to={"course"} className='flex gap-2 font-semibold'>
                        <SquareLibrary size={22} />
                        <h1>Courses</h1>
                    </Link>
                </div>
            </div>

            <div className=' w-full mt-8'>
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar