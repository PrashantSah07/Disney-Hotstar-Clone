import React, { useRef, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import LoadingEffectBanner from './LoadingEffectBanner';

const Slider = () => {
    const { data, loading } = useFetch('https://api.themoviedb.org/3/trending/all/day?api_key=6b03720f12b1780deb6f627085df7549');

    const elementRef = useRef(null)

    function slideLeft(e) {
        e.scrollLeft -= (window.innerWidth - 110)
    }

    function slideRight(e) {
        e.scrollLeft += (window.innerWidth - 110)
    }

    return (
        <div className=''>
            {!loading && <div>
                <button className='hidden md:flex absolute mx-6 mt-[150px] z-1' onClick={function () {
                    slideLeft(elementRef.current);
                }}><FaAngleLeft color='white' size={30} /></button>
                <button className='hidden md:flex absolute mx-6 mt-[150px] right-0 z-1' onClick={function () {
                    slideRight(elementRef.current);
                }}><FaAngleRight color='white' size={30} /></button>
            </div>
            }

            {loading ? <LoadingEffectBanner loopCount={2} /> : <div className='flex overflow-x-auto w-full xl:px-16 px-6 py-4 hide-scrollbar scroll-smooth' ref={elementRef}>
                {data.results?.map(function (value, index) {
                    return <img className='min-w-full md:h-[310px] object-cover object-left-top mr-5 rounded-lg duration-150 hover:outline-2 hover:outline-white hover:scale-[1.01]' key={index} src={`https://image.tmdb.org/t/p/original${value.backdrop_path}`} alt={`${value.original_name}`} />
                })}
            </div>}
        </div>
    )
}

export default Slider;
