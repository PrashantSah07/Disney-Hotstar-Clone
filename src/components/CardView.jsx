import React, { useState } from 'react'
import { FaLeaf, FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';

const CardView = ({ data, setCardData, position }) => {
    if (!data) return null;

    const cardWidth = 350;
    const top = position.y - 70;

    let left = position.x - cardWidth / 2;

    const ninetyPercent = window.innerWidth * 0.90;
    if (position.x > ninetyPercent) {
        left = ninetyPercent - cardWidth;
        if (left < 0) left = 0;
    }

    const ninetyPercenttt = window.innerWidth * 0.20;
    if (position.x < ninetyPercenttt) {
        left = ninetyPercenttt - 150;
    }

    const [title, setTitle] = useState(false);
    const slug = (data?.title || data?.name || data?.original_name)?.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return (
        <motion.div
            className="bg-[#16181f] shadow-2xl rounded-lg w-[350px] text-white xl:flex flex-col justify-center items-center absolute z-10 hidden"
            style={{ top: `${top}px`, left: `${left}px` }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onMouseEnter={() => setCardData(data)}
            onMouseLeave={() => setCardData(null)}
            exit={{ scale: 0.8, opacity: 0 }}
        >
            <img
                className='rounded-tl-lg rounded-tr-lg object-cover object-center w-full max-h-[200px] bg-[#282a31]'
                src={`https://image.tmdb.org/t/p/original${data?.backdrop_path || data?.poster_path}`}
                alt={data.title || data.name || "Poster"}
            />

            <div className='w-full px-2.5 py-2 flex flex-col gap-2'>
                <div className='flex gap-1.5 relative'>
                    <Link className='w-[90%]' to={`/multi/${slug}/${data.id}`}>
                        <button className='bg-white text-black w-full text-[15px] font-semibold flex justify-center items-center gap-2 px-4 py-3 rounded-lg'
                            onClick={function () {
                                window.scrollTo({ top: 0 });
                            }}>
                            <FaPlay size={12} /> Watch Now
                        </button></Link>
                    <button className='bg-[#282a31] text-white px-4 rounded-lg' onMouseEnter={function () {
                        setTitle(true);
                    }} onMouseLeave={function () {
                        setTitle(false);
                    }}><FaPlus /></button>
                    {title && <motion.div className='absolute px-3 py-2 text-[15px] bg-[#0e0e0e] text-white rounded-lg -top-11.5 right-3 ' initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}>Watchlist</motion.div>}
                </div>

                <p className='text-[14px] font-semibold'>
                    {data.title || data.original_title || data.name || data.original_name}
                </p>

                <p className='flex items-center justify-start w-full gap-2 text-[14px] font-semibold'>
                    <li className='list-none' >{data.first_air_date?.slice(0, 4) || data.release_date?.slice(0, 4)}</li>
                    {data.origin_country && <li>{data.origin_country}</li>}
                    {data.original_language && <li>{data.original_language.toUpperCase()}</li>}
                </p>

                <p className='text-[14px] line-clamp-4'>{data.overview}</p>
            </div>
        </motion.div>
    )
}

export default CardView;
