import React from 'react'
import HomeBanner from '../../components/home/HomeBanner'
import HomeAdsSection from '../../components/home/HomeAdsSection'
import FeaturedProperties from '../../components/home/FeaturedProperties'
import { dummycities, dummyProperties, dummytestimonials } from '../../constants'
import TrustedPartners from '../../components/home/TrustedPartners'
import PropertiesInCities from '../../components/home/PropertiesInCities'
import WhyChooseUs from '../../components/home/WhyChooseUs'
import LatestPropertiesForSale from '../../components/home/LatestProperties'
import TestimonialSlider from '../../components/home/Testimonials'

const Home = () => {
  const propertiesForSale = dummyProperties.filter(property => property.status === "forSale")
  return (
    <div className="text-xl flex items-center justify-center h-full w-full">
        <main className='flex flex-col w-full'>
            <HomeBanner />
            <HomeAdsSection />
            <FeaturedProperties properties={dummyProperties} />
            <TrustedPartners />
            <PropertiesInCities cities={dummycities}/>
            <WhyChooseUs />
            <LatestPropertiesForSale properties={propertiesForSale} />
            <TestimonialSlider testimonials={dummytestimonials}/>
            
        </main>
    </div>
  )
}

export default Home