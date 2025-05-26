import React, { useRef } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Studios = ({ heading, items }) => {
    const elementRef = useRef(null);

    function slideLeft(e) {
        e.scrollLeft -= 500;
    }

    function slideRight(e) {
        e.scrollLeft += 500;
    }

    const categories = {
        Hotstar: 5339,
        Disney: 2,
        HBO: 49,
        Peacock: 2552,
        Paramount: 4,
        Marvel: 420,
        Pixar: 3,
        Starwars: 1892,
        National: 384,

        English: 'en',
        Hindi: 'hi',
        Tamil: 'ta',
        Telugu: 'te',
        Malayalam: 'ml',
        Bengali: 'bn',
        Marathi: 'mr',
        Kannada: 'kn',
        Odia: 'or',
        Japanese: 'ja',
        Korean: 'ko',

        Romance: 10749,
        Drama: 18,
        Family: 10751,
        Reality: 10764,
        Comedy: 35,
        Crime: 80,
        Action: 28,

        "Star Plus": 1024,
        "Colors": 1033,
        "Star Utsav": 3936,
        "Star Bharat": 1071,
        "Star Vijay": 3917,
        "Star Maa": 3916,
        "Star Pravah": 3915,
        "Star Jalsha": 3914,
        "Colors Kannada": 3934,
        "Colors Suvarna": 3918,
        "Asianet": 1082,
        "Colors Marathi": 3933,
        "Colors Gujrati": 3931,
        "Colors Bangla": 3932,
        "Nick": 355,
        "MTV": 33,
        "Abc Studio": 2
    };

    const buildUrl = (name) => {
        const id = categories[name];

        if ([5339, 2, 49, 2552, 4, 420, 3, 1892, 384].includes(id)) {
            return `https://api.themoviedb.org/3/discover/movie?api_key=6b03720f12b1780deb6f627085df7549&with_companies=${id}`;
        }

        if (typeof id === 'string' && id.length === 2) {
            return `https://api.themoviedb.org/3/discover/movie?api_key=6b03720f12b1780deb6f627085df7549&with_original_language=${id}`;
        }

        if ([10749, 18, 10751, 10764, 35, 80, 28].includes(id)) {
            return `https://api.themoviedb.org/3/discover/movie?api_key=6b03720f12b1780deb6f627085df7549&with_genres=${id}`;
        }

        if (
            [
                1024, 1033, 3936, 1071, 3917, 3916, 3915, 3914,
                3934, 3918, 1082, 3933, 3931, 3932, 355, 33, 2
            ].includes(id)
        ) {
            return `https://api.themoviedb.org/3/discover/tv?api_key=6b03720f12b1780deb6f627085df7549&with_networks=${id}`;
        }

        return `https://api.themoviedb.org/3/discover/movie?api_key=6b03720f12b1780deb6f627085df7549&sort_by=popularity.desc`;
    };

    return (
        <div className="flex flex-col xl:px-5 gap-2 justify-center sm:pt-5 pt-2">
            <button
                className="hidden md:flex absolute xl:mx-1 mx-2 mt-[50px] z-1"
                onClick={() => slideLeft(elementRef.current)}
            >
                <FaAngleLeft color="white" size={30} />
            </button>
            <button
                className="hidden md:flex absolute xl:mx-10 mx-2 mt-[50px] right-0 z-1"
                onClick={() => slideRight(elementRef.current)}
            >
                <FaAngleRight color="white" size={30} />
            </button>

            <h1 className="sm:text-2xl text-[20px] font-semibold">{heading}</h1>
            <div ref={elementRef} className="flex gap-2 overflow-x-auto scroll-smooth hide-scrollbar">
                {items.map((value, index) => (
                    <div key={index} className="xl:py-3">
                        <Link to="/browse" state={{ heading: value.name, url: buildUrl(value.name) }}>
                            <img
                                src={value.src}
                                alt={`studio-${index}`}
                                className="lg:max-w-[270px] sm:max-w-[220px] max-w-[180px] rounded-sm ease-out xl:hover:scale-[1.15] xl:hover:duration-200 shadow-3xl xl:hover:delay-200 xl:duration-100"
                                onClick={function () {
                                    window.scrollTo({ top: 0 });
                                }} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Studios;
