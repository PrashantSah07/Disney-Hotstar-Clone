import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import useFetchDetailed from '../hooks/useFetchDetailed';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AnimatePresence } from 'framer-motion';
import CardView from '../components/CardView';
import DetailedCardView from '../components/DetailedCardView';
import LoadingBrowseSection from '../components/LoadingBrowseSection';
import errorImg from '../assets/images/soul-custom-error.webp'
import { IoMdRefresh } from "react-icons/io";

const Multi = () => {
    const { id } = useParams();
    const [url, setUrl] = useState("");

    useEffect(() => {
        const API_KEY = '6b03720f12b1780deb6f627085df7549';
        const APPEND = 'videos,images,credits,recommendations,reviews,external_ids,release_dates,watch/providers,similar,keywords,translations';

        const checkType = async () => {
            try {
                const movieRes = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
                );
                if (movieRes.ok) {
                    setUrl(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=${APPEND}`
                    );
                    return;
                }

                const tvRes = await fetch(
                    `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`
                );
                if (tvRes.ok) {
                    setUrl(
                        `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&append_to_response=${APPEND}`
                    );
                } else {
                    setError('Invalid ID for both movie and TV');
                }
            } catch (err) {
                setError(err.message || 'Network error');
            }
        };
        checkType();
    }, [id]);

    const { data, loading, error, setError } = useFetchDetailed(url);

    useEffect(() => {
        if (data && data.length !== 0) {
            document.title = (data.title || data.name || data.original_title || data.original_name) + ' - JioHotstar';
        }
    }, [data]);

    const cast = data.credits?.cast?.filter(function (e) {
        return e.profile_path;
    })

    const crew = data.credits?.crew.filter(function (e) {
        return e.profile_path
    })

    const movieNameLogo = data.images?.logos?.find(e => e.file_path);

    const [cardData, setCardData] = useState(null);
    const [cardPosition, setCardPosition] = useState({ x: null, y: null });
    const hoverTimeout = useRef(null);
    const [movieId, setMovieId] = useState(null);


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
                <div className='sm:ml-[85px] ml-[55px] sm:py-8 pb-8 pt-3 sm:px-5 px-2'>
                    {error ? <div className='text-white'>
                        <div className='flex justify-center items-center flex-col mt-5 min-h-screen'>
                            <img className='max-w-[150px]' src={errorImg} alt="error" />
                            <h1 className='relative bottom-20 md:text-3xl text-2xl font-medium sm:w-[400px] text-center px-2'>{error || error.message}</h1>
                            <button className='relative bottom-10 flex items-center gap-2 bg-[#e1e6f0] text-black text-[18px] rounded-lg sm:px-20 px-15 py-3 font-semibold hover:scale-[1.02] duration-200' onClick={function () {
                                window.location.reload();
                            }}><IoMdRefresh size={25} /> Retry</button>
                        </div>
                    </div> :
                        <div>
                            {loading ? <div className='flex flex-col gap-5 max-w-[3000px] mx-auto'>
                                <div className='w-full h-[800px] bg-gray-800 animate-pulse rounded-2xl lg:flex hidden'>

                                </div>
                                <div className='flex lg:flex-row flex-col gap-5'>
                                    <div className='lg:w-[700px] w-full h-[650px] bg-gray-800 animate-pulse rounded-2xl flex'></div>
                                    <div className='flex flex-col gap-5 w-full'>
                                        <p className='lg:w-[30%] w-[80%] h-8 bg-gray-800 animate-pulse rounded-lg'></p>
                                        <p className='lg:w-[50%] w-[70%] h-7 bg-gray-800 animate-pulse rounded-lg'></p>
                                        <p className='lg:w-[20%] w-[40%] h-5 bg-gray-800 animate-pulse rounded-lg'></p>
                                        <p className='lg:w-[55%] w-[75%] h-7 bg-gray-800 animate-pulse rounded-lg'></p>
                                        <p className='lg:w-[80%] w-[90%] lg:h-20 h-15 bg-gray-800 animate-pulse rounded-lg'></p>
                                        <div className='flex items-center gap-4'>
                                            <p className='lg:w-[20%] w-[40%] h-10 bg-gray-800 animate-pulse rounded-lg'></p>
                                            <p className='lg:w-[20%] w-[40%] h-10 bg-gray-800 animate-pulse rounded-lg'></p>
                                        </div>
                                        <div className='flex items-center gap-4'>
                                            <p className='lg:w-[20%] w-[40%] h-7 bg-gray-800 animate-pulse rounded-lg'></p>
                                            <p className='lg:w-[30%] w-[50%] h-7 bg-gray-800 animate-pulse rounded-lg'></p>
                                        </div>
                                        <div className='flex items-center gap-4 flex-wrap mt-10'>
                                            {new Array(20).fill(null).map(function (_, i) {
                                                return <span key={i} className='lg:w-[100px] w-[80px] h-7 bg-gray-800 animate-pulse rounded-lg'></span>
                                            })}
                                        </div>
                                        <button className='bg-gray-800 h-10 rounded-lg w-[150px] mt-5 animate-pulse'></button>
                                    </div>
                                </div>
                                <LoadingBrowseSection loopCount={20} />
                            </div> :
                                <div className='flex flex-col gap-5 mx-auto max-w-[3000px]'>
                                    <div className='relative lg:flex flex-col justify-center items-center w-full hidden'>
                                        <img className='max-w-[100%] rounded-2xl bg-[#282a31]' src={`https://image.tmdb.org/t/p/original${data.backdrop_path || data.poster_path}`} alt={data.title || data.name || 'Poster'} />
                                        <div className='absolute top-5 left-5'>
                                            {movieNameLogo ? <img className='lg:max-w-[300px] max-w-[30%]' src={`https://image.tmdb.org/t/p/original${movieNameLogo.file_path}`} alt="" /> :
                                                <p className="text-xl font-bold">{data.title || data.name || data.original_name}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col lg:flex-row gap-8 md:p-6 p-3 bg-[#1f2126] rounded-3xl text-gray-200">
                                        <img
                                            className="w-full lg:w-[450px] rounded-3xl shadow-md object-cover bg-[#282a31]"
                                            src={`https://image.tmdb.org/t/p/original/${data.poster_path || data.backdrop_path}`}
                                            alt={data.title || data.name}
                                        />
                                        <div className="flex flex-col gap-5 flex-1">
                                            <h1 className="text-4xl font-bold text-white">{data.title || data.name || data.original_name}</h1>

                                            {data.tagline && (
                                                <h2 className="text-gray-400 text-lg">{data.tagline}</h2>
                                            )}

                                            {data.status && (
                                                <h3 className="text-yellow-500 font-semibold uppercase">{data.status}</h3>
                                            )}

                                            <ul className="flex flex-wrap items-center gap-4 list-disc list-inside text-sm text-gray-400 font-medium">
                                                {(data.release_date || data.first_air_date) && (
                                                    <li className='list-none'>{data.release_date || data.first_air_date}</li>
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

                                            <div className="flex font-medium text-gray-300">
                                                {data?.spoken_languages?.[0]?.english_name && (
                                                    <p>{data.spoken_languages[0].english_name}</p>
                                                )}
                                                {data?.spoken_languages?.[0]?.name && (
                                                    <p className="before:content-['–'] before:mx-2">{data.spoken_languages[0].name}</p>
                                                )}
                                            </div>

                                            <p className="text-gray-300 leading-relaxed line-clamp-10">{data.overview}</p>

                                            <div className="flex flex-wrap text-[14px]">
                                                {data.genres?.map((e, i) => (
                                                    <span className={`${i !== data.genres.length - 1 && "after:content-['|'] after:mx-2"} font-semibold`} key={i}>{e.name}</span>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap gap-6 text-sm font-semibold text-yellow-500">
                                                {data.budget && <span>Budget: ${data.budget.toLocaleString()}</span>}
                                                {data.revenue && <span>Revenue: ${data.revenue.toLocaleString()}</span>}
                                            </div>

                                            <div className="flex font-semibold text-gray-400">
                                                <span>{data.origin_country?.[0]?.toUpperCase()}</span>
                                                <span className="before:content-['-'] before:mx-2">{data.original_language?.toUpperCase()}</span>
                                            </div>

                                            {data.keywords?.keywords?.length > 0 && (
                                                <div>
                                                    <h2 className="text-xl font-semibold mb-3 text-gray-300">Keywords</h2>
                                                    <div className="flex flex-wrap gap-2">
                                                        {data.keywords.keywords.map((keyword, i) => (
                                                            <span
                                                                key={i}
                                                                className="text-[13px] bg-[#282a31] border border-gray-600 rounded-full px-3 py-1.5 hover:bg-gray-700 cursor-pointer transition-colors">
                                                                {keyword.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="">
                                                <a href={data.homepage} target="_blank" rel="noopener noreferrer">
                                                    <button className="bg-yellow-500 text-black px-6 py-2 rounded-xl font-semibold shadow hover:bg-yellow-600 transition">
                                                        Watch Now
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-5'>
                                        <h1 className='text-[20px] font-medium'>Images - Backdrops</h1>
                                        <div className='grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-2 gap-2'>
                                            {data.images?.backdrops?.map(function (e, i) {
                                                return <img className='bg-[#282a31] rounded-lg' key={i} src={`https://image.tmdb.org/t/p/original/${e.file_path}`} alt="poster" />
                                            })}
                                        </div>
                                    </div>
                                    {data.videos?.results.length > 0 &&
                                        <div className='flex flex-col gap-5'>
                                            <h2 className="text-[20px] font-medium">Videos</h2>
                                            <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4">
                                                {data.videos?.results?.slice(0, 6).map((video, i) => (
                                                    video.site === "YouTube" && (
                                                        <div key={i}>
                                                            <iframe
                                                                src={`https://www.youtube.com/embed/${video.key}`}
                                                                title={video.name}
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen
                                                                className="w-full h-[300px] rounded-lg shadow-md bg-[#282a31]"
                                                            ></iframe>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>}
                                    <div className="flex flex-col">
                                        <h1 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-2">Cast</h1>

                                        <div className="flex flex-wrap gap-8 justify-start">
                                            {cast?.map((actor, i) => (
                                                <div
                                                    key={i}
                                                    className="flex flex-col items-center text-center w-[80px] md:w-[100px] hover:scale-105 transform transition duration-300 cursor-pointer"
                                                >
                                                    <img
                                                        className="sm:w-[80px] w-[70px] sm:h-[80px] h-[70px] md:w-[100px] md:h-[100px] rounded-full object-cover object-top shadow-lg bg-[#282a31] border border-gray-600"
                                                        src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                                                        alt={actor.original_name || actor.name}
                                                        loading="lazy"
                                                    />
                                                    <div className="mt-3">
                                                        <p className="font-semibold text-white text-sm truncate max-w-[100px]" title={actor.original_name}>
                                                            {actor.original_name}
                                                        </p>
                                                        <p className="text-gray-400 text-xs mt-1 truncate max-w-[90px]" title={actor.character}>
                                                            {actor.character}
                                                        </p>
                                                        <p className="text-gray-500 text-xs mt-1">{actor.known_for_department}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {data.similar?.results?.length > 0 &&
                                        <div className='flex flex-col gap-2'>
                                            <h1 className='text-[22px] font-medium'>Similar</h1>
                                            <div className='justify-center items-center flex-wrap gap-x-2 sm:gap-y-7 gap-y-3 grid 2xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-3'>
                                                {data.similar?.results?.map(function (similar, index) {
                                                    const slug = (similar.title || similar.name || similar.original_name)?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                                    return <div key={index}>

                                                        <Link to={`/multi/${slug}/${similar.id}`} className='flex sm:hidden'>
                                                            <img className='rounded-lg cursor-pointer bg-[#282a31]' src={`https://image.tmdb.org/t/p/original/${similar.poster_path || similar.backdrop_path}`} alt={similar.name || similar.title || similar.original_name || 'poster'} onClick={function () {
                                                                window.scrollTo({ top: 0 });
                                                            }} />
                                                        </Link>

                                                        <img className='hidden sm:flex rounded-lg cursor-pointer bg-[#282a31]' src={`https://image.tmdb.org/t/p/original/${similar.poster_path || similar.backdrop_path}`} alt={similar.name || similar.title || similar.original_name || 'poster'}
                                                            onMouseEnter={(e) => {
                                                                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                                                                const rect = e.currentTarget.getBoundingClientRect();
                                                                const x = rect.left + rect.width / 2 + window.scrollX;
                                                                const y = rect.top + window.scrollY;

                                                                hoverTimeout.current = setTimeout(() => {
                                                                    setCardData(similar);
                                                                    setCardPosition({ x, y });
                                                                }, 1000);

                                                            }}
                                                            onMouseLeave={() => {
                                                                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                                                                setCardData(null);
                                                            }} onClick={function () {
                                                                setMovieId(similar.id);
                                                            }} />
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    }
                                    {data.recommendations?.results?.length > 0 &&
                                        <div className='flex flex-col gap-2'>
                                            <h1 className='text-[22px] font-medium'>Recommendations</h1>
                                            <div className='justify-center items-center flex-wrap gap-x-2 sm:gap-y-7 gap-y-3 grid 2xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-3'>
                                                {data.recommendations?.results?.map(function (recommendations, index) {
                                                    const slug = (recommendations.title || recommendations.name || recommendations.original_name)?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                                    return <div key={index}>

                                                        <Link to={`/multi/${slug}/${recommendations.id}`} className='flex sm:hidden'>
                                                            <img className='rounded-lg cursor-pointer bg-[#282a31]' src={`https://image.tmdb.org/t/p/original/${recommendations.poster_path || recommendations.backdrop_path}`} alt={recommendations.name || recommendations.title || recommendations.original_name || 'poster'} onClick={function () {
                                                                window.scrollTo({ top: 0 });
                                                            }} />
                                                        </Link>

                                                        <img className='hidden sm:flex rounded-lg cursor-pointer bg-[#282a31]' src={`https://image.tmdb.org/t/p/original/${recommendations.poster_path || recommendations.backdrop_path}`} alt={recommendations.name || recommendations.title || recommendations.original_name || 'poster'}
                                                            onMouseEnter={(e) => {
                                                                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                                                                const rect = e.currentTarget.getBoundingClientRect();
                                                                const x = rect.left + rect.width / 2 + window.scrollX;
                                                                const y = rect.top + window.scrollY;

                                                                hoverTimeout.current = setTimeout(() => {
                                                                    setCardData(recommendations);
                                                                    setCardPosition({ x, y });
                                                                }, 1000);

                                                            }}
                                                            onMouseLeave={() => {
                                                                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
                                                                setCardData(null);
                                                            }} onClick={function () {
                                                                setMovieId(recommendations.id);
                                                            }} />
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    }
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default Multi
