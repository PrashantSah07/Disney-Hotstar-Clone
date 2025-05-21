import React from 'react'

const LoadingEffect = ({ loopCount }) => {

    const loading = new Array(loopCount).fill(null);

    return (
        <div className='flex items-center overflow-auto gap-3 overflow-x-auto scroll-smooth hide-scrollbar pt-5 '>

            {loading.map(function (_, i) {
                return <div key={i} className='bg-gray-800 xl:min-w-[200px] lg:h-[250px] lg:min-w-[180px] sm:min-w-[130px] min-w-[100px]  sm:h-[190px] h-[150px] rounded-lg animate-pulse'>
                </div>
            })}

        </div>
    )
}

export default LoadingEffect
