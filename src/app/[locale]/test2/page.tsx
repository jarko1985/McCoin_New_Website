'use client';
import Image from 'next/image';
import localFont from 'next/font/local';

const atma = localFont({
  src: '../../../../public/fonts/Atma-Regular.ttf',
  variable: '--font-atma',
  display: 'swap',
  preload: true,
});

const stepsData = [
  {
    id: 1,
    name: 'Create Your Account',
    description:
      'Enter your email, set a password, and complete the human verification (reCAPTCHA).',
    imgSrc: '/images/register2.png',
  },
  {
    id: 2,
    name: 'Verify Your Email',
    description:
      'Receive a one-time password (OTP) via email and enter it on the verification page.',
    imgSrc: '/images/verify-email2.png',
  },
  {
    id: 3,
    name: 'Login Successfully',
    description: "Once OTP is verified, you'll be logged into your McCoin account.",
    imgSrc: '/images/login2.png',
  },
  {
    id: 4,
    name: 'Start Exploring',
    description: 'Access your dashboard and explore available features and tools.',
    imgSrc: '/images/explore2.png',
  },
  {
    id: 5,
    name: 'Complete KYC to Trade',
    description: 'Submit your identity verification to activate trading — Learn more about KYC.',
    imgSrc: '/images/complete-kyc2.png',
  },
];

const page = () => {
  return (
    <div
      className={`xl:max-w-[70%] mx-auto px-4 xl:px-0 py-12 flex justify-center items-center flex-col gap-y-8 ${atma.variable}`}
    >
      <h1
        className="text-xl md:text-4xl pb-4 font-semibold text-[#DAE6EA] drop-shadow-lg"
        style={{ fontFamily: 'var(--font-atma)' }}
      >
        McCoin Platform Registration
      </h1>
      <p className="pb-12 text-[#DAE6EA]/90" style={{ fontFamily: 'var(--font-atma)' }}>
        follow these 5 clear and concise KYC steps using the Sumsub process
      </p>
      {stepsData.map((step, index) => {
        return (
          <div key={step.id} className="relative group">
            <div
              className={`absolute h-[2px] w-8 bg-[#DAE6EA]/50 z-50 ${
                index % 2 === 0
                  ? '-right-8 top-[50%] group-hover:-right-12 transition-all duration-500'
                  : '-left-8 top-[50%] group-hover:-left-12 transition-all duration-500'
              }`}
            />
            <div className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Animated Circular Image Container */}
              <div className="rounded-[50%] w-52 h-52 bg-gradient-to-br from-[#ec3b3b] to-[#ec3b3b]/80 border-2 border-[#DAE6EA]/30 z-10 flex items-center justify-center shadow-2xl shadow-[#ec3b3b]/50 relative overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-3xl hover:shadow-[#ec3b3b]/70 cursor-pointer">
                {/* Rotating background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ec3b3b]/20 via-[#DAE6EA]/10 to-[#ec3b3b]/20 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute inset-2 border-2 border-[#DAE6EA]/50 rounded-full animate-pulse"></div>

                <Image
                  src={step.imgSrc}
                  width={200}
                  height={200}
                  alt="register Image"
                  className="rounded-[50%] drop-shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105 relative z-10"
                />

                <div
                  className="absolute top-2 right-2 w-8 h-8 bg-[#DAE6EA] text-[#07153b] rounded-full flex items-center justify-center font-bold text-sm shadow-lg transform transition-all duration-300 group-hover:scale-125 group-hover:rotate-12"
                  style={{ fontFamily: 'var(--font-carter-one)' }}
                >
                  {step.id}
                </div>
              </div>

              <div
                className={`border-2 border-[#DAE6EA]/30 text-[#DAE6EA] bg-gradient-to-br from-[#07153b]/90 to-[#07153b]/70 backdrop-blur-lg rounded-lg shadow-2xl relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-3xl hover:border-[#ec3b3b]/50 hover:from-[#07153b]/95 hover:to-[#07153b]/75 cursor-pointer
            ${
              index % 2 === 0 ? '-ml-24 hover:-ml-20' : '-mr-24 hover:-mr-20'
            } flex flex-col justify-center items-center w-[600px] p-6`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#ec3b3b]/5 via-transparent to-[#ec3b3b]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <h1
                  className="font-semibold text-xl mb-2 drop-shadow-lg relative z-10 transition-all duration-300 group-hover:text-[#DAE6EA] group-hover:scale-105 group-hover:drop-shadow-xl"
                  style={{ fontFamily: 'var(--font-atma)' }}
                >
                  {step.name}
                </h1>
                <p
                  style={{ fontFamily: 'var(--font-atma)' }}
                  className="text-center max-w-sm text-[#DAE6EA]/90 leading-relaxed relative z-10 transition-all duration-300 group-hover:text-[#DAE6EA] group-hover:leading-loose"
                >
                  {step.description}
                </p>

                <div className="absolute inset-0 rounded-lg border-2 border-[#ec3b3b]/0 group-hover:border-[#ec3b3b]/30 transition-all duration-500 group-hover:shadow-inner"></div>
              </div>
            </div>

            {index < 4 && (
              <div className="w-[2px] h-6 bg-gradient-to-b from-[#ec3b3b] to-[#DAE6EA] absolute -bottom-7 right-[50%] shadow-lg transition-all duration-500" />
            )}
          </div>
        );
      })}

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .group:hover .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default page;
