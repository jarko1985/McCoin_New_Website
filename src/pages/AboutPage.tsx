import AboutHero from '@/components/about/AboutHero'
import MissionAndVision from '@/components/about/MissionAndVision'
import { OurHistory } from '@/components/about/OurHistory'
import OurTeam from '@/components/about/OurTeam'
import OurValues from '@/components/about/OurValues'
import About from '@/components/sections/About'
import React from 'react'

const AboutPage = () => {
  return (
    <>
    <AboutHero/>
    <MissionAndVision/>
    <OurValues/>
    <OurHistory/>
    <OurTeam/>
    <About/>
    </>
  )
}

export default AboutPage