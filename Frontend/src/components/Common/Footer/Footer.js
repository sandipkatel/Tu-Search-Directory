import React from "react";
import AnimatedElement from "../Animation/AnimatedElement";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="relative bottom-0 bg-blue-700">
      <footer className="bg-blue-700 text-white py-5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* About TU Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">Tribhuvan University</h3>
              <p className="text-gray-200">
                Nepal’s premier institution of higher education, dedicated to
                academic excellence, research, and innovation since 1959.
              </p>
            </div>

            {/* Quick Links Section */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-200">
                <li>
                  <Link
                    href="/about"
                    className="transition delay-150 duration-300 ease-in-out hover:translate-x-1 hover:scale-110 hover:underline ..."
                  >
                    About TU
                  </Link>
                </li>
                <li>
                  <Link
                    href="/departments"
                    className="transition delay-150 duration-300 ease-in-out hover:translate-x-1 hover:scale-110 hover:underline ..."
                  >
                    Departments
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admissions"
                    className="transition delay-150 duration-300 ease-in-out hover:translate-x-1 hover:scale-110 hover:underline ..."
                  >
                    Admissions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/research"
                    className="transition delay-150 duration-300 ease-in-out hover:translate-x-1 hover:scale-110 hover:underline ..."
                  >
                    Research
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-200">
                <li>
                  <Link
                    target="_blank"
                    href="https://tu.edu.np/downloads"
                    className="transition delay-150 duration-300 ease-in-out hover:translate-x-1 hover:scale-110 hover:underline ..."
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://tu.edu.np/events"
                    className="transition delay-150 duration-300 ease-in-out hover:translate-x-1 hover:scale-110 hover:underline ..."
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://tu.edu.np/news"
                    className="transition delay-150 duration-300 ease-in-out hover:translate-x-1 hover:scale-110 hover:underline ..."
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    target="_blank"
                    href="https://tu.edu.np/notices"
                    className="transition delay-150 duration-300 ease-in-out hover:translate-x-1 hover:scale-110 hover:underline ..."
                  >
                    Notices
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us Section */}
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="https://x.com/tu_information"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:underline ..."
                >
                  Twitter
                </a>
                <a
                  href="https://www.linkedin.com/company/tribhuvan-university/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:underline ..."
                >
                  LinkedIn
                </a>
                <a
                  href="https://www.facebook.com/tribhuvan.viswavidyalaya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:underline ..."
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-200">
            <p>
              &copy; {new Date().getFullYear()} Tribhuvan University. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
