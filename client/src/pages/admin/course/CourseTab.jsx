import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardTitle, CardHeader, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../../../components/ui/button'
import { RichTextEditor } from '../../../components/RichTextEditor'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useNavigate, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useEditCourseMutation } from '../../../features/api/courseApi'
import { toast } from 'sonner'

export const CourseTab = () => {
    const navigate = useNavigate()
    const params = useParams()
    const courseId = params.courseId
    const [previewThumbnail, setPreviewThumbnail] = useState();
    const [input, setInput] = useState({
        courseTitle: "",
        subtitle: "",
        category: "",
        description: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    });

    const [editCourse, { data, isLoading, isSuccess, error, }] = useEditCourseMutation()
    const changeEvenHandler = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }
    const selectCategory = (value) => {
        setInput({ ...input, category: value })
    }
    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value })
    }
    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file })
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file)
        }
    }
    const updateCourseHandler = async () => {
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle)
        formData.append("subTitle", input.subtitle)
        formData.append("description", input.description)
        formData.append("category", input.category)
        formData.append("courseLevel", input.courseLevel)
        formData.append("coursePrice", input.coursePrice)
        formData.append("courseThumbnail", input.courseThumbnail)
        await editCourse({formData,courseId})
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course Edited Successfully")
            navigate("/admin/course")
        }
        if (error) {
            toast.error(data?.message || "Failed to updated")
        }
    }, [isSuccess, error])
    // const isLoading = false;
    const isPublished = false
    return (
        <Card className="mb-14">
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>Make Changes to your course here. click save when you're done</CardDescription>
                </div>
                <div className='flex gap-4'>
                    <Button variant="outline" size={"sm"} className="cursor-pointer">{isPublished ? "Un-Publish" : "Publish"}</Button>
                    <Button className="cursor-pointer" size={"sm"}>Remove Course</Button>
                </div>
            </CardHeader>

            <CardContent>
                <div className='space-y-4 mt-5'>
                    <div className='space-y-2'>
                        <Label>Title</Label>
                        <Input
                            value={input.courseTitle}
                            onChange={changeEvenHandler}
                            type="text"
                            name="courseTitle"
                            placeholder="Ex. Fullstack Developer"
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Subtitle</Label>
                        <Input
                            value={input.subtitle}
                            onChange={changeEvenHandler}
                            type="text"
                            name="subtitle"
                            placeholder="Ex. Become a Fullstack Developer from zero to hero"
                        />
                    </div>
                    <div className='space-y-2'>
                        <Label>Description</Label>
                        <RichTextEditor input={input} setInput={setInput} />
                    </div>

                    <div className='flex items-center gap-5'>
                        <div className='space-y-2'>
                            <Label>Category</Label>
                            <Select onValueChange={selectCategory}>
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

                        <div className='space-y-2'>
                            <Label >Course Level</Label>
                            <Select onValueChange={selectCourseLevel}>
                                <SelectTrigger className="w-[250px] cursor-pointer">
                                    <SelectValue placeholder="Select Course Level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Begginer">Begginer</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Advance">Advance</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='space-y-2'>
                            <Label>Price in (INR)</Label>
                            <Input
                                type="number"
                                name="coursePrice"
                                value={input.coursePrice}
                                onChange={changeEvenHandler}
                                placeholder="Ex. 199"
                            />
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <Label>Course Thumbnail</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={selectThumbnail}
                            className="w-fit"
                        />
                        {previewThumbnail && <img src={previewThumbnail} className='w-64 rounded h-40 my-2 ' alt='Course Thumbnail' />}
                    </div>

                    <div className='flex gap-5 mt-10'>
                        <Button variant="outline" className="cursor-pointer px-7" onClick={() => navigate('/admin/course')}>Cancel</Button>
                        <Button className="cursor-pointer px-7" disabled={isLoading} onClick={updateCourseHandler}>
                            {isLoading ? <><Loader2 className='w-4 h-4  animate-spin' />Please wait...</> : "Save"}
                        </Button>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}
