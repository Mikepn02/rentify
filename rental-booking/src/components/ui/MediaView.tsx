import { currentImage, currentVideo, showModal } from '@/atoms/state';
import React, { useRef, useState } from 'react'
import ReactPlayer, { default as _ReactPlayer } from 'react-player/lazy';
import { useRecoilState } from 'recoil';

const   MediaView = () => {
    const [img, setImage] = useRecoilState(currentImage);
    const [_showModal, setShowModal] = useRecoilState(showModal);
    const [video, setVideo] = useRecoilState(currentVideo);
    const [muted] = useState(false);

    console.log("Here is the current video: ", video)

    const modelRef = useRef<HTMLDivElement | null>(null);

    const onClickOutisde = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(modelRef.current!.contains(e.target as Node)){
            setShowModal(false)
            setImage(null)
            setVideo(null)
        }
    }

    const closeModal = () => {
        setShowModal(false);
        setImage(null);
        setVideo(null)
      };
  return (
    <>
      <div onClick={onClickOutisde} className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative w-auto my-6 mx-auto max-w-3xl'>
            <div ref={modelRef} className={`border-0 md:h-[70vh] md:w-[50vw] w-[80vw] h-[70vh] relative rounded-sm shadow-lg flex flex-col outline-none focus:outline-none ( ${img ? '': 'bg-gray-700 rounded'})`}>
                {img ? 
                  <img />
                  :
                  <ReactPlayer 
                  url={"https://youtu.be/QpKucVkxpd0?si=aRaDylzBr-DYKBjh"}
                  width={"100%"}
                  height={"100%"}
                  style={{ position: "absolute", top: "0", left: "0" }}
                  playing
                  muted={muted}
                  
                  />
            }

            <button onClick={closeModal} className='modalButton absolute top-2  right-2 !z-40 h-9 w-9 bg-gray-100 hover:bg-primary-light hover:text-white rounded-full flex items-center justify-center text-gray-800'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            </div>
        </div>
      </div>
      <div className='opacity-50 fixed inset-0 z-40 bg-black'/>
    </>
  )
}

export default MediaView