import GalleryImage from './GalleryImage';
import { Link } from 'react-router-dom';


interface Props {
  propertyImages: {
      bannerImage: string;
  }[]
}
const GalleryImages = ({ propertyImages }: Props) => {
  return (
    <div className='xl:px-60 lg:px-40 md:px-12 px-10 flex flex-col items-center space-y-12'>
        <div className='flex flex-col items-center space-y-3'>
            <h2 className='text-2xl font-medium text-gray-500'>Our Gallery Images</h2>
            <p className='text-center text-base text-gray-primary/50 max-w-lg'>There are many variations of passages of Lorem Ipsum available but the this in majority have suffered alteration in some</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full'>
          {propertyImages.map((image,idx) => (
             <GalleryImage key={idx} bannerImage={image.bannerImage} />
          ))}
        </div>

        <Link to={'/gallery'}>
          <button className='bg-primary-light text-white py-2 px-6'>
            View more images
          </button>
        </Link>
    </div>
  )
}

export default GalleryImages