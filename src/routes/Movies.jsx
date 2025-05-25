import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import useFetchAllData from '../hooks/useFetchAllData';
import useFetchDetailed from '../hooks/useFetchDetailed';
import Footer from '../components/Footer'
import { FaPlay } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { IoMdRefresh } from "react-icons/io";
import { motion } from 'framer-motion';
import GenresSection from '../components/GenresSection';
import TopTenInIndia from '../components/TopTenInIndia'
import errorImg from '../assets/images/soul-custom-error.webp'

import LoadingEffect from '../components/LoadingEffect';

const Movies = () => {

  const { data: dataa, loading: loadingg, error: errorr } = useFetchAllData(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=6b03720f12b1780deb6f627085df7549'
  );

  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!dataa || dataa.length === 0) return;
    const randomIndex = Math.floor(Math.random() * dataa.length);
    const selected = dataa[randomIndex];

    const API_KEY = '6b03720f12b1780deb6f627085df7549';
    const APPEND = 'images';

    const checkType = async () => {
      try {

        const tvRes = await fetch(
          `https://api.themoviedb.org/3/movie/${selected.id}?api_key=${API_KEY}`
        );

        if (tvRes.ok) {
          setUrl(
            `https://api.themoviedb.org/3/movie/${selected.id}?api_key=${API_KEY}&append_to_response=${APPEND}`
          );
        } else {
          console.error('Invalid ID for Movie');
        }
      } catch (err) {
        setError(err);
      }
    };

    checkType();
  }, [dataa]);

  const { data, loading, error, setError } = useFetchDetailed(url);

  const movieNameLogo = data.images?.logos?.find(e => e.file_path);
  const [title, setTitle] = useState(false);
  const slug = (data?.title || data?.original_title)?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const api_key = '6b03720f12b1780deb6f627085df7549';

  return (
    <div className="bg-gradient-to-b from-[#16181f] to-[#0f1014] text-white min-h-screen">
      <Navbar />
      <div className="sm:ml-[85px] ml-[55px] pb-8">

        {error || errorr ? <div className=''>{
          <div className='flex justify-center items-center flex-col min-h-screen'>
            <img className='max-w-[150px]' src={errorImg} alt="error" />
            <h1 className='relative bottom-20 md:text-3xl text-2xl font-medium sm:w-[400px] text-center px-2'>{error || errorr}</h1>
            <button className='relative bottom-10 flex items-center gap-2 bg-[#e1e6f0] text-black text-[18px] rounded-lg sm:px-20 px-15 py-3 font-semibold hover:scale-[1.02] duration-200' onClick={function () {
              window.location.reload();
            }}><IoMdRefresh size={25} /> Retry</button>
          </div>
        }</div> :
          <div>
            {loading ? <div className='flex flex-col gap-5 max-w-[3000px] mx-auto relative'>
              <div className='w-full xl:h-[700px] lg:h-[650px] md:h-[500px] sm:h-[400px] h-[250px] bg-gray-800 animate-pulse rounded-2xl flex'>
              </div>
              <div className='lg:hidden flex flex-col gap-7 w-full px-2'>
                <p className='md:w-[40%] w-[80%] h-8 bg-gray-800 animate-pulse rounded-lg'></p>
                <p className='md:w-[30%] w-[60%] h-7 bg-gray-800 animate-pulse rounded-lg'></p>
                <p className='md:w-[25%] w-[50%] h-5 bg-gray-800 animate-pulse rounded-lg'></p>
                <p className='md:w-[90%] w-[100%] lg:h-20 h-10 bg-gray-800 animate-pulse rounded-lg'></p>
                <p className='md:w-[30%] w-[80%] h-5 bg-gray-800 animate-pulse rounded-lg'></p>
                <p className='md:w-[50%] w-[90%] h-7 bg-gray-800 animate-pulse rounded-lg'></p>
                <div className='flex gap-2 md:w-[70%] w-[90%]'>
                  <p className='w-[90%] h-15 bg-gray-800 animate-pulse rounded-lg'></p>
                  <p className='md:w-[10%] w-[60px] h-15 bg-gray-800 animate-pulse rounded-lg'></p>
                </div>
              </div>
              <LoadingEffect loopCount={20} />
              <LoadingEffect loopCount={20} />
              <LoadingEffect loopCount={20} />
              <LoadingEffect loopCount={20} />
            </div> :
              <div className='max-w-[3000px] mx-auto flex flex-col gap-10'>
                <div className="relative">
                  <img
                    src={`https://image.tmdb.org/t/p/original${data.backdrop_path || data.poster_path}`}
                    alt={data.name || data.original_name || 'poster'}
                    className="rounded-lg max-w-full flex w-[100vw] bg-[#282a31]"
                  />
                  <div className='lg:absolute top-0 h-full xl:w-[50%] lg:w-[70%] lg:pl-10 lg:pr-0 pr-2 pl-2 pb-10 lg:pt-0 pt-10 flex flex-col justify-end xl:gap-5 lg:gap-2 gap-5 bg-gradient-to-r from-[#000000] to-[#ffffff00]'>
                    {movieNameLogo ? <img className='xl:max-w-[300px] lg:max-w-[200px] w-[30%] lg:static absolute sm:top-7 sm:left-7 left-5 top-5 z-10' src={`https://image.tmdb.org/t/p/original${movieNameLogo.file_path}`} alt="" /> :
                      <p className="text-xl font-bold">{data.title || data.original_title}</p>
                    }
                    <ul className='flex sm:flex-nowrap flex-wrap items-center gap-2 list-disc list-inside lg:mt-6 text-[19px] font-bold'>
                      {(data.release_date || data.first_air_date) && (
                        <li className='list-none'>{data.release_date.slice(0, 4) || data.first_air_date.slice(0, 4)}</li>
                      )}
                      {data.runtime && (
                        <li>{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</li>
                      )}
                      {data.popularity && (
                        <li>Popularity: {data.popularity.toFixed(1)}</li>
                      )}
                      {data.spoken_languages && (
                        <li>{data.spoken_languages.length} Language{data.spoken_languages.length > 1 ? 's' : ''}</li>
                      )}
                    </ul>
                    <div className="flex flex-wrap gap-6 text-sm font-semibold">
                      {data.budget && <span>Budget: ${data.budget.toLocaleString()}</span>}
                      {data.revenue && <span>Revenue: ${data.revenue.toLocaleString()}</span>}
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      {data?.spoken_languages?.[0]?.english_name && (
                        <p className="">{data.spoken_languages[0].english_name}</p>
                      )}
                      {data?.spoken_languages?.[0]?.name && (
                        <p className="before:content-['-'] before:mx-2">{data.spoken_languages[0].name}</p>
                      )}
                    </div>
                    <p className='lg:line-clamp-4 md:line-clamp-3 line-clamp-4'>{data.overview}</p>
                    {data.status && <p>{data.status}</p>}
                    <div className="flex flex-wrap text-[16px]">
                      {data.genres?.map((e, i) => (
                        <span className={`${i !== data.genres.length - 1 && "after:content-['|'] after:mx-2"} font-bold`} key={i}>{e.name}</span>
                      ))}
                    </div>

                    <div className="flex gap-2 relative lg:w-[60%] sm:w-[70%] w-[90%]">
                      <Link className="w-full" to={`/multi/${slug}/${data.id}`}>
                        <button className="w-full bg-gradient-to-r from-[#138df9] via-[#914fd3] to-[#ff007b] text-sm font-semibold flex justify-center items-center gap-2 px-5 py-4 rounded-lg">
                          <FaPlay size={12} /> Watch Now
                        </button>
                      </Link>
                      <button
                        className="bg-[#1c1d21b1] p-4 rounded-lg"
                        onMouseEnter={() => setTitle(true)}
                        onMouseLeave={() => setTitle(false)}
                      >
                        <FaPlus />
                      </button>
                      {title && (
                        <motion.div
                          className="absolute px-3 py-2 text-sm bg-[#0e0e0e] text-white rounded-lg -top-12 left-[78%]"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                          Watchlist
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-5'>
                  <GenresSection heading={'Comedy Movies'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=35&with_original_language=hi`} />
                  <GenresSection heading={'Crime Movies'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=80&with_original_language=hi`} />
                  <GenresSection heading={"Thriller Movies"} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=53&with_original_language=hi&sort_by=release_date.desc`} />
                  <GenresSection heading={"Popular Movies"} url={`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&with_original_language=hi`} />
                  <GenresSection heading={"Romance Movies"} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=10749&with_original_language=hi&sort_by=release_date.desc&sort_by=popularity.desc`} />
                  <TopTenInIndia heading={'Top 10 Movies - Hindi'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_original_language=hi&sort_by=popularity.desc&page=1`} />
                  <GenresSection heading={"Dark Movies"} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=53,27&sort_by=popularity.desc`} />
                  <GenresSection heading={"Documentary Movies"} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=99&sort_by=popularity.desc&with_original_language=hi`} />
                  <GenresSection heading={"Mystery Movies"} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=9648&sort_by=popularity.desc&with_original_language=hi`} />
                  <GenresSection heading={"Fantasy Movies"} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=14&sort_by=popularity.desc&with_original_language=hi`} />
                  <GenresSection heading={"Historic Movies"} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=14&sort_by=popularity.desc&with_original_language=hi`} />
                  <GenresSection heading={"Popular Kids Movies"} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=10751,16&sort_by=popularity.desc`} />
                </div>
              </div>
            }</div>}

        <Footer />
      </div>
    </div>
  );
};

export default Movies;
