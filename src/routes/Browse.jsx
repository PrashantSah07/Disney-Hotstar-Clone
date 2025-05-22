import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, useLocation } from "react-router-dom";
import useFetchAllData from '../hooks/useFetchAllData';
import LoadingBrowseSection from '../components/LoadingBrowseSection';
import CardView from '../components/CardView'
import { AnimatePresence } from 'framer-motion';
import DetailedCardView from '../components/DetailedCardView'
import errorImg from '../assets/images/soul-custom-error.webp'
import { IoMdRefresh } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Browse = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const url = location.state?.url;
    const heading = location.state?.heading;

    const { data, loading, error } = useFetchAllData(url);

    useEffect(() => {
        if (!url || !heading) {
            navigate('/');
        }
    }, [url, heading, navigate]);

    const [cardData, setCardData] = useState(null);
    const [cardPosition, setCardPosition] = useState({ x: null, y: null });
    const hoverTimeout = useRef(null);
    const [movieId, setMovieId] = useState(null);

    if (error) {
        return <div className='bg-gradient-to-b from-[#16181f] to-[#0f1014] text-white'>
            <Navbar />
            <div className='sm:ml-[85px] ml-[52px] sm:py-8 py-2 sm:px-5 px-2'>
                <div className='flex justify-center items-center flex-col mt-5 min-h-screen'>
                    <img className='max-w-[150px]' src={errorImg} alt="error" />
                    <h1 className='relative bottom-20 md:text-3xl text-2xl font-medium sm:w-[400px] text-center px-2'>{error || error.message}</h1>
                    <button className='relative bottom-10 flex items-center gap-2 bg-[#e1e6f0] text-black text-[18px] rounded-lg sm:px-20 px-15 py-3 font-semibold hover:scale-[1.02] duration-200' onClick={function () {
                        window.location.reload();
                    }}><IoMdRefresh size={25} /> Retry</button>
                </div>
                <Footer />
            </div>
        </div>
    }

    return (
        <>
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
            <div className='bg-gradient-to-b from-[#16181f] to-[#0f1014] text-white min-h-screen'>
                <Navbar />
                <div className='sm:ml-[85px] ml-[55px] sm:py-8 py-2 sm:px-5 px-2'>

                    {loading ? <LoadingBrowseSection loopCount={70} /> :
                        <div className='flex flex-col md:gap-15 sm:gap-10 gap-7 my-8'>
                            <h1 className='lg:text-[38px] md:text-3xl text-[25px] font-medium text-center'>{heading}</h1>
                            <div className='justify-center items-center flex-wrap gap-x-2 sm:gap-y-7 gap-y-3 grid 2xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-3'>
                                {data?.map(function (value, index) {
                                    const slug = (value.title || value.name || value.original_name)?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                    return <div key={index}>
                                        <Link to={`/multi/${slug}/${value.id}`} className='flex sm:hidden'>
                                            <img className='rounded-lg cursor-pointer bg-[#282a31]' src={`https://image.tmdb.org/t/p/original${value.poster_path || value.backdrop_path}`} alt={value.title || value.name || "Poster"}
                                                onClick={function () {
                                                    window.scrollTo({ top: 0 });
                                                }} />
                                        </Link>

                                        <img className='hidden sm:flex rounded-lg cursor-pointer bg-[#282a31]' src={`https://image.tmdb.org/t/p/original${value.poster_path || value.backdrop_path}`} alt={value.title || value.name || "Poster"}
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
                                        />
                                    </div>
                                })}
                            </div>
                        </div>}
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Browse;
