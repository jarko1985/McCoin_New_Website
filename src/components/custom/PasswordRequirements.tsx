'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PasswordRequirement {
  id: string;
  text: string;
  regex: RegExp;
  met: boolean;
}

interface PasswordRequirementsProps {
  password: string;
  isVisible: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({
  password,
  isVisible,
  onValidationChange,
}) => {
  const [requirements, setRequirements] = useState<PasswordRequirement[]>([
    {
      id: 'length',
      text: 'At least 8 characters',
      regex: /.{8,}/,
      met: false,
    },
    {
      id: 'uppercase',
      text: 'At least 1 uppercase letter',
      regex: /[A-Z]/,
      met: false,
    },
    {
      id: 'number',
      text: 'At least 1 number',
      regex: /[0-9]/,
      met: false,
    },
    {
      id: 'special',
      text: 'At least 1 special character',
      regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
      met: false,
    },
  ]);

  useEffect(() => {
    const updatedRequirements = requirements.map(req => ({
      ...req,
      met: req.regex.test(password),
    }));

    setRequirements(updatedRequirements);

    // Check if all requirements are met
    const allMet = updatedRequirements.every(req => req.met);
    onValidationChange?.(allMet);
  }, [password, onValidationChange]);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      height: 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      height: 'auto',
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 15,
      },
    },
    met: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="mt-3 overflow-hidden"
        >
          <div className="relative">
            {/* Floating particles when all requirements are met */}
            {requirements.every(r => r.met) && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      scale: 0,
                      x: 0,
                      y: 0,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      x: [0, (Math.random() - 0.5) * 100],
                      y: [0, (Math.random() - 0.5) * 100],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-400 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                  />
                ))}
              </div>
            )}

            <div
              className={`
              backdrop-blur-sm rounded-lg p-4 border transition-all duration-500
              ${
                requirements.every(r => r.met)
                  ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50 shadow-lg shadow-green-500/20'
                  : 'bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700/50'
              }
            `}
            >
              <motion.h4
                className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                Password Requirements
              </motion.h4>

              <div className="space-y-2">
                {requirements.map((requirement, index) => (
                  <motion.div
                    key={requirement.id}
                    variants={itemVariants}
                    className="flex items-center gap-3 group"
                  >
                    <motion.div
                      variants={iconVariants}
                      initial="initial"
                      animate={requirement.met ? 'met' : 'animate'}
                      className={`
                      flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300
                      ${
                        requirement.met
                          ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-500/30'
                          : 'bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/30'
                      }
                    `}
                    >
                      <motion.div
                        key={requirement.met ? 'check' : 'x'}
                        initial={{ scale: 0, rotate: requirement.met ? -90 : 90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: requirement.met ? 90 : -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        {requirement.met ? (
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        ) : (
                          <X className="w-3 h-3 text-white" strokeWidth={3} />
                        )}
                      </motion.div>
                    </motion.div>

                    <motion.span
                      className={`
                      text-sm transition-all duration-300 group-hover:translate-x-1
                      ${requirement.met ? 'text-green-400 font-medium' : 'text-red-400'}
                    `}
                      animate={{
                        color: requirement.met ? '#4ade80' : '#f87171',
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {requirement.text}
                    </motion.span>

                    {requirement.met && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="ml-auto"
                      >
                        <motion.div
                          className="w-1 h-1 bg-green-400 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <motion.div
                className="mt-4 bg-slate-700/50 rounded-full h-2 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{
                    width: `${
                      (requirements.filter(r => r.met).length / requirements.length) * 100
                    }%`,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-xs text-center"
              >
                {requirements.every(r => r.met) ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center justify-center gap-2 text-green-400 font-medium"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeInOut',
                      }}
                    >
                      ✨
                    </motion.div>
                    Password meets all requirements!
                    <motion.div
                      animate={{
                        rotate: [360, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 0.6,
                        ease: 'easeInOut',
                        delay: 0.1,
                      }}
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                ) : (
                  <span className="text-slate-400">
                    {requirements.filter(r => r.met).length} of {requirements.length} requirements
                    met
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PasswordRequirements;
