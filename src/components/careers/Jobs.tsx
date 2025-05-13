"use client";
import { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Search,
  Code,
  ShieldCheck,
  Users,
  Megaphone,
  Headset,
} from "lucide-react";
import { availableJobs, popularSearches } from "../../../utils/data";

const iconComponents = {
  Code,
  ShieldCheck,
  Users,
  Megaphone,
  Headset,
};

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(availableJobs);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const results = availableJobs.filter((job) => {
      // First filter by search term
      const matchesSearch =
        searchTerm === "" || // Show all if search is empty
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some((skill: string) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        job.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // Then filter by active filter if it exists
      const matchesActiveFilter = activeFilter
        ? job.tags.some((tag: string) =>
            tag.toLowerCase().includes(activeFilter.toLowerCase())
          ) ||
          job.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
          job.skills.some((skill: string) =>
            skill.toLowerCase().includes(activeFilter.toLowerCase())
          )
        : true;

      return matchesSearch && matchesActiveFilter;
    });

    setFilteredJobs(results);
  }, [searchTerm, activeFilter]);

  const handlePopularSearchClick = (search: string) => {
    const mainKeyword = search.split(" ")[0].toLowerCase();
    setActiveFilter(mainKeyword);
    setSearchTerm(mainKeyword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear active filter when input is cleared
    if (value === "") {
      setActiveFilter(null);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveFilter(null);
  };

  return (
    <section className="min-h-screen bg-[#DAE6EA] text-[#07153B] p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#07153B" }}
          >
            Available Jobs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl md:text-2xl mb-8 text-[#07153B]/80"
          >
            Search our list of available jobs
          </motion.p>

          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative max-w-2xl mx-auto"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#07153B]/70" />
            <Input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={handleInputChange}
              className="pl-10 pr-4 py-6 rounded-xl bg-white border border-[#07153B]/20 focus:border-[#EC3B3B] text-[#07153B] placeholder-[#07153B]/50"
            />
          </motion.div>

          {/* Popular Searches */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6"
          >
            <p className="text-sm text-[#07153B]/70 mb-3">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches.map((search, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePopularSearchClick(search)}
                  className={`px-4 py-2 rounded-full text-sm ${
                    activeFilter && search.toLowerCase().includes(activeFilter)
                      ? "bg-[#EC3B3B] text-white font-semibold"
                      : "bg-white hover:bg-[#07153B]/10 border border-[#07153B]/20"
                  }`}
                >
                  {search}
                </motion.button>
              ))}
              {activeFilter && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-full text-sm bg-white hover:bg-[#07153B]/10 border border-[#07153B]/20"
                >
                  Clear filters
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-semibold mb-6">Current Openings</h2>

          <AnimatePresence>
            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <NoJobsFound clearFilters={clearFilters} />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Jobs;

const JobCard = ({ job }: { job: (typeof availableJobs)[0] }) => {
  const IconComponent =
    iconComponents[job.iconName as keyof typeof iconComponents];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(7, 21, 59, 0.1)" }}
      className="bg-white border border-[#07153B]/10 rounded-xl p-6 flex flex-col transition-all duration-300 hover:border-[#EC3B3B]/30"
    >
      <div className="mb-4 p-3 bg-[#DAE6EA] rounded-lg w-fit">
        <IconComponent className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
      <p className="text-[#07153B]/80 mb-4">{job.description}</p>

      <div className="mb-6">
        <h4 className="font-medium text-[#07153B] mb-2">Key Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs rounded-full bg-[#DAE6EA] text-[#07153B]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <motion.a
        whileHover={{ x: 5 }}
        href={`/careers/${job.id}`}
        className="text-[#EC3B3B] font-medium flex items-center gap-1 self-start mt-auto"
      >
        Apply now
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </motion.a>
    </motion.div>
  );
};

const NoJobsFound = ({ clearFilters }: { clearFilters: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-12"
  >
    <p className="text-xl">No jobs match your search criteria.</p>
    <button
      onClick={clearFilters}
      className="mt-4 px-6 py-2 rounded-lg bg-[#EC3B3B] hover:bg-[#EC3B3B]/90 text-white transition-colors"
    >
      Clear search
    </button>
  </motion.div>
);
