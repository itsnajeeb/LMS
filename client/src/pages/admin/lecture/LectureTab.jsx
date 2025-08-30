import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from "../../../components/ui/button"
import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'sonner'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "../../../features/api/courseApi"
import { useNavigate, useParams } from "react-router-dom"
import { Loader2 } from "lucide-react"
const LectureTab = () => {
  const MEDIA_API = "http://localhost:8080/api/v1/media";
  const param = useParams()
  const navigate = useNavigate()
  const { lectureId, courseId } = param;
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null)
  const [isFree, setIsFree] = useState(false)
  const [mediaProgress, setMediaProgress] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [btnDisabled, setBtnDisabled] = useState(true)

  const { data: lectureData } = useGetLectureByIdQuery(lectureId)
  const lecture = lectureData?.lecture
  
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle)
      setIsFree(lecture.isPreviewFree)
      setUploadVideoInfo(lecture.videoInfo)
    }
  }, [lecture])
  const [editLecture, { data, isSuccess, error, isLoading }] = useEditLectureMutation()
  const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveLectureMutation()
  const fileChangerHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file)
      try {
        setMediaProgress(true)
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total))
          }
        })

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id
          })
          setBtnDisabled(false);
          toast.success(res.data.message)
        }
      } catch (error) {
        console.log(error);
        toast.error("Video Upload failed")

      }
      finally {
        setMediaProgress(false)
      }
    }
  }

  const editlectureHandler = async () => {
    await editLecture({ lectureTitle, videoInfo: uploadVideoInfo, isPreviewFree: isFree, lectureId, courseId })
    navigate(`/admin/course/${courseId}/lecture`)
  }
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture Updated Successfully")
    }
    if (error) {
      toast.error(data?.message || "Lecture Updation failed ")
    }
  }, [isSuccess, error]);

  const removeLectureHandler = () => {
    removeLecture(lectureId)
    navigate(`/admin/course/${courseId}/lecture`)
  }
  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message)
    }
  }, [removeSuccess])
  return (
    <Card>
      <CardHeader className="flex flex-col space-y-1" >
        <CardTitle>Edit  Lecture</CardTitle>
        <CardDescription>Make Change and click save when done</CardDescription>
        <div className="cursor-pointer">
          <Button variant="destructive" className='cursor-pointer' onClick={removeLectureHandler} >
            {
              removeLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Please wait...</> : "Remove Lecture"
            }
          </Button>
        </div>
      </CardHeader>
      <CardContent className='space-y-5'>

        <div className="space-y-2 ">
          <Label>Title</Label>
          <Input type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Ex. Introduction to Javascript" />
        </div>

        <div className="space-y-2 ">
          <Label>Video<span className="text-red-800">*</span> </Label>
          <Input type="file"
            onChange={fileChangerHandler}
            accecpt="video/*"
            placeholder="Ex. Introduction to Javascript" className='w-fit' />
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" checked={isFree} onCheckedChange={setIsFree} className='cursor-pointer' />
          <Label htmlFor="airplane-mode">is this video FREE</Label>
        </div>

        {
          mediaProgress && (
            <div>
              <Progress value={uploadProgress} />
              <p>{uploadProgress}% uploaded</p>
            </div>
          )
        }
        <div className="mt-4">
          <Button onClick={editlectureHandler} disabled={mediaProgress}>
            {
              isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Please wait...</> : "Update Lecture"
            }
          </Button>
        </div>

      </CardContent>
    </Card >
  )
}

export default LectureTab