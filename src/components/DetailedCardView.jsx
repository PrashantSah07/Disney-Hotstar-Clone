import React, { useEffect, useState } from 'react';
import useFetchDetailed from '../hooks/useFetchDetailed';
import { IoClose } from 'react-icons/io5';
import { FaPlay } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import errorImg from '../assets/images/soul-custom-error.webp'
import { IoMdRefresh } from "react-icons/io";

const DetailedCardView = ({ movieId, setMovieId }) => {
    if (!movieId) return null;
    const [url, setUrl] = useState("");

    useEffect(() => {
        const API_KEY = '6b03720f12b1780deb6f627085df7549';
        const APPEND = 'videos,credits,images,recommendations,reviews';

        const checkType = async () => {
            try {
                const movieRes = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
                );
                if (movieRes.ok) {
                    setUrl(
                        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=${APPEND}`
                    );
                    return;
                }

                const tvRes = await fetch(
                    `https://api.themoviedb.org/3/tv/${movieId}?api_key=${API_KEY}`
                );
                if (tvRes.ok) {
                    setUrl(
                        `https://api.themoviedb.org/3/tv/${movieId}?api_key=${API_KEY}&append_to_response=${APPEND}`
                    );
                } else {
                    console.error("Invalid ID for both movie and TV");
                }
            } catch (err) {
                setError(err);
            }
        };

        checkType();
    }, [movieId]);

    const { data, loading, error, setError } = useFetchDetailed(url);

    useEffect(() => {
        if (movieId) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [movieId]);

    const [title, setTitle] = useState(false);
    const movieNameLogo = data.images?.logos?.find(e => e.file_path);
    const slug = (data?.title || data?.name || data?.original_name)?.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return (
        <div
            className="bg-[#000000d0] text-white fixed inset-0 z-[100] flex justify-center items-center px-2"
            onClick={() => setMovieId(null)}
        >
            <motion.div
                className="relative w-full xl:max-w-[1000px] max-w-[80%] max-h-[90vh] rounded-2xl"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            >

                {error ? <div className='h-[78vh] w-full bg-[#1a1a1a] rounded-2xl flex flex-col justify-center items-center relative'>
                    <img className='max-w-[150px]' src={errorImg} alt="error" />
                    <h1 className='relative bottom-20 text-xl font-medium'>{error.message}</h1>
                    <button className='relative bottom-10 flex items-center gap-2 bg-[#e1e6f0] text-black text-[18px] rounded-lg px-20 py-3 font-semibold hover:scale-[1.02] duration-200' onClick={function () {
                        window.location.reload();
                    }}><IoMdRefresh size={25} /> Retry</button>
                    <button
                        className="absolute top-4 right-4 z-10 bg-black/50 bg-opacity-40 p-2 rounded-full"
                        onClick={() => setMovieId(null)}>
                        <IoClose size={30} />
                    </button>
                </div> :
                    <div>
                        {loading ? (
                            <div className="w-full lg:h-[100%] h-[90vh] aspect-video overflow-y-auto bg-[#1a1a1a] rounded-2xl relative lg:overflow-hidden">
                                <div className='h-[350px] md:h-[400px] lg:h-[562px] bg-[#262728] animate-pulse'>

                                </div>
                                <div className="lg:absolute top-0 flex flex-col gap-4 w-full lg:w-[50%] lg:h-full px-6 py-10 lg:bg-gradient-to-r lg:from-[#0f1014] lg:via-[#0f1014ae] lg:to-[#ffffff00] bg-gradient-to-t from-[#0f1014] via-[#0f1014] to-[#0f1014e2]">
                                    <div className="flex flex-col gap-3 animate-pulse">
                                        <div className="w-[60%] h-6 bg-[#333] rounded" />
                                        <div className="w-[40%] h-4 bg-[#333] rounded" />
                                        <div className="flex gap-4">
                                            <div className="w-20 h-4 bg-[#333] rounded" />
                                            <div className="w-20 h-4 bg-[#333] rounded" />
                                        </div>
                                    </div>
                                    <div className="w-[80%] h-20 bg-[#333] rounded" />
                                    <div className="flex gap-2">
                                        <div className="w-16 h-6 bg-[#333] rounded" />
                                        <div className="w-16 h-6 bg-[#333] rounded" />
                                        <div className="w-16 h-6 bg-[#333] rounded" />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="lg:w-[70%] w-full h-10 bg-[#444] rounded" />
                                        <div className="w-10 h-10 bg-[#333] rounded" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative w-full lg:max-h-full max-h-[90vh] overflow-y-auto">
                                {(data?.backdrop_path || data?.poster_path) ? (
                                    <img
                                        className="w-full object-cover lg:rounded-2xl rounded-t-2xl h-[350px] md:h-[400px] lg:h-[562px] bg-[#282a31]"
                                        src={`https://image.tmdb.org/t/p/original${data.backdrop_path || data.poster_path}`}
                                        alt={data.title || data.name || 'Poster'}
                                    />
                                ) : (
                                    <div className="w-full bg-[#1a1a1a] lg:rounded-2xl rounded-t-2xl h-[350px] md:h-[400px] lg:h-[562px] flex items-center justify-center ">
                                        <p className="text-gray-400 text-sm">No Image Available</p>
                                    </div>
                                )}

                                <button
                                    className="absolute top-4 right-4 z-10 bg-black/50 bg-opacity-40 p-2 rounded-full"
                                    onClick={() => setMovieId(null)}>
                                    <IoClose size={30} />
                                </button>
                                <div className="lg:absolute top-0 lg:w-[50%] h-full lg:pl-10 pl-5 lg:pr-0 pr-5 lg:py-8 py-5 flex flex-col gap-4 lg:bg-gradient-to-r lg:from-[#0f1014] lg:via-[#0f1014ae] lg:to-[#ffffff00] bg-gradient-to-t from-[#0f1014] via-[#0f1014] to-[#0f1014e2] lg:rounded-2xl rounded-b-2xl lg:pb-0 pb-10">
                                    <div className="flex flex-col gap-3">
                                        <div className='lg:static absolute top-5'>
                                            {movieNameLogo ? <img className='lg:max-w-[300px] max-w-[30%]' src={`https://image.tmdb.org/t/p/original${movieNameLogo.file_path}`} alt="" /> :
                                                <p className="text-xl font-bold">{data.title || data.name || data.original_name}</p>}
                                        </div>

                                        <ul className='flex items-center gap-2 list-disc list-inside lg:mt-6'>
                                            {data.release_date && <li className="font-medium list-none">{data.release_date?.slice(0, 4)}</li>}
                                            {data.runtime && <li className=''>{Math.floor(data.runtime / 60)}h {(data.runtime % 60)}m</li>}
                                            {data.popularity && <li className="">{data.popularity?.toFixed(1)}</li>}
                                            {data.spoken_languages && <li>{data.spoken_languages?.length} Languages</li>}
                                        </ul>

                                        <div className="flex items-center text-sm font-medium">
                                            {data?.spoken_languages?.[0]?.english_name && (
                                                <p className="">{data.spoken_languages[0].english_name}</p>
                                            )}
                                            {data?.spoken_languages?.[0]?.name && (
                                                <p className="before:content-['-'] before:mx-2">{data.spoken_languages[0].name}</p>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-sm text-[#ded5d5] line-clamp-4">{data.overview}</p>
                                    <div className="flex flex-wrap text-[14px]">
                                        {data.genres?.map((e, i) => (
                                            <span className={`${i !== data.genres.length - 1 && "after:content-['|'] after:mx-2"} font-semibold`} key={i}>{e.name}</span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2 relative">
                                        <Link className="w-full" to={`/multi/${slug}/${movieId}`}>
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
                        )}</div>
                }
            </motion.div>
        </div>
    );
};

export default DetailedCardView;
