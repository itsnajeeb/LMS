import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Course = ({ course }) => {

    return (
        <Card className="overflow-hidden rounded-lg bg-white shadow-lg 
    hover:shadow-2xl hover:scale-105 transform transition-all duration-300
    dark:bg-gray-800 py-0 gap-0" >
            <div className="relative gap-0 ">
                <img
                    alt="Course thumbnail"
                    className="w-full h-36 object-cover rounded-t-lg"
                    src={course.courseThumbnail} />

            </div>
            <CardContent className="px-4 py-5 space-y-1">
                <h1 className="hover:underline font-bold text-lg truncate py-1">
                    {course.courseTitle}
                </h1>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src= {course.creator?.profileUrl || 'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='}/>
                        </Avatar>
                        <h1 className="text-sm font-semibold">{course?.creator?.name || "Created by Admin"}</h1>
                    </div>
                    <Badge variant="default |outline | secondary | destructive"
                        className="bg-blue-700 text-white py-1 px-4 rounded-full text-sm 
                    hover:bg-gray-700"
                    ><p>{course?.courseLevel}</p></Badge>


                </div>
                <div className="font-bold text-lg">
                    <span>&#8377;{course.coursePrice}</span>
                </div>
            </CardContent>
        </Card>

    )
}

export default Course