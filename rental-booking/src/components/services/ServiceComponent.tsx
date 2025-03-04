import { Service } from '@/@types/types'

interface ServiceProps{
    service: Service;
    i: number;
}


const ServiceComponent = ({service: { name ,description, banner} , i}: ServiceProps) => {
  return (
    <div className='p-8 flex flex-col space-y-3 border-2 border-[#D3DEE8] rounded-[4px] card'>
        <div className='w-full h-60 relative rounded-[4px]'>
            <img src={banner} className='w-full object-cover'/>
        </div>
        <div className='flex space-x-3'>
            <div className='h-12 px-3 rounded bg-[#EEF7FF] flex items-center justify-center'>
                 <span className='text-gray-primay/50 font-semibold'>{ 0 + i}</span>
            </div>
            <div className='flex flex-col space-y-3'>
                <h2 className='text-xl font-medium'>{name}</h2>
                <p className='text-base text-gray-primary/75'>{description}</p>
            </div>
        </div>
    </div>
  )
}

export default ServiceComponent