import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from "@/components/ui/input"
import { Loader2 } from 'lucide-react'
import Course from './Course';

const Profile = () => {
    const isLoading = false;
    const enrolledCourses = [1, 2]
    return (
        <div className='max-w-4xl py-10  mx-auto px-5 '>
            <h1 className='font-bold text-2xl mb-5 text-center md:text-left'>PROFILE</h1>
            <div className='flex flex-col items-center md:flex-row gap-5'>

                <div>
                    <Avatar className="h-24 w-24 md:h-32 md:w-32">
                        <AvatarImage src="https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=" />
                    </Avatar>
                </div>

                <div className='flex flex-col justify-center place-items-center gap-1 md:place-items-start '>
                    <div className='flex'>
                        <h1 className='font-semibold mr-2 text-gray-900 dark:text-gray-100'>Name :<span className='text-gray-700 font-normal dark:text-gray-300'> Najeeb</span></h1>
                    </div>

                    <div className='flex'>
                        <h1 className='font-semibold mr-2 text-gray-900 dark:text-gray-100'>Email :<span className='text-gray-700 font-normal dark:text-gray-300'> iamnajeeb@gmail.com</span> </h1>
                    </div>

                    <div className='flex'>
                        <h1 className='font-semibold mr-2 text-gray-900 dark:text-gray-100'>Role :<span className='text-gray-700 font-normal dark:text-gray-300'> INSTRUCTOR</span> </h1>
                    </div>

                    <div className='mt-2 md:mt-1'>
                        <Dialog >
                            <DialogTrigger asChild>
                                <Button size="sm" className="mt-2 cursor-pointer px-4 rounded-md">Edit Profile</Button>

                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Profile</DialogTitle>
                                    <DialogDescription>
                                        Make changes to your profile here. click save changes when you're done
                                    </DialogDescription>
                                </DialogHeader>
                                <div className='grid gap-4 py-4'>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label>Name </Label>
                                        <Input type="text" placeholder="Name" className="col-span-3" />
                                    </div>
                                    <div className='grid grid-cols-4 items-center gap-4'>
                                        <Label>Profile Image </Label>
                                        <Input type="file" accept="image/*" placeholder="Name" className="col-span-3" />
                                    </div>

                                </div>

                                <DialogFooter>
                                    <Button className="cursor-pointer" disabled={isLoading}>
                                        {isLoading ? <div className='flex justify-baseline items-end'><Loader2 className='mr-2 h-4 w-4  animate-spin' /> <p>Saving...</p></div> : "Save Changes"}
                                    </Button>

                                </DialogFooter>

                            </DialogContent>
                        </Dialog>

                    </div>
                </div>
            </div>
            <div className='my-16'>
                <h1 className='font-semibold text-xl mb-5'>Courses You'are Enrolled in</h1>
                {
                    isLoading ? <MyEnrolledCoursesSkeleton /> :
                        <div className='grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-4 my-5'>
                            {
                                enrolledCourses.length === 0 ? <h1 className='font-bold text-lg mt-5 text-center'>You haven't enrolled yet</h1> :
                                    enrolledCourses.map((course, index) => <Course key={index} />)
                            }
                        </div>
                }


            </div>
        </div>

    )
}

export default Profile

const MyEnrolledCoursesSkeleton = () => (
    <div className='grid grid-cols-1 gap-4 
    sm:grid-cols-2 md:grid-cols-3 '>
        {[...Array(3)].map((_, index) => (
            <div key={index}
                className='bg-gray-300 rounded-lg h-40 animate-pulse
            dark:bg-gray-700 '></div>
        ))}
    </div>
)