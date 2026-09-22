import Recipes from '../components/Recipes'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import bgImage1 from '../assets/banner-01.png'
import bgImage2 from '../assets/banner-02.png'
import WhyKitchenChronicles from '../components/WhyKitchenChronicles'
const Home = () => {
  return (
    <>
      <Hero />
      <Recipes />
      <Banner image={bgImage1} url="/recipes" />
      <WhyKitchenChronicles/>
      <Banner image={bgImage2} url="/recipes" />
    </>
  )
}

export default Home
