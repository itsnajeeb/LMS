import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, School } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-blue-600 dark:text-white">
              <School className="h-6 w-6" />
              E-Learning
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Learn, grow, and achieve your goals with our curated courses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-800 dark:text-gray-200">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About Us</Link></li>
              <li><Link to="/courses" className="hover:text-blue-600 dark:hover:text-blue-400">Courses</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-blue-600 dark:hover:text-blue-400">FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-800 dark:text-gray-200">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/web-development" className="hover:text-blue-600 dark:hover:text-blue-400">Web Development</Link></li>
              <li><Link to="/category/data-science" className="hover:text-blue-600 dark:hover:text-blue-400">Data Science</Link></li>
              <li><Link to="/category/design" className="hover:text-blue-600 dark:hover:text-blue-400">Design</Link></li>
              <li><Link to="/category/marketing" className="hover:text-blue-600 dark:hover:text-blue-400">Marketing</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-800 dark:text-gray-200">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                <Facebook />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-300">
                <Twitter />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-400">
                <Instagram />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-600">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          © {new Date().getFullYear()} E-Learning. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
