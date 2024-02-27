import { GuideBookCard, GuideBookProps } from "./GuideBookCard"

const guideBookList : GuideBookProps[] = [
    {
        id: 1,
        img: <img src='/src/assets/image/serach.png' className='h-28' alt='' />,
        title: 'ค้นหาการบริการ',
        subtitle: 'กรองการค้นหาเพื่อให้ได้ข้อมูลการบริการที่คุณต้องการ',
    },
    {
        id: 2,
        img: <img src='/src/assets/image/people.png' className='h-28' alt='' />,
        title: 'เลือกพี่เลี้ยง',
        subtitle: 'เลือกพี่เลี้ยงที่คุณต้องการให้ดูแลเจ้าตัวน้อยสี่ขาของคุณ',
    },
    {
        id: 3,
        img: <img src='/src/assets/image/calendar.png' className='h-28' alt='' />,
        title: 'ส่งคำขอใช้บริการและการจอง',
        subtitle: 'จองและกำหนดวันเวลาที่ต้องการจะรับบริการ',
    },
    {
        id: 4,
        img: <img src='/src/assets/image/check-mark.png' className='h-28' alt='' />,
        title: 'ยืนยันการใช้บริการ',
        subtitle: 'ยืนยันการข้อมูลการบริการต่างๆและรอรับบริการได้เลย',
    },
]

const GuideBook = () => {
    return (
        <>
            <section className="bg-[#8A8178]">
                <div className="container grid md:justify-center  md:grid-cols-2 gap-7 min-[1040px]:grid-cols-4 py-[80px] ">
                    {guideBookList.map(item => <GuideBookCard key={item.id} detail={item} />)}
                </div>
            </section>
        </>
    )
}

export default GuideBook