import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from "@/components/ui/badge"
import { Link, useNavigate } from 'react-router-dom'
import { Edit } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
} from "@/components/ui/table"
import { useGetCreatorCourseQuery } from '../../../features/api/courseApi'
const CourseList = () => {

    const navigate = useNavigate()

    const { data, isLoading } = useGetCreatorCourseQuery()

    if (isLoading) return <h1>Data Loading...</h1>


    return (
        <div className='mx-5'>
            <Button><Link to={'create-course'}>Create a new course</Link></Button>
            <Table className="mt-8 w-11/12">
                <TableCaption>A list of your recent courses.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        data.course.map((course) => {
                            return (
                                <TableRow key={course._id}>
                                    <TableCell className="font-medium">{course?.coursePrice || "NA"}</TableCell>
                                    <TableCell ><Badge>{course.isPublished ? "Published" : "Draft"}</Badge></TableCell>
                                    <TableCell >{course.courseTitle}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size='sm' className="cursor-pointer" onClick={()=> navigate(`${course._id}`)}><Edit /></Button>
                                    </TableCell>
                                </TableRow>
                            )

                        })
                    }

                </TableBody>

                {/* <TableFooter className="py-5">
                    <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell className="text-right">$1020.00</TableCell>
                    </TableRow>
                </TableFooter> */}
            </Table>
        </div>
    )
}

export default CourseList