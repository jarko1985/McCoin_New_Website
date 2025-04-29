import DontMiss from '@/components/top-news/DontMiss'
import RecentPosts from '@/components/top-news/RecentPosts'
import { TopNewsHero } from '@/components/top-news/TopNewsHero'
import { TopNewsSlider } from '@/components/top-news/TopNewsSlider'
const TopNewsPage = () => {
  return (
    <>
    <TopNewsHero/>
    <TopNewsSlider/>
    <RecentPosts/>
    <DontMiss/>
    </>
  )
}

export default TopNewsPage