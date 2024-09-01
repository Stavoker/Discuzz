import React from 'react'

const LinkBlock = () => {
    return (
        <a href="">
            <div className=' py-6 flex flex-col justify-between w-full xl:max-w-[470px] min-h-[260px] rounded-[14px] cursor-pointer bg-image'>
                <div className='flex-center glassmorphism size-12 rounded-[10px] ml-4'>
                    <img src='../../public/icons/cr-icon.png' alt='' width={27} height={27}/>
                </div>
                <div className='flex flex-col gap-2 bg-black px-2 py-3'>
                    <h1 className='text-2xl font-bold'>Discuzz web-3</h1>
                    <p className='text-lg font-normal'>Crypto Application</p>
                </div>
            </div>
        </a>
    )
}

export default LinkBlock
