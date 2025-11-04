import AboutHero from '@/components/about/AboutHero';
import MissionAndVision from '@/components/about/MissionAndVision';
import { MissionVisionSection } from '@/components/about/MissionAndVision2';
import { OurHistory } from '@/components/about/OurHistory';
import OurTeam from '@/components/about/OurTeam';
import OurValues from '@/components/about/OurValues';
import About from '@/components/sections/About';

const page = () => {
  return (
    <>
      <AboutHero />
      {/* <MissionAndVision /> */}
      <MissionVisionSection />
      <OurValues />
      <OurHistory />
      <OurTeam />
      <About />
    </>
  );
};

export default page;
