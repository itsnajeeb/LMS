import { BadgeInfo, Lock, PlayCircle } from 'lucide-react'
import ReactPlayer from "react-player";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/Separator"
import { Button } from '../../components/ui/button'
import ByCourseButton from '../../components/ByCourseButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCourseDetailWithStatusQuery } from '../../features/api/purchaseApi'
const CourseDetails = () => {
    const navigate = useNavigate()
    const param = useParams()
    const courseId = param.courseId

    const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId)

    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>Failed to load course details</h1>

    const { course, purchased } = data;
    

    const handleContinueCourse = () => {
        navigate(`/course-progress/${courseId}`)
    }
    return (
        <div className=' space-y-5'>
            <div className=' bg-[#101010] text-white'>
                <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
                    <h1 className='font-bold text-2xl md:text-3xl'>{course?.courseTitle}</h1>
                    <p className='text-base md:text-lg'>Course Sub-Title</p>
                    <p>Created By{" "} <span className='text-[#C0C4FC]'>{course?.creator.name}</span></p>
                    <div className='flex items-center gap-2 text-sm'>
                        <BadgeInfo size={16} />
                        <p>Last Updated {course?.createdAt.split("T")[0]}</p>
                    </div>
                    <p>Studnet Enroll : {course?.enrolledStudents.length}</p>
                </div>
            </div>


            <div className='max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10'>
                <div className='w-full lg:w-1/2 space-y-5'>
                    <h1 className='font-bold text-xl md:text-2xl mb-1 '>Description</h1>
                    <p className='text-sm mb-5' dangerouslySetInnerHTML={{ __html: course.description }} />

                    <Card>
                        <CardHeader>
                            <CardTitle>Course Content</CardTitle>
                            <CardDescription>{course.lectures.length}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {
                                course.lectures.map((lecture, idx) =>
                                (
                                    <div key={idx} className='flex  items-center gap-2'>
                                        <span>
                                            {
                                                true ? (<PlayCircle size={14} />) : <Lock size={14} />
                                            }
                                        </span>
                                        <p>{lecture.lectureTitle}</p>

                                    </div>
                                )
                                )
                            }
                        </CardContent>
                    </Card>

                </div>



                <div className='w-full lg:w-1/3 '>
                    <Card className="gap-1 ">
                        <CardContent className="px-4  py-2 flex flex-col ">
                            <div className='w-full aspect-video mb-4 ' >

                                <ReactPlayer
                                    src={course?.lectures[0].videoUrl}
                                    controls
                                    width="100%"
                                    height="100%"
                                    // playing={false}   // autoplay band rakho
                                    // muted={true}      // muted start karne se controls unlock ho jate hain
                                />
                            </div>
                            <h1>{course?.lectures?.[0]?.lectureTitle}</h1>
                            <Separator className='my-2' />
                            <h1 className='text-lg md:text-xl font-semibold mt-4 -mb-2'>Course Price</h1>
                        </CardContent>

                        <CardFooter className='flex justify-center p-4'>
                            {
                                purchased ?
                                    <Button className="w-full" onClick={handleContinueCourse}>Continue Course</Button>
                                    : <ByCourseButton courseId={courseId} />
                            }
                        </CardFooter>

                    </Card>

                </div>
            </div>

        </div>
    )
}

export default CourseDetails