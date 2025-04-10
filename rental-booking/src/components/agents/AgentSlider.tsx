import { Agent } from '@/@types/types'
import  { useState } from 'react'
import Agents from './Agents'


interface AgentsProps {
    agents: Agent[]
}

const AgentSlider = ({agents} : AgentsProps) => {
    const [ activeAgent , setActiveAgent] = useState({
        start: 0,
        end: 3
    })

    const handleNext = () => {
        if(activeAgent.end < agents.length){
            setActiveAgent({
                start: activeAgent.start + 1,
                end: activeAgent.end + 1
            })
        }
    }

    const handlePrev = () => {
        if(activeAgent.start > 0){
            setActiveAgent({
                start: activeAgent.start - 1,
                end: activeAgent.end - 1
            })
        }
    }
  return (
    <div className='w-full flex flex-col items-center space-y-6'>
        <div className='flex flex-col space-y-3 items-center'>
            <h2 className='text-3xl font-semibold'>Meet Our Popular Agents</h2>
            <p className="text-center text-gray-primary/75  text-lg max-w-xl">There are many variations of passages of Lorem Ipsum available but the this in majority have suffered alteration in some</p>
        </div>

        <div className='flex items-center justify-between w-full space-x-3'>
               <button disabled={activeAgent.start == 0} type="button" onClick={handlePrev}
                    className={activeAgent.start > 0 ? "h-12 w-12 rounded-full border-2 border-primary-light hover:bg-primary-light hover:text-white transition duration-300 flex items-center justify-center text-primary-light" : "h-12 w-12 rounded-full border-2 border-[#7B7B7B] text-[#7B7B7B] flex items-center justify-center"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                </button>

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[90%]'>
                    {
                        agents.slice(activeAgent.start, activeAgent.end).map((agent: Agent, i) => (
                            <Agents key={i} {...agent} />
                        ))
                    }
                </div>
                <button disabled={activeAgent.end >= agents.length} onClick={handleNext}
                    className={activeAgent.end < agents.length ? "h-12 w-12 rounded-full border-2 border-primary-light hover:bg-primary-light hover:text-white transition duration-300 flex items-center justify-center text-primary-light" : "h-12 w-12 rounded-full border-2 border-[#7B7B7B] text-[#7B7B7B] flex items-center justify-center"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                </button>
        </div>
    </div>
  )
}

export default AgentSlider