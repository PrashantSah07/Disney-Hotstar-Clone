import React from 'react'

const LoadingBrowseSection = ({ loopCount }) => {
    const card = new Array(loopCount).fill(null);
    return (
        <div className='flex flex-col md:gap-15 sm:gap-10 gap-7 my-8 sm:overflow-auto overflow-hidden'>

            <div className='justify-center items-center flex-wrap gap-x-2 sm:gap-y-7 gap-y-3 grid 2xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 grid-cols-3'>
                {card.map(function (_, i) {
                    return <div key={i} className='bg-gray-800 xl:min-w-[180px] lg:h-[250px] lg:min-w-[150px] sm:min-w-[130px] min-w-[100px] md:h-[220px] sm:h-[200px] h-[150px] rounded-lg animate-pulse'></div>
                })}
            </div>

        </div>
    )
}

export default LoadingBrowseSection
