import { ChartNoAxesColumn, SquareLibrary } from 'lucide-react'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className="hidden lg:block fixed left-0 top-16 
               w-[250px] sm:w-[300px] h-[calc(100vh-64px)]
               space-y-8 border border-gray-300 bg-[#f0f0f0] p-5 
               dark:border-gray-700"
            >
                <div className="space-y-4">
                    <Link to="dashboard" className="flex gap-2 font-semibold">
                        <ChartNoAxesColumn size={22} />
                        <h1>Dashboard</h1>
                    </Link>
                    <Link to="course" className="flex gap-2 font-semibold">
                        <SquareLibrary size={22} />
                        <h1>Courses</h1>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div
                className="flex-1 mt-8  mx-2 lg:ml-[300px] px-5 md:px-10  overflow-y-auto"
            >
                <Outlet />
            </div>
        </div>



    )
}

export default Sidebar