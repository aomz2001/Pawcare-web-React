
// type Props = {}

const GuideBook = () => {
    return (
        <>
            <section className="bg-[#8A8178] h-auto">
                <div className="container grid md:justify-center md:items-center md:grid-cols-2 gap-7 min-[1040px]:grid-cols-4 py-[75px] ">
                    <div className="">
                        <div className="bg-[#D9D9D9] max-w-[245px] h-[245px] rounded-full z-10">
                            <div className="absolute h-20 w-20 bg-[#7B6161] rounded-full pl-[30px] pt-[20px] text-3xl text-white">1</div>
                            <div className="flex justify-center pt-16">
                                <img src='/src/assets/image/serach.png' className='h-28' alt='' />
                            </div>
                        </div>
                        <div className="pt-[13px] pl-4 pr-4">
                            <h3 className='text-3xl text-white '>ค้นหาการบริการ</h3>
                            <p className='pt-[13px]'>กรองการค้นหาเพื่อให้ได้ข้อมูลการบริการที่คุณต้องการ</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="bg-[#D9D9D9] max-w-[245px] h-[245px] rounded-full">
                            <div className="absolute h-20 w-20 bg-[#7B6161] rounded-full pl-[30px] pt-[20px] text-3xl text-white">2</div>
                            <div className="flex justify-center pt-16 ">
                                <img src='/src/assets/image/people.png' className='h-28' alt='' />
                            </div>
                        </div>
                        <div className='pt-[13px] pl-4 pr-4'>
                            <h3 className='text-3xl text-white'>เลือกพี่เลี้ยง</h3>
                            <p className='pt-[13px]'>เลือกพี่เลี้ยงที่คุณต้องการให้ดูแลเจ้าตัวน้อยสี่ขาของคุณ</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="bg-[#D9D9D9] max-w-[245px] h-[245px] rounded-full">
                            <div className="absolute h-20 w-20 bg-[#7B6161] rounded-full pl-[30px] pt-[20px] text-3xl text-white">3</div>
                            <div className="flex justify-center pt-16 ">
                                <img src='/src/assets/image/calendar.png' className='h-28' alt='' />
                            </div>
                        </div>
                        <div className='pt-[13px] pl-4 pr-4'>
                            <h3 className='text-3xl text-white'>จองและนัดพบ</h3>
                            <p className='pt-[13px]'>จองและกำหนดวันเวลาที่ต้องการจะรับบริการ</p>
                        </div>
                    </div>
                    <div className="">
                        <div className="bg-[#D9D9D9] max-w-[245px] h-[245px] rounded-full">
                            <div className="absolute h-20 w-20 bg-[#7B6161] rounded-full pl-[30px] pt-[20px] text-3xl text-white">4</div>
                            <div className="flex justify-center pt-16 ">
                                <img src='/src/assets/image/check-mark.png' className='h-28' alt='' />
                            </div>
                        </div>
                        <div className='pt-[13px] pl-4'>
                            <h3 className='text-3xl text-white'>ยืนยันการใช้บริการ</h3>
                            <p className='pt-[13px]'>ยืนยันการข้อมูลการบริการต่างๆและรอรับบริการได้เลย</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GuideBook