import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheck } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import playStore from '../assets/footer/play-store.webp'
import appStore from '../assets/footer/app-store.webp'

const Footer = () => {
    return (
        <div className='lg:flex grid md:grid-cols-3 grid-cols-1 lg:gap-0 lg:gap-y-0 gap-10 md:gap-y-20 gap-y-10 justify-between lg:pt-30 md:pt-15 pt-10 pb-5 text-[14px] text-[#8f98b2] xl:px-5'>
            <div className='flex flex-col md:gap-8 gap-4'>
                <h1 className='text-[16px] text-white font-medium'>Company</h1>
                <div className='flex flex-col gap-2'>
                    <Link>About Us</Link>
                    <Link>Careers</Link>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>&copy; 2025. All Rights Reserved.</p>
                    <p>Terms Of Use Privacy Policy FAQ</p>
                </div>
            </div>
            <div className=' flex flex-col md:gap-8 gap-4'>
                <h1 className='text-[16px] text-white font-medium' >View Website in</h1>
                <Link className='flex items-center gap-4'><FaCheck />English</Link>
            </div>
            <div className=' flex flex-col md:gap-8 gap-4'>
                <h1 className='text-[16px] text-white font-medium'>Need Help?</h1>
                <div className='flex flex-col gap-2'>
                    <Link>Visit Help Center</Link>
                    <Link>Share Feedback</Link>
                </div>
            </div>
            <div className=' flex flex-col md:gap-8 gap-6 lg:items-end lg:pr-10'>
                <h1 className='text-[16px] text-white font-medium'>Connect with Us</h1>
                <div className='flex gap-5 text-white lg:justify-center relative lg:right-10'>
                    <Link><FiFacebook size={27} /></Link>
                    <Link><FaXTwitter size={27} /></Link>
                </div>
                <div className='flex sm:flex-nowrap flex-wrap gap-2' >
                    <img className='sm:max-w-[130px] max-w-[110px]' src={playStore} alt="play-store" />
                    <img className='sm:max-w-[130px] max-w-[110px]' src={appStore} alt="app-store" />
                </div>
            </div>

        </div>
    )
}

export default Footer
