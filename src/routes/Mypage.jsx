import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FaAngleRight } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { PiPencilSimpleBold } from "react-icons/pi";
import profilelogo from '../assets/images/profile-logo.png'
import { FaCheck } from "react-icons/fa6";

const Mypage = () => {

  const [selected, setSelected] = useState(0);

  return (
    <div className='bg-[linear-gradient(180deg,_rgba(2,0,31,1)_2%,_rgba(30,0,15,1)_7%,_rgba(15,16,20,1)_19%,_rgba(15,16,20,1)_100%)] text-white'>
      <Navbar />
      <div className='sm:ml-[80px] ml-[52px] sm:py-8 py-2 sm:pl-5 pl-2 lg:pr-15 sm:pr-5 pr-2'>
        <div className='min-h-screen  mt-10  flex flex-col gap-10 max-w-[3000px] mx-auto'>

          <div className='flex md:gap-0 gap-5 md:flex-row flex-col justify-between lg:items-center'>
            <div className='flex flex-col md:items-start items-center gap-1'>
              <h1 className='flex items-center justify-center gap-2 lg:text-[21px] text-[18px] font-semibold text-center'>Subscribe to enjoy JioHotstar <FaAngleRight /></h1>
              <h1 className='lg:text-[18px] text-[16px] font-semibold'>+91 9********0</h1>
            </div>
            <div className='flex lg:flex-row flex-col lg:gap-6 gap-3 text-[18px] font-bold'>
              <div className='flex flex-col justify-center items-center gap-1'>
                <button className='w-full bg-[linear-gradient(106deg,_rgba(18,138,246,1)_18%,_rgba(100,57,158,1)_62%,_rgba(206,12,114,1)_89%)] py-3 rounded-lg px-16 hover:scale-[1.02] duration-300 lg:text-[16px] text-[15px]'>Subscribe</button>
                <p className='hidden lg:flex text-[14.5px] font-normal text-gray-500'>Plans start at ₹299</p>
              </div>
              <button className='bg-[#fff9f91a] px-5 py-3 flex justify-center items-center gap-2 rounded-lg h-fit hover:scale-[1.02] duration-300 hover:bg-[#fff9f93a] lg:text-[16px] text-[15px]'><IoSettingsOutline size={25} /> Help & Settings</button >
            </div>
          </div>
          <hr className='border-1 border-solid [border-image:linear-gradient(to_right,_#ffffff00,_#ffffff21,_#ffffff00)_1]' />

          <div className='flex justify-between  font-semibold'>
            <div className='flex flex-col gap-5'>
              <h1 className='text-[20px]'>Profiles</h1>
              <div className='flex sm:flex-row flex-col gap-8'>
                <div className='flex flex-col justify-center items-center gap-2 hover:scale-[1.1] duration-200 relative'>
                  <img key={0} className={`lg:w-[90px] w-[80px] rounded-full ${selected == 0 && 'border-2'}`} src={profilelogo} alt="profile-logo"
                    onClick={function () {
                      setSelected(0);
                    }}
                  />
                  <h1>Prashant Sah</h1>
                  {selected == 0 && <p className='absolute bottom-8 right-0 h-[32px] w-[32px] bg-white flex justify-center items-center rounded-full'><FaCheck color='black' size={18} /></p>}
                </div>
                <div className='flex flex-col justify-center items-center gap-2 hover:scale-[1.1] duration-200 relative'>
                  <img className={`lg:w-[90px] w-[80px] rounded-full ${selected == 1 && 'border-2'}`} src='https://img1.hotstarext.com/image/upload/w_200,h_200,c_fill/feature/profile/19_rebranded.png' alt="profile-logo"
                    onClick={function () {
                      setSelected(1);
                    }}
                  />
                  <h1>Kids</h1>
                  {selected == 1 && <p className='absolute bottom-8 right-0 h-[32px] w-[32px] bg-white flex justify-center items-center rounded-full'><FaCheck color='black' size={18} /></p>}
                </div>
                <div className='flex flex-col justify-center items-center gap-2 hover:scale-[1.1] duration-200 relative'>
                  <div className={`lg:w-[90px] lg:h-[90px] w-[80px] h-[80px] bg-[#252833] rounded-full flex justify-center items-center text-3xl font-bold ${selected == 2 && 'border-2'}`}
                    onClick={function () {
                      setSelected(2);
                    }}>+</div>
                  <h1>Add</h1>
                  {selected == 2 && <p className='absolute bottom-8 right-0 h-[32px] w-[32px] bg-white flex justify-center items-center rounded-full'><FaCheck color='black' size={18} /></p>}
                </div>
              </div>
            </div>
            <div>
              <button className='flex items-center gap-2 text-[18px]'><PiPencilSimpleBold size={20} /> Edit</button>
            </div>
          </div>

        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Mypage
