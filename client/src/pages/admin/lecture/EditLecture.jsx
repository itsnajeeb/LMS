import { ArrowLeft } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab'

const EditLecture = () => {
    const param = useParams()
    const courseId = param.courseId
    return (
        <div className='flex  justify-between mb-5  flex-col space-y-5'>
            <div className='flex items-center gap-2 flex-row'>
                <Link to={`/admin/course/${courseId}/lecture`}>
                    <Button size='icon' variant="outline" className='rounded-full cursor-pointer'>
                        <ArrowLeft size={16} />
                    </Button>
                </Link>

                <h1 className='font-bold text-xl'>Update Your Lecture</h1>
            </div>

            <div>
                <LectureTab/>
            </div>

        </div>
    )
}

export default EditLecture