import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, CirclePlay } from "lucide-react";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "../../features/api/courseProgressApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseProgress = () => {
  const { courseId } = useParams();

  const [currentLecture, setCurrentLecture] = useState(null);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] =
    useCompleteCourseMutation();
  const [inCompleteCourse, { data: inCompleteData, isSuccess: inCompletedSuccess }] =
    useInCompleteCourseMutation();

  // ✅ toast effect
  useEffect(() => {
    if (completedSuccess && markCompleteData?.message) {
      toast.success(markCompleteData.message);
    }

    if (inCompletedSuccess && inCompleteData?.message) {
      toast.success(inCompleteData.message);
    }
  }, [
    completedSuccess,
    inCompletedSuccess,
    markCompleteData?.message,
    inCompleteData?.message,
  ]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load course details</p>;

  // ✅ safe destructure after loading
  const { courseDetails, progress, completed } = data;
  const { courseTitle, lectures = [] } = courseDetails;

  // ✅ initialize current lecture
  const initialLecture = currentLecture || lectures[0] || null;

  // check if lecture is completed
  const isLectureCompleted = (lectureId) => {
    return progress.some(
      (prog) => prog.lectureId === lectureId && prog.viewed
    );
  };

  const handleSelectLectureToWatch = (lecture) => {
    setCurrentLecture(lecture);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
    refetch();
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Course Title and Completion Toggle */}
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">{courseTitle}</h1>
        <Button className='cursor-pointer'
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
        >
          {completed ? (
            <div className="flex items-center">
              <CheckCircle2 className="mr-2" /> <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Player */}
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          {initialLecture ? (
            <>
              <video
                src={currentLecture?.videoUrl || initialLecture.videoUrl}
                controls
                className="w-full h-auto md:rounded-lg"
                onPlay={() =>
                  handleLectureProgress(
                    currentLecture?._id || initialLecture?._id
                  )
                }
              />
              <div className="mt-2">
                <h3 className="font-medium text-lg">
                  {`Lecture ${
                    lectures.findIndex(
                      (lec) =>
                        lec._id ===
                        (currentLecture?._id || initialLecture?._id)
                    ) + 1
                  } : ${
                    currentLecture?.lectureTitle || initialLecture.lectureTitle
                  }`}
                </h3>
              </div>
            </>
          ) : (
            <p>No lectures available.</p>
          )}
        </div>

        {/* Lecture List */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-1 border-gray-200 md:p-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="flex-1 overflow-y-auto">
            {lectures.map((lecture, idx) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform py-4 ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200"
                    : "dark:bg-gray-800"
                }`}
                onClick={() => handleSelectLectureToWatch(lecture)}
              >
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <CardTitle>{lecture.lectureTitle}</CardTitle>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="text-green-500 bg-green-200"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
