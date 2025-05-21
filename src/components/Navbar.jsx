import React, { useState } from 'react';
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { TbDeviceTv } from "react-icons/tb";
import { PiPopcorn } from "react-icons/pi";
import { BiCategory } from "react-icons/bi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaRunning } from "react-icons/fa";
import { LuVideo } from "react-icons/lu";
import logo from '../assets/logo.png'
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import profileLogo from '../assets/images/profile-logo.png'

const Navbar = () => {

    const [slide, setSlide] = useState(false);
    const items = [
        { logo: <AiFillHome size={20} />, name: 'Home', route: '' },
        { logo: <IoSearch size={20} />, name: 'Search', route: 'explore' },
        { logo: <TbDeviceTv size={20} />, name: 'TV', route: 'shows' },
        { logo: <PiPopcorn size={20} />, name: 'Movies', route: 'movies' },
        { logo: <FaRunning size={20} />, name: 'Sports', route: 'sports' },
        { logo: <LuVideo size={20} />, name: 'Sparks', route: 'creators' },
        { logo: <BiCategory size={20} />, name: 'Categories', route: 'categories' },
        { logo: <img className='w-[20px]' src={profileLogo} alt="profile-logo" />, name: 'My Space', route: 'mypage' },
    ];

    return (
        <>
            <div className={`flex flex-col justify-between items-start gap-10 sm:px-4 py-8 ${slide ? 'bg-[#0f1014]' : 'bg-[#0f1014]'} text-white w-fit h-screen fixed left-0  transition-colors duration-500 z-50`}>
                <img className='w-[50px]' src={logo} alt="" />
                <div className={`flex flex-col justify-center items-start gap-8 px-4`}
                    onMouseLeave={function () {
                        setSlide(false);
                    }}>
                    {items.map(function (value, index) {
                        return <NavLink to={`/${value.route}`} key={index} className={({ isActive }) =>
                            `flex justify-center items-center gap-5 cursor-pointer hover:text-white duration-75 ${isActive ? 'text-white' : 'text-gray-500'}`}>
                            <span className='' onMouseEnter={function () {
                                setSlide(true);
                            }}>{value.logo}</span>
                            {slide && <motion.span className='hidden xl:flex text-[19px] font-bold leading-5' initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 100 }} transition={{ duration: 0.5, ease: "easeInOut", }}>{value.name}</motion.span>}
                        </NavLink>
                    })}
                </div>
                <span></span>
            </div>

        </>
    );
};

export default Navbar;
