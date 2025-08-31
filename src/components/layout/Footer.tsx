import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              CareerNavigator
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Guiding students to successful tech careers with curated resources, roadmaps, and
              industry insights.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 p-2 rounded-lg link-hover-border"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 p-2 rounded-lg link-hover-border"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 p-2 rounded-lg link-hover-border"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-500 dark:text-gray-400">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dsa-sheets"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 link-hover-border px-2 py-1 rounded"
                >
                  DSA Sheets
                </Link>
              </li>
              <li>
                <Link
                  to="/roadmaps"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 link-hover-border px-2 py-1 rounded"
                >
                  Roadmaps
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 link-hover-border px-2 py-1 rounded"
                >
                  Interview Questions
                </Link>
              </li>
              <li>
                <Link
                  to="/career-paths"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 link-hover-border px-2 py-1 rounded"
                >
                  Career Paths
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-500 dark:text-gray-400">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 link-hover-border px-2 py-1 rounded"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 link-hover-border px-2 py-1 rounded"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 link-hover-border px-2 py-1 rounded"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 link-hover-border px-2 py-1 rounded"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-500 dark:text-gray-400">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 link-hover-border px-2 py-1 rounded"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 link-hover-border px-2 py-1 rounded"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 link-hover-border px-2 py-1 rounded"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CareerNavigator. All rights reserved IT-E.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
