
const serviceAds = [
    {
        icon: "/icons/buy_sell_icon.svg",
        title: "43+",
        description: "Properties Sold"
    },
    {
        icon: "/icons/faster_service_icon.svg",
        title: "20K+",
        description: "Happy Clients"
    }

]

function HomeAdsSection() {
    return (
           <div className='w-full py-16 flex flex-col md:flex-row md:space-x-4 space-x-0 md:space-y-0 space-y-6 justify-between xl:px-60 lg:px-40 md:px-12 h-auto xl:h-[90vh]'>
             <div className='relative'>
                <div className='relative h-[45-px] xl:w-[350px] md:w-[300px] bg-gray-300'>
                    <img  src='/images/home/giant-building-with-sun.png' alt=''/>
                </div>
                <div className='absolute xl:top-44 md:top-60 md:left-32 xl:h[350px] xl:w-[340px] lg:w-[300px] md:w-[25px] h-48 w-48 right-0 -bottom-12 bg-gray-300'>
                <img src='/images/home/family.png' alt="" />
                </div>
             </div>
             <div className='flex flex-col md:pt-0 pt-12 space-y-6 md:w-2/4 md:pl-4 px-2 md:px-0'>
               <div className='flex space-x-3'>
                <div className='relative'>
                <div className='bg-[#D3DEE8] h-6 w-6' />
                <div className='bg-primary-light h-6 w-6 top-1 left-1 absolute'/>
                </div>
                <p className='text-heading-1 text-lg'>Know more about us</p>
               </div>
               <h1 className='text-heading-1 text-2xl md:text-3xl font-semibold'>Are You Looking Best Property Near You? Contact Us</h1>
               <p className="text-gray-primary/75 text-lg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum.</p>

               <div className='bg-[#EEF7FF] md:w-[90%] w-full py-8 flex items-center justify-center self-center border-l-[10px]  border-primary-light space-x-4'>
                <span className='font-semibold text-[38px] text-primary-light'>20+</span>
                <span className="text-2xl text-gray-primary/75">Years of experience</span>
               </div>
               <p className="text-gray-primary/75 text-lg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                    <div className='w-full flex justify-between items-center'>
                        {
                            serviceAds.map(service => (
                                <div key={service.title} className="flex space-x-4">
                                    <div className='bg-[#EEF7FF] flex items-center justify-center p-3 h-16 w-16'>
                                        <div className="w-8 h-full relative bg-[#EEF7FF]">
                                            <img src={service.icon}  alt={service.title} />
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-1'>
                                        <p className='text-xl text-heading-1 font-semibold'>{service.title}</p>
                                        <p className='text-gray-primary/75 text-base'>{service.description}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
             </div>
           </div>
    )
}

export default HomeAdsSection
