import GnewsSwiper from '@/components/custom/GnewsSwiper'
import NewsDataSection from '@/components/custom/NewsDataSwiper'
import React from 'react'

const TopNewsPage = () => {
  return (
    <section className='mx-auto container xl:w-[70%] py-12'>
        <GnewsSwiper/>
        <NewsDataSection/>
    </section>
  )
}

export default TopNewsPage