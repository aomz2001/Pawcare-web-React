import { useNavigate } from "react-router-dom"
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
    const [petId, setPetId] = useState<number>(0);
    const [districtId, setDistrictId] = useState<number>(0);
    const [serviceId, setServiceId] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responsePet = await axios.get('http://localhost:3000/pet');
                setPetData(responsePet.data);
                const responseDistrict = await axios.get('http://localhost:3000/district');
                setDistrictData(responseDistrict.data);
                const responseService = await axios.get('http://localhost:3000/service');
                setServiceData(responseService.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log('error message: ', error.message);
                } else {
                    console.log('unexpected error: ', error);
                }
            }
        };
        fetchData();
    }, []);
    const handleSearch = async () => {
        if (petId && districtId && serviceId) {
            try {
                const searchParams = new URLSearchParams({
                    petId: petId.toString(),
                    districtId: districtId.toString(),
                    serviceId: serviceId.toString()
                });
    
                navigate(`/search-service?${searchParams.toString()}`);
            } catch (error) {
                console.error("Error in handleSearch:", error);
            }
        } else {
            console.log("Please select values for all options");
            alert('โปรดเลือกข้อมูลให้ครบ');
        }
    };

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
                            <div className='flex flex-col '>
                                <select
                                    className='mb-5 pl-6 h-[43px] rounded-full cursor-pointer'
                                    onChange={(e) => setPetId(Number(e.target.value))}
                                >
                                    <option value="pet" className='' hidden>สัตว์เลี้ยง</option>
                                    {petData?.map((pet) => (
                                        <option key={pet.pet_id} value={pet.pet_id}>
                                            {pet.pet_name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className='mb-5 pl-6 h-[43px] rounded-full cursor-pointer'
                                    onChange={(e) => setDistrictId(Number(e.target.value))}
                                >
                                    <option value="district" className='' hidden>อำเภอ</option>
                                    {districtData?.map((district) => (
                                        <option key={district.district_id} value={district.district_id}>
                                            {district.district_name}
                                        </option>
                                    ))}
                                </select>
                                <select
                                    className='mb-5 pl-6 h-[43px] rounded-full cursor-pointer'
                                    onChange={(e) => setServiceId(Number(e.target.value))}
                                >
                                    <option value="service" className='' hidden>บริการ</option>
                                    {serviceData?.map((service) => (
                                        <option key={service.service_id} value={service.service_id}>
                                            {service.service_name}
                                        </option>
                                    ))}
                                </select>
                                <Buttons
                                    label="ค้นหา"
                                    buttonType="primary"
                                    className="w-20 p-2 rounded-full mb-14"
                                    onClick={handleSearch}
                                />
                            </div>
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