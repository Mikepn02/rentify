import{ Service as ServiceType, Video } from "@/@types/types";
import AgentSlider from "@/components/agents/AgentSlider";
import ServiceComponent from "@/components/services/ServiceComponent";
import VideoComponent from "@/components/ui/Video";
import { dummyAgents } from "@/constants";
import React from "react";

const video: Video = {
  banner: "/images/video-banner.png",
  url: "youtube.com/watch?v=4NRXx6U8ABQ&list=RDMM&index=3",
};


interface ServiceProp{
    services: ServiceType[]
}
const Service = ({ services }: ServiceProp) => {
  return (
    <div className="w-full">
      <head>
        <title>Prime Properties | Our services</title>
        <link rel="shortcut icon" href="/icons/logo.svg" type="image/x-icon" />
      </head>
      <main className="w-full flex flex-col space-y-16 xl:px-60 lg:px-40 md:px-12 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            {services.map((service,i) => (
                <ServiceComponent key={i} service={service} i={i}/>
            ))}
        </div>
        <VideoComponent {...video} />
        <AgentSlider agents={dummyAgents} />
      </main>
    </div>
  );
};

export default Service;
