import React, { useRef } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Studios = ({ heading, items }) => {

    const elementRef = useRef(null)

    function slideLeft(e) {
        e.scrollLeft -= (500)
    }

    function slideRight(e) {
        e.scrollLeft += (500)
    }

    return (
        <div className='flex flex-col xl:px-5 gap-2 justify-center sm:pt-5 pt-2'>

            <button className='hidden md:flex absolute xl:mx-1 mx-2 mt-[50px] z-1' onClick={function () {
                slideLeft(elementRef.current);
            }}><FaAngleLeft color='white' size={30} /></button>
            <button className='hidden md:flex absolute xl:mx-10 mx-2 mt-[50px] right-0 z-1' onClick={function () {
                slideRight(elementRef.current);
            }}><FaAngleRight color='white' size={30} /></button>

            <h1 className='sm:text-2xl text-[20px] font-semibold'>{heading}</h1>
            <div ref={elementRef} className='flex gap-2 overflow-x-auto scroll-smooth hide-scrollbar'>
                {items.map((src, index) => (
                    <div key={index} className='xl:py-5'>
                        <img src={src} alt={`studio-${index}`} className="lg:max-w-[270px] sm:max-w-[220px] max-w-[180px] rounded-sm ease-out xl:hover:scale-[1.15] xl:hover:duration-200 shadow-3xl xl:hover:delay-200 xl:duration-100 " />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Studios
