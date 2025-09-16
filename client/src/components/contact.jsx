import React from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const Contact = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-[#141414] flex items-center justify-center px-6 py-16">
      {/* Floating Question Marks */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-6xl font-extrabold text-blue-200 dark:text-blue-900 select-none"
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: [0, -20, 0],
            opacity: 0.5,
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.6,
          }}
          style={{
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
        >
          ?
        </motion.span>
      ))}

      {/* Card */}
      <div className="relative z-10 mx-auto w-full max-w-4xl rounded-2xl bg-white shadow-xl dark:bg-gray-900 p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Info */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <div className="flex justify-center md:justify-start mb-6">
            <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
              <User className="h-10 w-10 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Need Help?
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We’d love to hear from you! Whether you have a question about
            courses, payments, or anything else, our team is ready to help you.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 italic">
            We typically reply within 24 hours.
          </p>
        </div>

        {/* Right: Contact Form */}
        <div>
          <form className="space-y-4">
            <Input placeholder="Your Name" className="py-6" />
            <Input placeholder="Your Email" type="email" className="py-6" />
            <Textarea
              placeholder="Your Message"
              className="min-h-[150px] resize-none"
            />
            <Button className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-lg">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
