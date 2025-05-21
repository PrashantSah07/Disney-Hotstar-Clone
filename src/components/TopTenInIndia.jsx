import React, { useRef, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import LoadingEffect2 from './LoadingEffect2';
import CardView from './CardView';
import { AnimatePresence } from 'framer-motion';
import DetailedCardView from '../components/DetailedCardView'

const TopTenInIndia = ({ heading, url }) => {
    const { data, loading } = useFetch(url);
    const [cardData, setCardData] = useState(null);
    const [cardPosition, setCardPosition] = useState({ x: null, y: null });
    const [movieId, setMovieId] = useState(null);

    const hoverTimeout = useRef(null);

    const topTen = data.results?.slice(0, 10) || [];

    const elementRef = useRef(null);

    function slideLeft(e) {
        e.scrollLeft -= (500)
    }

    function slideRight(e) {
        e.scrollLeft += (500)
    }

    return (
        <div className=''>
            <AnimatePresence>
                {cardData && window.innerWidth >= 1280 && (
                    <CardView data={cardData} setCardData={setCardData} position={cardPosition} />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {movieId && window.innerWidth >= 640 && (
                    <div className="sm:flex hidden">
                        <DetailedCardView movieId={movieId} setMovieId={setMovieId} />
                    </div>
                )}
            </AnimatePresence>
            {!loading && <div>
                <button className='hidden md:flex absolute xl:mx-14 mx-8 mt-[135px] z-1' onClick={function () {
                    slideLeft(elementRef.current);
                }}><FaAngleLeft color='white' size={30} /></button>
                <button className='hidden md:flex absolute xl:mx-7 mx-3 mt-[135px] right-0 z-1' onClick={function () {
                    slideRight(elementRef.current);
                }}><FaAngleRight color='white' size={30} /></button>
            </div>}

            <div className='flex flex-col gap-2 justify-center xl:px-5 pt-5'>
                <h1 className='sm:text-2xl text-[20px] font-semibold text-white'>{heading}</h1>

                {loading ? <LoadingEffect2 loopCount={10} /> : <div ref={elementRef} className='flex items-center lg:gap-10 gap-7 overflow-x-auto scroll-smooth hide-scrollbar overflow-y-hidden px-7'>
                    {topTen.map((value, index) => (
                        <div key={index} className='relative rounded-lg'>
                            <img
                                onMouseEnter={(e) => {
                                    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);

                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = rect.left + rect.width / 2 + window.scrollX;
                                    const y = rect.top + window.scrollY;

                                    hoverTimeout.current = setTimeout(() => {
                                        setCardData(value);
                                        setCardPosition({ x, y });
                                    }, 1000);
                                }}

                                onMouseLeave={() => {
                                    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                                    setCardData(null);
                                }}
                                onClick={
                                    function () {
                                        setMovieId(value.id);
                                    }
                                }
                                key={index}
                                src={`https://image.tmdb.org/t/p/original${value.poster_path}`}
                                alt={value.title || value.name}
                                className='lg:min-w-[250px] lg:h-[170px] md:min-w-[150px] md:h-[180px] sm:min-w-[120px] min-w-[100px]  object-cover object-top cursor-pointer transition rounded-lg opacity-50 bg-[#282a31]'
                            />
                            <span className='bg-gradient-to-b from-[#ffffff] to-[#969494] bg-clip-text text-transparent lg:text-8xl sm:text-[75px] text-[70px] font-semibold absolute lg:-bottom-3 sm:-bottom-7 -bottom-7 lg:-left-7 -left-5'>{index + 1}</span>
                        </div>
                    ))}
                </div>}
            </div>
        </div>
    )
}

export default TopTenInIndia
