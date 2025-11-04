'use client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
const getTeamData = (t: any) => [
  {
    name: t('team.members.kasra.name'),
    role: t('team.members.kasra.role'),
    bio: t('team.members.kasra.bio'),
    avatar: '/images/team/kasra.png',
  },
  {
    name: t('team.members.kiyan.name'),
    role: t('team.members.kiyan.role'),
    bio: t('team.members.kiyan.bio'),
    avatar: '/images/team/kiyan.png',
  },
  {
    name: t('team.members.vahid.name'),
    role: t('team.members.vahid.role'),
    bio: t('team.members.vahid.bio'),
    avatar: '/images/team/vahid.png',
  },
  {
    name: t('team.members.mohamed.name'),
    role: t('team.members.mohamed.role'),
    bio: t('team.members.mohamed.bio'),
    avatar: '/images/team/moe.png',
  },
  {
    name: t('team.members.wai.name'),
    role: t('team.members.wai.role'),
    bio: t('team.members.wai.bio'),
    avatar: '/images/team/wai.jpeg',
  },
];

const OurTeam = () => {
  const t = useTranslations('aboutPage');
  const team = getTeamData(t);

  return (
    <section id="team" className="py-16 xl:max-w-[70%] px-4 xl:px-0 mx-auto">
      <h2 className="text-3xl text-[#07153B] dark:text-white  font-bold text-center mb-16">
        {t('team.title')} <span className="text-[#EC3B3B]">{t('team.title_highlight')}</span>
      </h2>
      <p className="text-center text-[#07153B] dark:text-white mb-16">{t('team.subtitle')}</p>
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
              className="relative w-full h-full rounded-xl shadow-xl preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front */}
              <div
                className="cursor-pointer absolute inset-0 bg-[#DAE6EA]  dark:bg-[#07153B] border border-[#07153B] dark:border-white rounded-xl p-6 flex flex-col items-center justify-center backface-hidden"
                style={{ backfaceVisibility: 'hidden' }}
              >
				<Avatar className="w-24 h-24 mb-4 border-2 border-[#EC3B3B] ">
					<AvatarImage className="grayscale" src={member.avatar} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-[#07153B] dark:text-white">{member.name}</h3>
                <p className="text-[#EC3B3B]">{member.role}</p>
                <p className="text-sm mt-2 text-center text-[#07153B] dark:text-white">
                  {t('team.hover_text')}
                </p>
              </div>

              {/* Back */}
              <div
                className="cursor-pointer absolute inset-0 bg-white rounded-xl p-6 flex flex-col items-center justify-center backface-hidden"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateX(180deg)',
                }}
              >
                <h3 className="text-xl font-bold text-[#07153B]">{member.name}</h3>
                <p className="text-[#07153B] mb-4">{member.role}</p>
                <p className="text-[#07153B] text-center">{member.bio}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
