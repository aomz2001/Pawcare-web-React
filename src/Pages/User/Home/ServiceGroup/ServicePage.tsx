

const ServicePage = () => {
    return (
        <>
            <section className="bg-[#E0DAD3]">
                <div id='services' className="container flex justify-center">
                    <div className="grid sm:grid-cols-2  lg:max-w-[910px] lg:max-h-[910px] py-32 text-white lg:grid-cols-3">
                        <div className="bg-[#272222] p-10 ">
                            <h2 className='text-3xl pb-6'>บริการฝากเลี้ยงค้างคืน</h2>
                            <p className=''>หากต้องการคนดูแลสัตว์เลี้ยงขณะที่คุณไม่อยู่บ้านหรือมีธุระที่ไม่สามารถดูแลเจ้าตัวน้อยได้ลองให้เราช่วยหาผู้ช่วยดูสิ....</p>
                        </div>
                        <div className="bg-[#584E4E] p-10 ">
                            <h2 className='text-3xl pb-6'>บริการเดินเล่น</h2>
                            <p className=''>หากต้องการคนดูแลสัตว์เลี้ยงขณะที่คุณไม่อยู่บ้านหรือมีธุระที่ไม่สามารถดูแลเจ้าตัวน้อยได้ลองให้เราช่วยหาผู้ช่วยดูสิ....</p>
                        </div>
                        <div className="bg-[url('/src/assets/image/petincar.jpg')] bg-cover "></div>
                        <div className="bg-[url('/src/assets/image/servicegroup.png')] bg-cover "></div>
                        <div className="bg-[#8A8178] p-10 ">
                            <h2 className='text-3xl pb-6'>บริการอาบน้ำทำความสะอาด</h2>
                            <p className=''>หากต้องการคนดูแลสัตว์เลี้ยงขณะที่คุณไม่อยู่บ้านหรือมีธุระที่ไม่สามารถดูแลเจ้าตัวน้อยได้ลองให้เราช่วยหาผู้ช่วยดูสิ....</p>
                        </div>
                        <div className="bg-[#272222] p-10 ">
                            <h2 className='text-3xl pb-6'>บริการรับ-ส่ง</h2>
                            <p className=''>หากต้องการคนดูแลสัตว์เลี้ยงขณะที่คุณไม่อยู่บ้านหรือมีธุระที่ไม่สามารถดูแลเจ้าตัวน้อยได้ลองให้เราช่วยหาผู้ช่วยดูสิ....</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServicePage