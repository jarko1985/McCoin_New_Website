import BusinessNews from '@/components/top-news/BusinessNews'
import DontMiss from '@/components/top-news/DontMiss'
import FintechNews from '@/components/top-news/FintechNews'
import RecentPosts from '@/components/top-news/RecentPosts'
import { TopNewsHero } from '@/components/top-news/TopNewsHero'
import { TopNewsSlider } from '@/components/top-news/TopNewsSlider'
const TopNewsPage = () => {
  return (
    <>
    <TopNewsHero/>
    <TopNewsSlider/>
    <FintechNews/>
    <BusinessNews/>
    <RecentPosts/>
    <DontMiss/>
    </>
  )
}

export default TopNewsPage