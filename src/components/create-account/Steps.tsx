'use client';
import Image from 'next/image';
import { PiArrowFatLinesDown } from 'react-icons/pi';

const stepsData = [
  {
    id: 1,
    name: 'Create Your Account',
    description:
      'Enter your email, set a password, and complete the human verification (reCAPTCHA).',
    imgSrc: '/images/register.png',
  },
  {
    id: 2,
    name: 'Verify Your Email',
    description:
      'Receive a one-time password (OTP) via email and enter it on the verification page.',
    imgSrc: '/images/verify-email.png',
  },
  {
    id: 3,
    name: 'Login Successfully',
    description: "Once OTP is verified, you'll be logged into your McCoin account.",
    imgSrc: '/images/login.png',
  },
  {
    id: 4,
    name: 'Start Exploring',
    description: 'Access your dashboard and explore available features and tools.',
    imgSrc: '/images/explore.png',
  },
  {
    id: 5,
    name: 'Complete KYC to Trade',
    description: 'Submit your identity verification to activate trading — Learn more about KYC.',
    imgSrc: '/images/complete_kyc.png',
  },
];

const Steps = () => {
  return (
    <section className="xl:max-w-[70%] mx-auto px-4 xl:px-0 py-12 relative">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#07153b]/90 to-[#07153b]/70 backdrop-blur-lg rounded-2xl p-8 mb-12 relative border border-[#DAE6EA]/20 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ec3b3b]/10 to-transparent rounded-2xl"></div>
        <h1 className="text-center md:text-4xl text-2xl font-carter-one font-bold text-[#DAE6EA] mb-4 relative z-10 drop-shadow-lg">
          McCoin Platform Registration
        </h1>
        <div className="flex justify-center relative z-10">
          <Image
            src="/images/registration-icon.png"
            alt="registration icon"
            width={120}
            height={120}
            className="drop-shadow-xl"
          />
        </div>
      </div>

      {/* Steps Container */}
      <div className="relative">
        {/* Animated Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#DAE6EA]/30 to-[#DAE6EA]/10 rounded-full"></div>

        {/* Animated Progress Line */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#ec3b3b] to-[#ec3b3b]/60 rounded-full animate-pulse shadow-lg shadow-[#ec3b3b]/50"
          style={{
            height: '100%',
            animation: 'progressLine 6s ease-in-out infinite',
            transformOrigin: 'top',
          }}
        ></div>

        {/* Steps */}
        {stepsData.map((step, index) => (
          <div key={step.id} className="relative mb-16 last:mb-0 group">
            {/* Step content */}
            <div className="flex flex-col items-center">
              {/* Step number indicator */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ec3b3b] to-[#ec3b3b]/80 text-white flex items-center justify-center font-bold text-lg mb-6 z-20 relative shadow-2xl shadow-[#ec3b3b]/50 border-4 border-[#DAE6EA]/20 backdrop-blur-sm transition-all duration-500 hover:scale-125 hover:shadow-3xl hover:shadow-[#ec3b3b]/70 cursor-pointer group-hover:animate-bounce">
                <span className="relative z-10">{step.id}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>

              {/* Step card with glassmorphism */}
              <div
                className={`bg-gradient-to-br from-[#07153b]/90 to-[#07153b]/70 backdrop-blur-xl rounded-2xl p-8 w-full max-w-3xl flex items-center border border-[#DAE6EA]/20 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] hover:border-[#ec3b3b]/30 relative overflow-hidden ${
                  index % 2 === 0 ? 'text-left flex-row' : 'flex-row-reverse text-right'
                }`}
              >
                {/* Glass overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#DAE6EA]/5 via-transparent to-[#ec3b3b]/5 rounded-2xl"></div>

                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ec3b3b]/30 via-[#DAE6EA]/20 to-[#ec3b3b]/30 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-[#07153b]/90 to-[#07153b]/70 rounded-2xl"></div>
                </div>

                <div className="flex-2/3 relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#DAE6EA] mb-3 drop-shadow-lg">
                    {step.name}
                  </h2>
                  <p
                    className={`text-[#DAE6EA]/90 font-medium leading-relaxed ${
                      index % 2 === 0 ? 'text-left' : 'text-right'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>

                <div className="relative z-10 ml-6 mr-6">
                  <div className="p-4 bg-gradient-to-br from-[#DAE6EA]/20 to-[#DAE6EA]/10 rounded-xl backdrop-blur-sm border border-[#DAE6EA]/30 shadow-xl">
                    <Image
                      src={step.imgSrc}
                      alt="icon"
                      width={70}
                      height={50}
                      className="drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
            </div>
            {index < 4 && (
              <div className="flex max-w-xl justify-between mx-auto items-center mt-16">
                <PiArrowFatLinesDown
                  size={40}
                  className="group-hover:text-[#ec3b3b] transition-all duration-500 group-hover:scale-110"
                />{' '}
                <PiArrowFatLinesDown
                  className="group-hover:text-[#ec3b3b] transition-all duration-500 group-hover:scale-110"
                  size={40}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes progressLine {
          0% {
            height: 0%;
            opacity: 0;
          }
          20% {
            height: 25%;
            opacity: 1;
          }
          40% {
            height: 50%;
            opacity: 1;
          }
          60% {
            height: 75%;
            opacity: 1;
          }
          80% {
            height: 100%;
            opacity: 1;
          }
          100% {
            height: 100%;
            opacity: 0;
          }
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Steps;
