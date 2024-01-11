
const Hero = () => {
    return (
        <>
            <section>
                <div className=" bg-[url('/src/assets/image/main.jpg')] h-[782px] bg-cover bg-no-repeat w-full " >
                    <div className="container">
                        <div className="flex flex-col pt-40 ">
                            <h3 className='text-white text-xl pl-24 sm:pl-40 max-[768px]:text-lg'>Dog & Cat Service</h3>
                            <h1 className='text-white text-7xl pl-10 max-[768px]:text-6xl sm:pl-20 p-7 '>PAWCARE</h1>
                            <h3 className='text-white text-xl pl-16 sm:pl-28 max-[768px]:text-lg '>Take Care Your “ True Friend ” </h3>
                        </div>
                    </div>
                </div>
                <div id='findmentor' className="h-[121px] bg-[#8A8178]"></div>
            </section>
        </>
    )
}

export default Hero