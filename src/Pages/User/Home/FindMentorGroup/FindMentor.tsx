import { Link } from "react-router-dom"
import Buttons from "../../../../components/ItemsGroup/Button/Buttons"
import { useEffect, useState } from "react";
import axios from "axios";

type FindMentorProps = {
    pet_id: number;
    pet_name: string;
    district_id: number;
    district_name: string;
    service_id: number;
    service_name: string;
    price_id: number;
    price_name: string;
}

const FindMentor = () => {
    const [petData, setPetData] = useState<FindMentorProps[]>([]);
    const [districtData, setDistrictData] = useState<FindMentorProps[]>([]);
    const [serviceData, setServiceData] = useState<FindMentorProps[]>([]);
    const [priceData, setPriceData] = useState<FindMentorProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePet = await axios.get('http://localhost:3000/pet');
                setPetData(responsePet.data);
                const responseDistrict = await axios.get('http://localhost:3000/district');
                setDistrictData(responseDistrict.data);
                const responseService = await axios.get('http://localhost:3000/service');
                setServiceData(responseService.data);
                const responsePrice = await axios.get('http://localhost:3000/price');
                setPriceData(responsePrice.data);
                setError(null);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log('error message: ', error.message);
                    setError(error.message);
                } else {
                    console.log('unexpected error: ', error);
                    setError('An unexpected error occurred');
                }
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <section className="bg-[#2D2D2D] h-auto">
                <div className="container flex flex-wrap">
                    <div className="pt-[55px] ">
                        <div className=" max-w-[664px]">
                            <h2 className='text-white text-[40px] pb-[33px]'>กำลังต้องการผู้ช่วยดูแลเจ้าเหมียวเจ้าตูบของคุณอยู่ใช่หรือเปล่า...</h2>
                        </div>
                        <p className='text-white pb-[33px] '>ให้เราช่วยคุณหาผู้ช่วยใกล้ๆคุณสิ</p>
                        <div className="max-w-[335px]">
                            <form method="post" className='flex flex-col '>
                                <select className='mb-5 pl-6 h-[43px] rounded-full cursor-pointer '>
                                    <option value="pet" className='' hidden>สัตว์เลี้ยง</option>
                                    {petData?.map((pet) => (
                                        <option key={pet.pet_id} value={pet.pet_id}>
                                            {pet.pet_name}
                                        </option>
                                    ))}
                                </select>
                                <select className='mb-5 pl-6  h-[43px] rounded-full cursor-pointer'>
                                    <option value="district" className='' hidden>อำเภอ</option>
                                    {districtData?.map((district) => (
                                        <option key={district.district_id} value={district.district_id}>
                                            {district.district_name}
                                        </option>
                                    ))}
                                </select>
                                <select className='mb-5 pl-6 h-[43px] rounded-full cursor-pointer'>
                                    <option value="service" className='' hidden>บริการ</option>
                                    {serviceData?.map((service) => (
                                        <option key={service.service_id} value={service.service_id}>
                                            {service.service_name}
                                        </option>
                                    ))}
                                </select>
                                <select className='mb-8 pl-6  h-[43px] rounded-full cursor-pointer'>
                                    <option value="price" className='' hidden>ราคา</option>
                                    {priceData?.map((price) => (
                                        <option key={price.price_id} value={price.price_id}>
                                            {price.price_name}
                                        </option>
                                    ))}
                                </select>
                                <Link to='/search-service'>
                                    <Buttons
                                        label="ค้นหา"
                                        buttonType="primary"
                                        className="w-20 p-2 rounded-full mb-10"
                                        onClick={() => { }}
                                    />
                                </Link>
                            </form>
                        </div>
                    </div>
                    <div className="pt-[75px] pl-28 max-[1250px]:hidden">
                        <img src='/src/assets/image/cat.png' alt='' />
                    </div>
                </div>
            </section>
        </>
    )
}

export default FindMentor