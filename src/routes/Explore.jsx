import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { IoSearch } from "react-icons/io5";
import Footer from '../components/Footer'
import useFetchAllData from '../hooks/useFetchAllData';
import LoadingBrowseSection from '../components/LoadingBrowseSection';
import { AnimatePresence } from 'framer-motion';
import CardView from '../components/CardView';
import DetailedCardView from '../components/DetailedCardView'
import errorImg from '../assets/images/soul-custom-error.webp'
import { Link } from 'react-router-dom';

const Explore = () => {
  const [inputValue, setInputValue] = useState('');
  const [movieId, setMovieId] = useState(null);
  const [searchURL, setSearchURL] = useState('https://api.themoviedb.org/3/discover/movie?api_key=6b03720f12b1780deb6f627085df7549&with_genres=53&with_origin_country=IN&sort_by=popularity.desc')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const url = inputValue.trim()
        ? `https://api.themoviedb.org/3/search/multi?api_key=6b03720f12b1780deb6f627085df7549&query=${inputValue}`
        : 'https://api.themoviedb.org/3/discover/movie?api_key=6b03720f12b1780deb6f627085df7549&with_genres=53&with_origin_country=IN&sort_by=popularity.desc';
      setSearchURL(url);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  const { data, loading, error } = useFetchAllData(searchURL);


  const [cardData, setCardData] = useState(null);
  const [cardPosition, setCardPosition] = useState({ x: null, y: null });
  const hoverTimeout = useRef(null);

  const finalData = data.filter(function (e) {
    return (e.poster_path || e.backdrop_path);
  });

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
        <div className='sm:ml-[85px] ml-[55px] py-8 sm:px-5 px-2 flex flex-col gap-12'>
          <div className='relative rounded-lg'>
            <input className='bg-[#252833] w-full sm:text-[21px] text-[18px] placeholder:text-[#8f98b2] text-[#8f98b2] font-medium sm:py-4.5 py-3.5 rounded-lg sm:pl-17 pl-12 sm:pr-5 pr-2
           focus:outline-none border-none' type="search" value={inputValue} placeholder='Movies, shows and more' onChange={function (e) {
                setInputValue(e.target.value);
              }} />
            <span className='absolute sm:left-5 left-3 top-[30%] sm:text-[30px] text-[25px]'><IoSearch /></span>
          </div>
          <div className='flex flex-col gap-2'>
            <h1 className='text-[22px] font-medium'>{inputValue ? `Search Results for "${inputValue}"` : 'Trending in india'}</h1>
            {!loading && finalData.length === 0 && <div className='flex justify-center items-center flex-col mt-5'>
              <img className='max-w-[150px]' src={errorImg} alt="error" />
              <h1 className='relative bottom-20 md:text-3xl text-2xl font-medium sm:w-[400px] text-center px-2'>Couldn't find what you are looking for!</h1>
            </div>}
            {loading ? <LoadingBrowseSection loopCount={70} /> :
              <div className='justify-center items-center flex-wrap gap-x-2 sm:gap-y-7 gap-y-3 grid 2xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-3'>
                {finalData?.map(function (value, index) {
                  const slug = (value.title || value.name || value.original_name)?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return <div key={index}>
                    <Link to={`/multi/${slug}/${value.id}`} className='flex sm:hidden'>
                      <img className='rounded-lg cursor-pointer bg-[#282a31]' src={`https://image.tmdb.org/t/p/original${value.poster_path}`} alt={value.title || value.name || "Poster"}
                        onClick={function () {
                          window.scrollTo({ top: 0 });
                        }} />
                    </Link>

                    <img className='hidden sm:flex rounded-lg cursor-pointer bg-[#282a31]' src={`https://image.tmdb.org/t/p/original${value.poster_path}`} alt={value.title || value.name || "Poster"}
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
                      onClick={function () {
                        setMovieId(value.id);
                      }} />
                  </div>
                })}
              </div>}
          </div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Explore
