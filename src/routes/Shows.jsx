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
import errorImg from '../assets/images/soul-custom-error.webp'

import starPlus from '../assets/popularChannels/star-plus.webp';
import colors from '../assets/popularChannels/colors.avif';
import starUtsav from '../assets/popularChannels/star-utsav.webp';
import starBharat from '../assets/popularChannels/star-bharat.webp';
import star3 from '../assets/popularChannels/star3.webp';
import star2 from '../assets/popularChannels/star2.webp';
import starPravah from '../assets/popularChannels/star-pravah.webp';
import star1 from '../assets/popularChannels/star1.webp';
import colors1 from '../assets/popularChannels/colors1.avif';
import star4 from '../assets/popularChannels/star4.webp';
import asianet from '../assets/popularChannels/asianet.webp';
import colorsMarathi from '../assets/popularChannels/colors-marathi.avif';
import colorsGujrati from '../assets/popularChannels/colors-gujrati.avif';
import colorsBengali from '../assets/popularChannels/colors-bengali.avif';
import nick from '../assets/popularChannels/nick.avif'
import mtv from '../assets/popularChannels/mtv.avif'
import abcStudio from '../assets/popularChannels/abc-studio.webp'
import Studios from '../components/Studios';
import LoadingEffect from '../components/LoadingEffect';

const Shows = () => {

  const { data: dataa, loading: loadingg, error: errorr } = useFetchAllData(
    'https://api.themoviedb.org/3/trending/tv/day?api_key=6b03720f12b1780deb6f627085df7549'
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
          `https://api.themoviedb.org/3/tv/${selected.id}?api_key=${API_KEY}`
        );

        if (tvRes.ok) {
          setUrl(
            `https://api.themoviedb.org/3/tv/${selected.id}?api_key=${API_KEY}&append_to_response=${APPEND}`
          );
        } else {
          console.error('Invalid ID for TV Shows');
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
  const slug = (data?.name || data?.original_name)?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const api_key = '6b03720f12b1780deb6f627085df7549';
  const PopuChannels = [starPlus, colors, starUtsav, starBharat, star3, star2, starPravah, star1, colors1, star4, asianet, colorsMarathi, colorsGujrati, colorsBengali, nick, mtv, abcStudio];

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
              <div className='lg:grid md:grid-cols-2 grid-cols-1 gap-5 sm:px-5 px-1 hidden'>
                <div className='w-full xl:h-[650px] lg:h-[500px] md:h-[400px] sm:h-[300px] h-[200px] bg-gray-800 animate-pulse rounded-2xl flex'></div>
                <div className='w-full xl:h-[650px] lg:h-[500px] md:h-[400px] sm:h-[300px] h-[200px] bg-gray-800 animate-pulse rounded-2xl flex'></div>
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
                      <p className="text-xl font-bold">{data.name || data.original_name}</p>
                    }
                    <ul className='flex sm:flex-nowrap flex-wrap items-center gap-2 list-disc list-inside lg:mt-6 text-[19px] font-bold'>
                      {data.first_air_date && <li className="list-none">{data.first_air_date?.slice(0, 4)}</li>}
                      {data.episode_run_time?.length > 0 && <li className=''>Episode Runtime: {data.episode_run_time[0]}m</li>}
                      {data.popularity && <li className="">Popularity: {data.popularity?.toFixed(1)}</li>}
                      {data.spoken_languages && <li>{data.spoken_languages?.length} Languages</li>}
                    </ul>
                    <ul className='flex gap-3 list-disc'>
                      <li className='list-none'>{data.number_of_seasons} seasons</li>
                      <li className='list-inside'>{data.number_of_episodes} episodes</li>
                    </ul>
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
                <div className='grid md:grid-cols-2 grid-cols-1 gap-5 sm:px-5 px-1'>
                  {data?.next_episode_to_air?.still_path && <div className='flex flex-col gap-3'>
                    <h1 className='text-[24px] font-semibold'>Next episode to air</h1>
                    <img className='rounded-lg bg-[#282a31]' src={`https://image.tmdb.org/t/p/original${data.next_episode_to_air.still_path}`} alt="" />
                  </div>}
                  {data?.last_episode_to_air?.still_path && <div className='flex flex-col gap-3'>
                    <h1 className='text-[24px] font-semibold'>Last episode to air</h1>
                    <img className='rounded-lg bg-[#282a31]' src={`https://image.tmdb.org/t/p/original${data.last_episode_to_air.still_path}`} alt="" />
                  </div>}
                </div>
                <div className='flex flex-col gap-5'>
                  <GenresSection heading={'Must Watch Originals'} url={`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&sort_by=popularity.desc&with_networks=213`} />
                  <GenresSection heading={'Real Lives, Unlimited Drama'} url={`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_genres=18&sort_by=popularity.desc`} />
                  <GenresSection heading={"Shows You Can't Miss"} url={`https://api.themoviedb.org/3/trending/tv/week?api_key=${api_key}`} />
                  <GenresSection heading={"Top Rated TV Shows"} url={`https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}`} />
                  <GenresSection heading={"Kids Shows"} url={`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_genres=10762&sort_by=popularity.desc`} />
                  <Studios heading={'Popular Channels'} items={PopuChannels} />
                  <GenresSection heading={"Best of the West"} url={`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_genres=37&sort_by=vote_average.desc&vote_count.gte=100`} />
                  <GenresSection heading={"Reality Shows"} url={`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_genres=10764&with_original_language=hi&sort_by=popularity.desc`} />
                  <GenresSection heading={"Bingeworthy Drama Shows"} url={`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_genres=18&with_original_language=hi&sort_by=vote_average.desc&vote_count.gte=50`} />
                  <GenresSection heading={"Action Shows"} url={`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_original_language=hi&with_genres=10759&sort_by=popularity.desc`} />
                  <GenresSection heading={"Currently Airing TV Shows"} url={`https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&with_genres=27&sort_by=vote_count.desc&vote_average.gte=6`} />
                  <GenresSection heading={"TV Shows Airing Today"} url={`https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}&with_genres=27&sort_by=vote_count.desc&vote_average.gte=6`} />
                </div>
              </div>
            }</div>}

        <Footer />
      </div>
    </div>
  );
};

export default Shows;
