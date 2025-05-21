import React, { useRef, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import LoadingEffect from './LoadingEffect.jsx'
import CardView from '../components/CardView.jsx'
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import DetailedCardView from '../components/DetailedCardView'

const GenresSection = ({ heading, url }) => {
    const { data, loading } = useFetch(url)
    const [cardData, setCardData] = useState(null);
    const [cardPosition, setCardPosition] = useState({ x: null, y: null });

    const elementRef = useRef(null)

    function slideLeft(e) {
        e.scrollLeft -= (500)
    }

    function slideRight(e) {
        e.scrollLeft += (500)
    }

    const hoverTimeout = useRef(null);
    const [movieId, setMovieId] = useState(null);

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
                <button className='hidden md:flex absolute xl:mx-7 xl:mt-[170px] mx-1 lg:mt-[180px] sm:mt-[145px] z-1' onClick={function () {
                    slideLeft(elementRef.current);
                }}><FaAngleLeft color='white' size={30} /></button>
                <button className='hidden md:flex absolute xl:mx-7 xl:mt-[170px] mx-1 lg:mt-[180px] sm:mt-[145px] right-0 z-1' onClick={function () {
                    slideRight(elementRef.current);
                }}><FaAngleRight color='white' size={30} /></button>
            </div>}

            <div className='flex flex-col gap-2 justify-center xl:px-5 sm:pt-5 pt-3'>
                <div className='flex justify-between items-center pr-2 sm:pr-0'>
                    <h1 className='sm:text-2xl text-[20px] font-semibold'>{heading}</h1>
                    <Link to='/browse' state={{ heading, url }}><button className='flex justify-center items-center text-[#b0b4c3] font-medium'><span className='hidden sm:flex'>View All</span><MdKeyboardArrowRight size={25} /></button></Link>
                </div>

                {loading ? <LoadingEffect loopCount={20} /> : <div ref={elementRef} className='flex items-center gap-3 overflow-x-auto scroll-smooth hide-scrollbar overflow-y-hidden'>
                    {data.results?.map((value, index) => (
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
                            className='xl:min-w-[200px] xl:h-[250px] lg:min-w-[180px] sm:min-w-[130px] min-w-[100px] object-cover object-center cursor-pointer rounded-sm transition bg-[#282a31]'
                        />
                    ))}
                </div>}
            </div>
        </div>
    )
}

export default GenresSection
