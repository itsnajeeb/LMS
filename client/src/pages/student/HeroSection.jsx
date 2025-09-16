import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import illustration from '../../assets/illustrate.png'

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:justify-between">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl text-center lg:text-left"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find the{" "}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-500 bg-clip-text text-transparent">
              Best Courses
            </span>{" "}
            for You
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-200 dark:text-gray-400">
            Discover, learn, and upskill with our wide range of professional
            courses designed to boost your career.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={searchHandler}
            className="mt-8 flex w-full max-w-xl items-center overflow-hidden rounded-full bg-white shadow-lg dark:bg-gray-800"
          >
            <div className="flex items-center px-4 text-gray-500 dark:text-gray-400">
              <Search className="h-6 w-6" />
            </div>
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-0 bg-transparent px-3 py-6 text-gray-900 placeholder-gray-500 focus-visible:ring-0 dark:text-gray-100 dark:placeholder-gray-400"
            />
            <Button
              type="submit"
              className="rounded-r-full bg-blue-600 px-10 py-6 font-semibold hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer"
            >
              Search
            </Button>
          </form>

          {/* Explore Button */}
          <div className="mt-6 flex justify-center gap-4 lg:justify-start">
            <Button
              onClick={() => navigate(`/course/search?query`)}
              className="rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600"
            >
              Explore Courses
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/about")}
              className="rounded-full border-white hover:bg-white hover:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Right Section (Illustration / Image) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 flex justify-center lg:mt-0 lg:ml-10 lg:flex-shrink-0"
        >
          <img
            src={illustration}
            alt="Learning Illustration"
            className="w-[500px] max-w-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
