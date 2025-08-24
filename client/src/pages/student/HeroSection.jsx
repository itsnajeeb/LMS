import { Input } from "@/components/ui/input"

import React from 'react'
import { Button } from "../../components/ui/button"

const HeroSection = () => {
    return (
        <div className='relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 px-4 py-20 text-center'>
            <div className='max-w-3xl mx-auto '>
                <h1 className='text-white text-4xl font-bold mb-4'>Find the Best Courses for You </h1>
                <p className='text-gray-200 dark:text-gray-400 mb-8'>Discover, Learn, and Upskill with our wide range of courses</p>

                <form action="" className="flex bg-white max-w-xl justify-center items-center  rounded-full shadow-lg
                  border-none outline-none mx-auto mb-6
                  dark:bg-gray-800 overflow-hidden  ">
                    <Input
                        placeholder="Search Courses"
                        type="text"
                        className="outline-none border-none focus-visible:ring-0 px-5 py-3 text-lg font-semibold text-gray-900
                        placeholder-gray-400
                        dark:text-gray-100 
                        dark:placeholder-gray-500 "
                    />
                    <Button 
                    className="bg-blue-600 border-none rounded-r-full py-6 cursor-pointer w-24 font-semibold  shadow-lg
                    hover:bg-blue-700
                    dark:bg-blue-700
                    dark:hover:bg-blue-800">Search</Button>

                </form>
                <Button className="bg-white text-blue-700 rounded-full 
                hover:bg-gray-200
                dark:bg-gray-800 cursor-pointer">Explore Courses</Button>
            </div>
        </div>
    )
}

export default HeroSection