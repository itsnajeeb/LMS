import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '../../../features/api/courseApi'
import { toast } from 'sonner'
import Lectures from './Lectures'
const CreateLecture = () => {
    const navigate = useNavigate();
    const [lectureTitle, setLectureTitle] = useState("");
    const params = useParams();
    const courseId = params.courseId;
    const [createLecture, { data, isSuccess, error, isLoading }] = useCreateLectureMutation()

    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId });
        setLectureTitle("")
    }
    const {
        data: lectureData,
        isLoading: lectureLoading,
        isError: lectureError,
        refetch,
    } = useGetCourseLectureQuery(courseId)
    console.log("COurse lecture in create lecture");

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Lecture Created Successfully.")
            refetch()
        }
        if (error) {
            toast.error(error.data?.message || "Lecture Creation failed")
        }
    }, [isSuccess, error]);

    return (
        <div className='flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl'>Lets add lecture, add some basic details for your new lecture </h1>
                <p className='text-sm'>Odio laudantium ab laboriosam recusandae illum vel voluptas, fuga quibusdam et enim animi porro necessitatibus accusamus quis mollitia culpa cupiditate harum fugit.</p>
            </div>

            <div className='space-y-7'>
                <div className='flex flex-col gap-2.5'>
                    <Label>Title</Label>
                    <Input autoComplete="off"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        type="text"
                        placeholder="Your Lecture Title"
                        name="courseTitle" />
                </div>


                <div className='flex gap-4'>
                    <Button variant="outline" className="px-7 cursor-pointer" onClick={() => navigate(`/admin/course/${courseId}`)} >Back to Course</Button>
                    <Button disabled={isLoading} onClick={createLectureHandler}
                        className="cursor-pointer px-7"  >
                        {isLoading ? <><Loader2 className='w-4 h-4 animate-spin' />Please Wait...</> : "Create Lecture"}
                    </Button>
                </div>

                <div className='mt-10'>
                    {
                        lectureLoading ? (<p>Lectures loading...</p>)
                            : lectureError ? (<p>Failed to load lectures</p>)
                                : lectureData.lectures.length === 0 ? (<p>No lectures available</p>)
                                    : lectureData.lectures.map((lecture, index) => (
                                        <Lectures key={lecture._id} lecture={lecture} courseId={courseId} index={index} />
                                    ))
                    }
                </div>

            </div>

        </div>
    )
}

export default CreateLecture