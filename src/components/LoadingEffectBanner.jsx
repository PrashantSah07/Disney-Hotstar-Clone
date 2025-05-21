import React from 'react'

const LoadingEffectBanner = ({ loopCount }) => {
    const loading = new Array(loopCount).fill(null);

    return (
        <div className='flex overflow-x-auto w-full xl:px-16 px-6 py-4 hide-scrollbar scroll-smooth gap-5'>

            {loading.map(function (_, i) {
                return <div key={i} className='bg-gray-800 min-w-full md:h-[310px] h-[150px] rounded-lg animate-pulse'>
                </div>
            })}

        </div>
    )
}

export default LoadingEffectBanner
