import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Course from "./Course";
import { useGetPublisedCourseQuery } from "../../features/api/courseApi";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15, // stagger by index
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Courses = () => {
  const { data, isLoading, isError } = useGetPublisedCourseQuery();

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Oops! Something went wrong while fetching courses.
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Please try again later.
        </p>
      </div>
    );

  return (
    <section className="bg-gray-50 dark:bg-[#141414] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Our Courses
        </h2>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.course && data.course.length > 0 ? (
                data.course.map((course, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={cardVariants}
                  >
                    <Course course={course} />
                  </motion.div>
                ))
              ) : (
                <EmptyState />
              )}
        </div>
      </div>
    </section>
  );
};

export default Courses;

// Skeleton Loader
const CourseSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <Skeleton className="h-40 w-full rounded-t-2xl" />
      <div className="space-y-4 p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
};

// Empty State when no course exists
const EmptyState = () => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <img
        src="/images/empty-courses.svg"
        alt="No courses"
        className="mb-6 h-40"
      />
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        No Courses Available
      </h3>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        Check back later or explore other categories.
      </p>
      <Button
        className="mt-6 rounded-full"
        onClick={() => window.location.reload()}
      >
        Refresh
      </Button>
    </div>
  );
};
