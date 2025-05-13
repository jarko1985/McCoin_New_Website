'use client'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { motion } from "framer-motion";
const team = [
    {
      name: "Kasra Taghavi",
      role: "Co-Founder | Director",
      bio: "Blockchain pioneer with 10+ years in crypto markets",
      avatar: "/images/team/kasra.png",
    },
    {
      name: "Kiyan Taghavi",
      role: "Co-Founder | CEO",
      bio: "Former lead engineer at major crypto exchange",
      avatar: "/images/team/kiyan.png",
    },
    {
      name: "Sunil Nair",
      role: "CISO",
      bio: "Chief Information Security Officer with 15+ years in cybersecurity",
      avatar: "/images/team/sunil.png",
    },
    {
      name: "Vahid Sobati",
      role: "Operations Manager",
      bio: "Operations Manager with 10+ years in crypto markets",
      avatar: "/images/team/vahid.png",
    },
    {
      name: "Mohamed Elsayed",
      role: "CIO",
      bio: "Chief Information Officer with 10+ years in Blockchain",
      avatar: "/images/team/moe.png",
    },
  ];

const OurTeam = () => {
  return (
    <section id="team" className="py-16 xl:max-w-[70%] px-4 xl:px-0 mx-auto">
    <h2 className="text-3xl text-white font-bold text-center mb-16">Meet Our <span className="text-[#EC3B3B]">Team</span></h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {team.map((member, index) => (
        <motion.div
          key={index}
          whileHover="hover"
          initial="rest"
          className="perspective-1000 h-80"
        >
          <motion.div
            variants={{
              rest: { rotateX: 0 },
              hover: { rotateX: 180 },
            }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-full rounded-xl shadow-lg preserve-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front */}
            <div
              className="cursor-pointer absolute inset-0 bg-[#07153B] border border-white rounded-xl p-6 flex flex-col items-center justify-center backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Avatar className="w-24 h-24 mb-4 border-2 border-[#EC3B3B]">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-[#EC3B3B]">{member.role}</p>
              <p className="text-sm mt-2 text-center text-white">Hover to flip</p>
            </div>

            {/* Back */}
            <div
              className="cursor-pointer absolute inset-0 bg-white rounded-xl p-6 flex flex-col items-center justify-center backface-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
              }}
            >
              <h3 className="text-xl font-bold text-[#07153B]">
                {member.name}
              </h3>
              <p className="text-[#07153B] mb-4">{member.role}</p>
              <p className="text-[#07153B] text-center">{member.bio}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  </section>
  )
}

export default OurTeam