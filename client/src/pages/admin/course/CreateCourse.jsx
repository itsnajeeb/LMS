import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '../../../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useCreateCourseMutation } from '../../../features/api/courseApi'
import { toast } from 'sonner'
export const CreateCourse = () => {
    const [courseTitle, setCourseTitle] = useState("")
    const [category, setCategory] = useState("")

    const [createCourse, { data, isLoading, error, isSuccess }] = useCreateCourseMutation()

    const navigate = useNavigate();

    const getCourseCategory = (value) => {
        setCategory(value)
    }

    const createCourseHandler = async () => {
        await createCourse({ courseTitle, category })
        setCategory("")
        setCourseTitle("")
        navigate('/admin/course')

    }

    //for displaying toast
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course Created Successfully.")
        }
        if (error) {
            console.log(data);

            toast.error(data?.message || "Course creation failed. Please try again")
        }
    }, [isSuccess, error])
    return (
        <div className='flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl'>Lets add course, add some basic details for your new course </h1>
                <p className='text-sm'>Odio laudantium ab laboriosam recusandae illum vel voluptas, fuga quibusdam et enim animi porro necessitatibus accusamus quis mollitia culpa cupiditate harum fugit.</p>
            </div>

            <div className='space-y-7'>
                <div className='flex flex-col gap-2.5'>
                    <Label>Title</Label>
                    <Input autoComplete="off"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        type="text"
                        placeholder="Your Course Name"
                        name="courseTitle" />
                </div>

                <div className='flex flex-col gap-2.5'>
                    <Label>Select Category</Label>
                    <Select onValueChange={getCourseCategory}>
                        <SelectTrigger className="w-[250px] cursor-pointer">
                            <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                            <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                            <SelectItem value="Fullstack Development">Fullstack Development</SelectItem>
                            <SelectItem value="MEARN Stck Development">MEARN Stck Development</SelectItem>
                            <SelectItem value="JavaScript">JavaScript </SelectItem>
                            <SelectItem value="Python">Python</SelectItem>
                            <SelectItem value="Docker">Docker</SelectItem>
                            <SelectItem value="MongoDB">MongoDB</SelectItem>
                            <SelectItem value="HTML">HTML</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex gap-4'>
                    <Button variant="outline" className="px-7 cursor-pointer" onClick={() => navigate('/admin/course')}>Back</Button>
                    <Button onClick={createCourseHandler}
                        className="cursor-pointer px-7" disabled={isLoading} >
                        {
                            isLoading ? <><Loader2 className=' w-4 h-4 animate-spin' />Creating... </> : "Create"
                        }
                    </Button>
                </div>
            </div>

        </div>
    )
}
