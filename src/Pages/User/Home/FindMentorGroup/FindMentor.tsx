import { useNavigate } from "react-router-dom"
import Buttons from "../../../../components/ItemsGroup/Button/Buttons"
import { useEffect, useState } from "react";
import axios from "axios";
import httpClient from "../../../../utils/httpClient";
import './FindMentor.style.css'
import { Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";

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
                const responsePet = await httpClient.get('public/pet');
                setPetData(responsePet.data);
                const responseDistrict = await httpClient.get('public/district');
                setDistrictData(responseDistrict.data);
                const responseService = await httpClient.get('public/service');
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
                            <div className='flex flex-col gap-y-5 mb-14'>
                                <Select
                                    className="find-mentor"
                                    placeholder='สัตว์เลี้ยง'
                                    onChange={(value) => setPetId(Number(value))}
                                    options={petData?.map((pet) => ({
                                        value: pet.pet_id,
                                        label: pet.pet_name
                                    }))}
                                />
                                <Select
                                    className="find-mentor"
                                    placeholder='อำเภอ'
                                    onChange={(value) => setDistrictId(Number(value))}
                                    options={districtData?.map((district) => ({
                                        value: district.district_id,
                                        label: district.district_name
                                    }))}
                                />
                                <Select
                                    className="find-mentor"
                                    placeholder='บริการ'
                                    onChange={(value) => setServiceId(Number(value))}
                                    options={serviceData?.map((service) => ({
                                        value: service.service_id,
                                        label: service.service_name
                                    }))}
                                />
                                <div className="flex justify-end">
                                    <Buttons
                                        label="ค้นหา"
                                        buttonType="primary"
                                        className="text-white w-32 p-2 rounded-full flex justify-center items-center gap-x-1"
                                        onClick={handleSearch}
                                        icon={<><SearchOutlined className="text-white cursor-pointer" onClick={handleSearch} /></>}
                                    />
                                </div>
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