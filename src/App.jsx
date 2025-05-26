import React from 'react'
import Navbar from './components/Navbar'
import Slider from './components/Slider';
import ProductionHouse from './components/ProductionHouse';
import GenresSection from './components/GenresSection';
import TopTenInIndia from './components/TopTenInIndia';
import Studios from './components/Studios';

import marvel from './assets/studios/marvel.webp'
import disney from './assets/studios/disney.webp'
import hbo from './assets/studios/hbo.avif'
import hotstar from './assets/studios/hotstar-specials.avif'
import national from './assets/studios/national-g.webp'
import paramount from './assets/studios/paramount.avif'
import peacock from './assets/studios/peacock.avif'
import pixar from './assets/studios/pixar.webp'
import starwars from './assets/studios/star-wars.webp'

import hindi from './assets/popularLanguage/hindi.webp';
import english from './assets/popularLanguage/english.webp';
import tamil from './assets/popularLanguage/tamil.webp';
import telugu from './assets/popularLanguage/telugu.webp';
import malayalam from './assets/popularLanguage/malayalam.webp';
import bengali from './assets/popularLanguage/bengali.webp';
import marathi from './assets/popularLanguage/marathi.webp';
import kannada from './assets/popularLanguage/kannada.webp';
import odia from './assets/popularLanguage/odia.webp';
import japanese from './assets/popularLanguage/japanese.webp';
import korean from './assets/popularLanguage/korean.webp';

import romance from './assets/popularGenres/romance.webp';
import drama from './assets/popularGenres/drama.webp';
import family from './assets/popularGenres/family.webp';
import reality from './assets/popularGenres/reality.webp';
import comedy from './assets/popularGenres/comedy.webp';
import crime from './assets/popularGenres/crime.webp';
import action from './assets/popularGenres/action.webp';

import starPlus from './assets/popularChannels/star-plus.webp';
import colors from './assets/popularChannels/colors.avif';
import starUtsav from './assets/popularChannels/star-utsav.webp';
import starBharat from './assets/popularChannels/star-bharat.webp';
import star3 from './assets/popularChannels/star3.webp';
import star2 from './assets/popularChannels/star2.webp';
import starPravah from './assets/popularChannels/star-pravah.webp';
import star1 from './assets/popularChannels/star1.webp';
import colors1 from './assets/popularChannels/colors1.avif';
import star4 from './assets/popularChannels/star4.webp';
import asianet from './assets/popularChannels/asianet.webp';
import colorsMarathi from './assets/popularChannels/colors-marathi.avif';
import colorsGujrati from './assets/popularChannels/colors-gujrati.avif';
import colorsBengali from './assets/popularChannels/colors-bengali.avif';
import nick from './assets/popularChannels/nick.avif'
import mtv from './assets/popularChannels/mtv.avif'
import abcStudio from './assets/popularChannels/abc-studio.webp'
import Footer from './components/Footer';

const App = () => {
  const api_key = '6b03720f12b1780deb6f627085df7549';

  const today = new Date();
  const priorDate = new Date();
  priorDate.setDate(today.getDate() - 30);
  const formatDate = (date) => date.toISOString().split("T")[0];


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

  return (
    <div className='bg-[#0f1014] text-white'>
      <Navbar />
      <div className='sm:ml-[85px] ml-[55px] flex flex-col gap-5'>
        <Slider />
        <ProductionHouse />
        <GenresSection heading={'Latest Releases'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&primary_release_date.gte=${formatDate(priorDate)}&primary_release_date.lte=${formatDate(today)}`} />
        <GenresSection heading={'Latest Indian Releases'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_origin_country=IN&primary_release_date.gte=${formatDate(priorDate)}&primary_release_date.lte=${formatDate(today)}`} />
        <GenresSection heading={'Popular Shows'} url={`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_origin_country=IN&sort_by=popularity.desc`} />
        <GenresSection heading={'Advanture Movies'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=12`} />
        <GenresSection heading={'Blockbuster Movies'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=revenue.desc&vote_count.gte=1000`} />
        <GenresSection heading={'Blockbuster Indian Movies'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&region=IN&sort_by=revenue.desc&with_original_language=hi`} />
        <GenresSection heading={'Popular Movies'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_origin_country=IN&sort_by=popularity.desc`} />
        <TopTenInIndia heading={'Top 10 in India Today - Hindi'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&primary_release_date.gte=${formatDate(priorDate)}&primary_release_date.lte=${formatDate(today)}&with_origin_country=IN`} />
        <GenresSection heading={'Popular in Kids'} url={`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_genres=16,10762&sort_by=popularity.desc`} />
        <GenresSection heading={"Kid's Corner"} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=16,10751&sort_by=popularity.desc`} />
        <GenresSection heading={"Marvel Movies"} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_companies=420&sort_by=popularity.desc`} />
        <Studios heading={'Studios'} items={studios} />
        <GenresSection heading={'Popular in Thriller'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=53&with_origin_country=IN&sort_by=popularity.desc`} />
        <GenresSection heading={'Popular in Crime'} url={`https://api.themoviedb.org/3/discover/tv?api_key=6b03720f12b1780deb6f627085df7549&with_origin_country=IN&with_genres=80&sort_by=popularity.desc`} />
        <GenresSection heading={'Upcoming Movies'} url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&region=IN&primary_release_date.gte=${formatDate(today)}&sort_by=primary_release_date.asc`} />
        <GenresSection heading={'Most Loved Romentic K-Drama'} url={`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_genres=10749&with_original_language=ko&sort_by=popularity.desc`} />
        <Studios heading={'Popular Languages'} items={PopuLanguage} />
        <Studios heading={'Popular Genres'} items={PopuGenres} />
        <Studios heading={'Popular Channels'} items={PopuChannels} />
        <GenresSection heading={'Rejoice Anime Fans!'} url={`https://api.themoviedb.org/3/discover/tv?api_key=${api_key}&with_genres=16,10759&with_original_language=ja&sort_by=popularity.desc`} />
        <GenresSection heading={'Disney Movies'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_companies=2&sort_by=popularity.desc`} />
        <GenresSection heading={'Popular in Documentary'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_origin_country=IN&with_genres=99&sort_by=popularity.desc`} />
        <GenresSection heading={'Horror Movies'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_origin_country=IN&with_genres=27&sort_by=popularity.desc`} />
        <GenresSection heading={'Mystry Movies'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=9648&sort_by=popularity.desc`} />
        <GenresSection heading={'War'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_origin_country=IN&with_genres=10752&sort_by=popularity.desc`} />
        <GenresSection heading={'Popular Wastern Movies'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=37&sort_by=popularity.desc`} />
        <GenresSection heading={'Science Fiction'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=878&sort_by=popularity.desc&primary_release_date.gte=${formatDate(priorDate)}&primary_release_date.lte=${formatDate(today)}`} />
        <GenresSection heading={'Music'} url={`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=10402&sort_by=popularity.desc`} />
        <Footer />
      </div>
    </div>
  )
}

export default App
