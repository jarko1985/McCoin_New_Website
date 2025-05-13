// src/components/JobDetails.tsx
"use client";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ShareBanner from "../custom/ShareBanner";
import ApplyForm from "../forms/ApplyForm";

const JobDetails = ({ job }: { job: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Link 
        href="/careers" 
        className="flex items-center text-[#EC3B3B] mb-6 hover:underline"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to all jobs
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Job Header */}
        <div className="bg-[#07153B] p-8 text-white">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            {job.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-[#DAE6EA]"
          >
            {job.description}
          </motion.p>
        </div>

        {/* Job Content */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold text-[#07153B] mb-4">Job Description</h2>
                <div className="prose text-[#07153B]/90">
                  <p>We're looking for a talented {job.title} to join our growing team. In this role, you'll be responsible for:</p>
                  <ul className="space-y-2 mt-4">
                    {job.skills.map((skill: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EC3B3B] mt-2 mr-2"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6">Our ideal candidate has experience with these technologies and a passion for continuous learning.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8"
              >
                <h2 className="text-2xl font-bold text-[#07153B] mb-4">Requirements</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EC3B3B] mt-2 mr-2"></span>
                    Bachelor's degree in a related field or equivalent experience
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EC3B3B] mt-2 mr-2"></span>
                    3+ years of professional experience in a similar role
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EC3B3B] mt-2 mr-2"></span>
                    Strong problem-solving skills and attention to detail
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#EC3B3B] mt-2 mr-2"></span>
                    Excellent communication and teamwork abilities
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-[#DAE6EA]/30 p-6 rounded-lg border border-[#07153B]/10"
              >
                <h3 className="text-lg font-bold text-[#07153B] mb-4">Job Details</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-[#07153B]/70">Department</h4>
                    <p className="text-[#07153B]">{job.tags[0]}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#07153B]/70">Location</h4>
                    <p className="text-[#07153B]">Remote / Office (Flexible)</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#07153B]/70">Employment Type</h4>
                    <p className="text-[#07153B]">Full-time</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-6"
              >
                <h3 className="text-lg font-bold text-[#07153B] mb-4">Share this job</h3>
                <ShareBanner/>
              </motion.div>
            </div>
          </div>

          {/* Application Form Placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-16 pt-8 border-t border-[#07153B]/10"
          >
            <h2 className="text-2xl font-bold text-[#07153B] mb-6">Apply for this position</h2>
            <div className="bg-[#DAE6EA]/30 p-8 rounded-lg border border-dashed border-[#07153B]/30 text-center">
              <ApplyForm/>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDetails;