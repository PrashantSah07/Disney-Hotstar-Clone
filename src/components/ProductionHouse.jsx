import disney from '../assets/images/disney.png'
import pixar from '../assets/images/pixar.png'
import marvel from '../assets/images/marvel.png'
import starwars from '../assets/images/starwars.png'
import nationalgeography from '../assets/images/nationalgeographic.png'

import disneyVideo from '../assets/videos/disney.mp4'
import pixarVideo from '../assets/videos/pixar.mp4'
import marvelVideo from '../assets/videos/marvel.mp4'
import starwarsVideo from '../assets/videos/starwars.mp4'
import nationalgeographyVideo from '../assets/videos/nationalgeographic.mp4'

const items = [
    { image: disney, video: disneyVideo },
    { image: pixar, video: pixarVideo },
    { image: marvel, video: marvelVideo },
    { image: starwars, video: starwarsVideo },
    { image: nationalgeography, video: nationalgeographyVideo },
]

const ProductionHouse = () => {
    return (
        <div className='hidden md:grid grid-cols-5 justify-center items-center xl:gap-5 gap-2 xl:mx-16 mx-6 '>
            {items.map(function (value, index) {
                return <div key={index} className={`group border-2 rounded-xl border-[#ffffff7a] hover:border-white bg-[#0f1014] hover:scale-[1.05] duration-250 flex justify-center items-center relative shadow-2xl shadow-black`}>
                    <video className="absolute top-0 left-0 w-full h-full object-cover -z-10 rounded-xl" src={value.video} autoPlay loop muted playsInline />
                    <img src={value.image} alt={value.image} className='group-hover:opacity-50 duration-200' />
                </div>
            })}
        </div>
    )
}

export default ProductionHouse
