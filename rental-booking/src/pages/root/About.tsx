import { Video } from "@/@types/types";
import Certificates from "@/components/about/Certifcates";
import KnowMore from "@/components/about/KnowMore";
import MissionVision from "@/components/about/MissionVision";
import SomeFacts from "@/components/about/SomeFacts";
import GalleryImages from "@/components/gallery/GalleryImages";
import TestimonialSlider from "@/components/home/Testimonials";
import TrustedPartners from "@/components/home/TrustedPartners";
import VideoComponent from "@/components/ui/Video";
import { dummyGalleryImages, dummytestimonials } from "@/constants";


const video: Video = {
  banner: "/images/video-banner.png",
  url: "youtu.be/QpKucVkxpd0?si=aRaDylzBr-DYKBjh",
};

const About = () => {
  return (
    <div className="w-full mt-10">
      <main className="flex flex-col pb-12 pt-24 space-y-12">
        <div className="flex flex-col relative xl:px-60 lg:px-40 md:px-12 px-4 space-y-12">
          <KnowMore />
          <MissionVision />
          <VideoComponent {...video} />
        </div>
        <TrustedPartners />
        <SomeFacts />
        <GalleryImages propertyImages={dummyGalleryImages} />
        <Certificates />
        <TestimonialSlider testimonials={dummytestimonials} />
      </main>
    </div>
  );
};

export default About;
