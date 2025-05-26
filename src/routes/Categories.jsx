import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import TV from '../assets/browse/TV.webp'
import Movie from '../assets/browse/Movie.webp'

import Studios from '../components/Studios';

import marvel from '../assets/studios/marvel.webp'
import disney from '../assets/studios/disney.webp'
import hbo from '../assets/studios/hbo.avif'
import hotstar from '../assets/studios/hotstar-specials.avif'
import national from '../assets/studios/national-g.webp'
import paramount from '../assets/studios/paramount.avif'
import peacock from '../assets/studios/peacock.avif'
import pixar from '../assets/studios/pixar.webp'
import starwars from '../assets/studios/star-wars.webp'

import hindi from '../assets/popularLanguage/hindi.webp';
import english from '../assets/popularLanguage/english.webp';
import tamil from '../assets/popularLanguage/tamil.webp';
import telugu from '../assets/popularLanguage/telugu.webp';
import malayalam from '../assets/popularLanguage/malayalam.webp';
import bengali from '../assets/popularLanguage/bengali.webp';
import marathi from '../assets/popularLanguage/marathi.webp';
import kannada from '../assets/popularLanguage/kannada.webp';
import odia from '../assets/popularLanguage/odia.webp';
import japanese from '../assets/popularLanguage/japanese.webp';
import korean from '../assets/popularLanguage/korean.webp';

import romance from '../assets/popularGenres/romance.webp';
import drama from '../assets/popularGenres/drama.webp';
import family from '../assets/popularGenres/family.webp';
import reality from '../assets/popularGenres/reality.webp';
import comedy from '../assets/popularGenres/comedy.webp';
import crime from '../assets/popularGenres/crime.webp';
import action from '../assets/popularGenres/action.webp';

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
import { Link } from 'react-router-dom';

const studios = [
  { src: hotstar, name: 'Hotstar' },
  { src: disney, name: 'Disney' },
  { src: hbo, name: 'HBO' },
  { src: peacock, name: 'Peacock' },
  { src: paramount, name: 'Paramount' },
  { src: marvel, name: 'Marvel' },
  { src: pixar, name: 'Pixar' },
  { src: starwars, name: 'Starwars' },
  { src: national, name: 'National' }
];

const PopuLanguage = [
  { src: hindi, name: 'Hindi' },
  { src: english, name: 'English' },
  { src: tamil, name: 'Tamil' },
  { src: telugu, name: 'Telugu' },
  { src: malayalam, name: 'Malayalam' },
  { src: bengali, name: 'Bengali' },
  { src: marathi, name: 'Marathi' },
  { src: kannada, name: 'Kannada' },
  { src: odia, name: 'Odia' },
  { src: japanese, name: 'Japanese' },
  { src: korean, name: 'Korean' }
];

const PopuGenres = [
  { src: romance, name: 'Romance' },
  { src: drama, name: 'Drama' },
  { src: family, name: 'Family' },
  { src: reality, name: 'Reality' },
  { src: comedy, name: 'Comedy' },
  { src: crime, name: 'Crime' },
  { src: action, name: 'Action' }
];

const PopuChannels = [
  { src: starPlus, name: 'Star Plus' },
  { src: colors, name: 'Colors' },
  { src: starUtsav, name: 'Star Utsav' },
  { src: starBharat, name: 'Star Bharat' },
  { src: star3, name: 'Star Vijay' },
  { src: star2, name: 'Star Maa' },
  { src: starPravah, name: 'Star Pravah' },
  { src: star1, name: 'Star Jalsha' },
  { src: colors1, name: 'Colors Kannada' },
  { src: star4, name: 'Colors Suvarna' },
  { src: asianet, name: 'Asianet' },
  { src: colorsMarathi, name: 'Colors Marathi' },
  { src: colorsGujrati, name: 'Colors Gujrati' },
  { src: colorsBengali, name: 'Colors Bangla' },
  { src: nick, name: 'Nick' },
  { src: mtv, name: 'MTV' },
  { src: abcStudio, name: 'Abc Studio' }
];


const Categories = () => {
  return (
    <div className='bg-[linear-gradient(180deg,_rgba(2,0,31,1)_2%,_rgba(30,0,15,1)_7%,_rgba(15,16,20,1)_19%,_rgba(15,16,20,1)_100%)] text-white'>
      <Navbar />
      <div className='sm:ml-[80px] ml-[52px] sm:py-8 py-2 px-2'>
        <div className='flex flex-col xl:gap-0 gap-5 md:pt-20 pt-15 max-w-[3000px] mx-auto justify-center sm:min-h-screen'>
          <div className='flex flex-col gap-2 xl:px-5'>
            <h1 className="sm:text-2xl text-[20px] font-semibold">Browse</h1>
            <div className='flex items-center gap-2 overflow-x-auto hide-scrollbar xl:py-3'>
              <Link to='/shows'>
                <img className='lg:max-w-[270px] sm:max-w-[220px] max-w-[180px] rounded-sm ease-out xl:hover:scale-[1.15] xl:hover:duration-200 shadow-3xl xl:hover:delay-200 xl:duration-100' src={TV} alt="TV"
                  onClick={function () {
                    window.scrollTo({ top: 0 });
                  }} />
              </Link>
              <Link to='/movies'>
                <img className='lg:max-w-[270px] sm:max-w-[220px] max-w-[180px] rounded-sm ease-out xl:hover:scale-[1.15] xl:hover:duration-200 shadow-3xl xl:hover:delay-200 xl:duration-100' src={Movie} alt="Movie"
                  onClick={function () {
                    window.scrollTo({ top: 0 });
                  }} />
              </Link>
            </div>
          </div>
          <Studios heading={'Studios'} items={studios} />
          <Studios heading={'Popular Languages'} items={PopuLanguage} />
          <Studios heading={'Popular Genres'} items={PopuGenres} />
          <Studios heading={'Popular Channels'} items={PopuChannels} />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Categories
