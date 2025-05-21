import React from 'react'

const LoadingEffect2 = ({ loopCount }) => {
    const loading = new Array(loopCount).fill(null);

    return (
        <div className='flex items-center lg:gap-10 gap-7 overflow-x-auto scroll-smooth hide-scrollbar pt-5 px-7'>

            {loading.map(function (_, i) {
                return <div key={i} className='bg-gray-800 lg:min-w-[250px] lg:h-[170px] md:min-w-[150px] md:h-[180px] sm:min-w-[120px] min-w-[100px]   sm:h-[170px] h-[150px] rounded-lg animate-pulse'>
                </div>
            })}

        </div>
    )
}

export default LoadingEffect2
