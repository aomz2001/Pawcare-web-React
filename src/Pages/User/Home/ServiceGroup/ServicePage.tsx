import { ServiceCard, ServiceCardGroup } from "./ServiceCard"

const serviceList : ServiceCardGroup[] = [
    {
        id: 1,
        img: null ,
        title: 'บริการฝากเลี้ยงค้างคืน',
        subtitle: 'บริการรับฝากสัตว์เลี้ยงพร้อมการดูแลอย่างใกล้ชิดตลอด 24 ชั่วโมง ทำให้มั่นใจได้ว่าสัตว์เลี้ยงตัวโปรดจะมีความสุขและจะปลอดภัย',
        color: '#2D2D2D'
    },
    {
        id: 2,
        img: null,
        title: 'บริการเดินเล่น',
        subtitle: 'ในวันที่คุณยุ่งๆ กับภาระกิจหลายอย่าง คุณสามารถใช้บริการของเราพาสัตว์เลี้ยงไปเดินเล่น เหมาะสำหรับสัตว์เลี้ยงที่มีพลังงานเหลือเฟือที่จะเผาผลาญและช่วยคลายความเครียด',
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
        subtitle: 'การให้ความสำคัญกับการอาบน้ำตัดขนสุนัขและแมวอย่างสม่ำเสมอ เพื่อป้องกันการเกิดกลิ่นไม่พึงประสงค์และรักษาความสะอาดให้กับสุนัขและแมวของคุณ',
        color: '#8A8178'
    },
    {
        id: 6,
        img: null,
        title: 'บริการรับ-ส่ง',
        subtitle: 'หากต้องการส่งสัตว์เลี้ยงของท่านไปยังจุดหมายปลายทางตามวันและช่วงเวลาที่ต้องการ Pawcare พร้อมให้บริการ !!!',
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