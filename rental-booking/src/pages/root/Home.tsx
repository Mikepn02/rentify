import HomeBanner from '../../components/home/HomeBanner'
import HomeAdsSection from '../../components/home/HomeAdsSection'
import FeaturedProperties from '../../components/home/FeaturedProperties'
import { dummycities,  dummytestimonials } from '../../constants'
import TrustedPartners from '../../components/home/TrustedPartners'
import PropertiesInCities from '../../components/home/PropertiesInCities'
import WhyChooseUs from '../../components/home/WhyChooseUs'
import TestimonialSlider from '../../components/home/Testimonials'

const Home = () => {
  return (
    <div className="text-xl flex items-center justify-center h-full w-full">
        <main className='flex flex-col w-full'>
            <HomeBanner />
            <HomeAdsSection />
            <FeaturedProperties />
            <TrustedPartners />
            <PropertiesInCities cities={dummycities}/>
            <WhyChooseUs />
            <TestimonialSlider testimonials={dummytestimonials}/>
            
        </main>
    </div>
  )
}

export default Home