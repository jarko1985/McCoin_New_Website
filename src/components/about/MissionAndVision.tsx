"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const MissionAndVision = () => {
  return (
    <section className="py-16 px-4 xl:px-0">
      <div className="xl:max-w-[70%] mx-auto">
        {/* Mission Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
          {/* Image Container - Left */}
          <motion.div
            className="relative w-full lg:w-1/2 h-96 lg:h-[500px]"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Main Image (cropped from middle) */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/images/bitcoin2.jpg"
                alt="Construction team working"
                fill
                className="object-cover object-center"
                style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)" }}
              />
            </div>

            {/* Overlapping Image */}
            <motion.div
              className="absolute -right-8 bottom-8 w-2/5 h-3/5 z-10 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                src="/images/bitcoin.jpg"
                alt="Construction site detail"
                fill
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>

          {/* Text Content - Right */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Our <span className="text-[#EC3B3B]">Mission</span>
            </h2>

            <p className="text-lg text-gray-200 mb-6">
              At McCoin®, our vision is to deliver exceptional crypto trading
              services that surpass client expectations through innovation,
              security, and transparency. We aim to build long-term trust and
              empower financial growth in the digital economy.
            </p>

            <p className="text-lg text-gray-200 mb-8">
              Through precision, cutting-edge technology, and a customer-first
              mindset, we strive to lead in every market opportunity. Our
              commitment to integrity and performance fuels lasting partnerships
              and a reputation for reliability.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3 text-[#EC3B3B]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-300">
                  mpowering Financial Freedom Through Crypto
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3 text-[#EC3B3B]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-300">
                  Innovating Secure and Transparent Trading Solutions
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3 text-[#EC3B3B]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-300">
                  Customer-Centric in Every Transaction
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3 text-[#EC3B3B]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-300">
                  Building a Decentralized Future Together
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Vision Section */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          {/* Image Container - Right */}
          <motion.div
            className="relative w-full lg:w-1/2 h-96 lg:h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Main Image (cropped from middle) */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/images/bitcoin5.jpg"
                alt="Modern architecture"
                fill
                className="object-cover object-center"
                style={{
                  clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
                }}
              />
            </div>

            {/* Overlapping Image */}
            <motion.div
              className="absolute -left-8 bottom-8 w-2/5 h-3/5 z-10 shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image
                src="/images/bitcoin6.jpg"
                alt="Architectural detail"
                fill
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>

          {/* Text Content - Left */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold text-[#FFF] mb-6">
              Our <span className="text-[#EC3B3B]">Vision</span>
            </h2>

            <p className="text-lg text-gray-200 mb-6">
              At McCoin®, our vision is to become a global leader in crypto
              trading by redefining financial freedom through innovation, trust,
              and user empowerment. We envision a future where secure and
              accessible digital assets trading drives economic opportunity for
              all.
            </p>

            <p className="text-lg text-gray-200 mb-8">
              By leveraging advanced technologies, market intelligence, and a
              people-first approach, we aim to reshape the financial landscape.
              Our vision is rooted in transparency, excellence, and a commitment
              to building a decentralized financial ecosystem.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3 text-[#EC3B3B]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-300">
                  Leading the Future of Digital Finance
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3 text-[#EC3B3B]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-300">
                  Unlocking Global Access to Crypto Markets
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3 text-[#EC3B3B]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-300">
                  Putting Trust and Innovation at the Core
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1 mr-3 text-[#EC3B3B]">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-gray-300">
                  Empowering a Borderless Financial World
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
