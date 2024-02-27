import { ServiceCard, ServiceCardGroup } from "./ServiceCard"

const serviceList : ServiceCardGroup[] = [
    {
        id: 1,
        img: null ,
        title: 'บริการฝากเลี้ยงค้างคืน',
        subtitle: 'หากต้องการคนดูแลสัตว์เลี้ยงขณะที่คุณไม่อยู่บ้านหรือมีธุระที่ไม่สามารถดูแลเจ้าตัวน้อยได้ลองให้เราช่วยหาผู้ช่วยดูสิ....',
        color: '#2D2D2D'
    },
    {
        id: 2,
        img: null,
        title: 'บริการเดินเล่น',
        subtitle: 'หากต้องการคนดูแลสัตว์เลี้ยงขณะที่คุณไม่อยู่บ้านหรือมีธุระที่ไม่สามารถดูแลเจ้าตัวน้อยได้ลองให้เราช่วยหาผู้ช่วยดูสิ....',
        color: '#584E4E'
    },
    {
        id: 3,
        img: <div className="bg-[url('/src/assets/image/petincar.jpg')] bg-cover"></div>,
        title: null,
        subtitle: null,
        color: null
    },
    {
        id: 4,
        img: <div className="bg-[url('/src/assets/image/servicegroup.png')] bg-cover"></div>,
        title: null,
        subtitle: null,
        color: null
    },
    {
        id: 5,
        img: null,
        title: 'บริการอาบน้ำทำความสะอาด',
        subtitle: 'หากต้องการคนดูแลสัตว์เลี้ยงขณะที่คุณไม่อยู่บ้านหรือมีธุระที่ไม่สามารถดูแลเจ้าตัวน้อยได้ลองให้เราช่วยหาผู้ช่วยดูสิ....',
        color: '#8A8178'
    },
    {
        id: 6,
        img: null,
        title: 'บริการรับ-ส่ง',
        subtitle: 'หากต้องการคนดูแลสัตว์เลี้ยงขณะที่คุณไม่อยู่บ้านหรือมีธุระที่ไม่สามารถดูแลเจ้าตัวน้อยได้ลองให้เราช่วยหาผู้ช่วยดูสิ....',
        color: '#2D2D2D'
    },
]

const ServicePage = () => {
    return (
        <>
            <section className="bg-[#E0DAD3]">
                <div id='services' className="container flex justify-center">
                    <div className="grid sm:grid-cols-2  lg:max-w-[910px] lg:max-h-[910px] py-32 text-white lg:grid-cols-3">
                    {serviceList.map(item => <ServiceCard key={item.id} detail={item} />)}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ServicePage