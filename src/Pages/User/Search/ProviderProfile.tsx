import { Link, useParams, useSearchParams } from "react-router-dom";
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import axios from "axios";

type ProviderProfileData = {
    provider_id: number;
    provider_firstname: string;
    provider_lastname: string;
    service_id: string;
    service_name: string;
    district_name: string;
};

export const ProviderProfile = () => {
    const { provider_id } = useParams();
    const [providerProfileData, setProviderProfileData] = useState<ProviderProfileData[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                if (provider_id) {
                    const response = await axios.get(`http://localhost:3000/api/provider-data/${provider_id}`);
                    setProviderProfileData(response.data);
                }
            } catch (error) {
                console.error("Error fetching provider data:", error);
            }
        };

        if (provider_id) {
            fetchProviderData();
        }
    }, [provider_id]);

    useEffect(() => {
        if (provider_id) {
            setSearchParams({ provider_id });
        }
    }, [provider_id, setSearchParams]);
    console.log('providerProfileData', providerProfileData)

    return (
        <div className="bg-[#FFF8EA] ">
            {providerProfileData ? (
                <div className="container">
                    <div className="py-20">
                        <div className="md:flex p-10 ">
                            <div className="">
                                <div className="bg-white h-96 w-72 border-stone-200 border-[1px] rounded-3xl ">
                                    <div className="bg-violet-50 h-36 w-36 rounded-full mt-6 ml-[72px] mr-[72px] border-[1px] border-stone-200"></div>
                                    <div className="h-36 border-stone-500 flex flex-col justify-center items-center text-lg gap-2">
                                        <span className="text-lg">
                                            ผู้ให้บริการ : {providerProfileData[0].provider_firstname} {providerProfileData[0].provider_lastname}
                                        </span>
                                        <span>คะแนน : </span>
                                    </div>
                                    <div className="flex justify-center">
                                        <Buttons
                                            label="ส่งคำขอใช้บริการ"
                                            buttonType="success"
                                            className=" w-1/2 p-2 rounded-full"
                                            onClick={showModal}
                                        />
                                        <Modal title="ส่งคำขอใช้บริการ" open={isModalOpen} footer={false} >
                                            <p>คลิกยืนยันเพื่อส่งคำขอใช้บริการ</p>
                                            <div className="flex justify-center items-center gap-2">
                                                <Buttons
                                                    label="ตกลง"
                                                    buttonType="success"
                                                    className="mt-5 w-1/3 p-2 rounded-full"
                                                    onClick={handleOk}
                                                />
                                                <Buttons
                                                    label="ยกเลิก"
                                                    buttonType="danger"
                                                    className="mt-5 w-1/3 p-2 rounded-full"
                                                    onClick={handleCancel}
                                                />
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 pl-10 w-full justify-center">
                                <div className="text-2xl mb-3">
                                    บริการทั้งหมดที่ของคุณ : {providerProfileData[0].provider_firstname} {providerProfileData[0].provider_lastname}
                                </div>
                                <div className="bg-white p-6 flex flex-col gap-2 border-stone-200 border-[1px] rounded-3xl">
                                    {Array.from(new Set(providerProfileData.map(provider => provider.service_name))).map((service, index) => (
                                        <span key={index} className="text-xl">
                                            - {service}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-2xl my-3 ">พื้นที่ให้บริการทั้งหมด</span>
                                <div className="bg-white p-6 flex flex-col gap-2 border-stone-200 border-[1px] rounded-3xl">
                                    {Array.from(new Set(providerProfileData.map(provider => provider.district_name))).map((district, index) => (
                                        <span key={index} className="text-xl">
                                            - {district}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-xl mt-3">รีวิวจากผู้ใช้งาน </span>
                                <div className="h-48 bg-white border-stone-200 border-[1px] rounded-3xl hover:overflow-y-auto overflow-hidden">
                                    <div className="p-5 ">
                                        <div className="border-stone-200 border-[1px] rounded-3xl p-5 mb-3">User ? : comment 5.0 คะแนน</div>
                                        <div className="border-stone-200 border-[1px] rounded-3xl p-5 mb-3">User ? : comment 5.0 คะแนน</div>
                                        <div className="border-stone-200 border-[1px] rounded-3xl p-5 mb-3">User ? : comment 5.0 คะแนน</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to='/' className="m-10 underline flex justify-end">
                            กลับไปยังหน้าหลัก
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="container pt-20 pb-20 flex flex-col items-center">
                    <p>Loading...</p>
                </div>
            )}
        </div>
    );
};
