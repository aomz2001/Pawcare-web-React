import { Link, useSearchParams } from "react-router-dom";
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import axios from "axios";
import Cookies from "universal-cookie";

type ProviderProfileData = {
    users_id: number;
    users_firstname: string;
    users_lastname: string;
    providerId: number;
    provider_firstname: string;
    provider_lastname: string;
    service_id: string;
    service_name: string;
    district_name: string;
    service_price: number;
    pet_name: string;
    review_text: string;
    ratings: number;
    report: number;
};

export const ProviderProfile = () => {
    const [searchParams] = useSearchParams();
    const [providerProfileData, setProviderProfileData] = useState<ProviderProfileData[] | null>(null);
    const [reviewData, setReviewData] = useState<ProviderProfileData[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const petId = searchParams.get("petId");
    const districtId = searchParams.get("districtId");
    const serviceId = searchParams.get("serviceId");
    const providerId = searchParams.get("providerId");
    const cookies = new Cookies();
    const userId = cookies.get('userId');

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        try {
            if (providerProfileData && providerProfileData.length > 0) {
                const response = await axios.post('http://localhost:3000/api/req-service', {
                    pet_id: petId,
                    district_id: districtId,
                    service_id: serviceId,
                    provider_id: providerId,
                    service_price: providerProfileData[0]?.service_price,
                    users_id: String(userId),
                });
                console.log(response);
                setIsModalOpen(false);
            } else {
                console.error("providerProfileData is null or empty");
            }
        } catch (error) {
            console.error("Error handling request:", error);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/provider-data', {
                    pet_id: petId,
                    district_id: districtId,
                    service_id: serviceId,
                    provider_id: providerId
                });

                setProviderProfileData(response.data.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        if (providerId && petId && districtId && serviceId && providerId) {
            fetchProviderData();
        }
    }, [providerId, petId, districtId, serviceId]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/get-review?provider_id=${providerId}`)
            .then(response => {
                setReviewData(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    console.log('reviewData', reviewData)

    return (
        <div className="bg-[#FFF8EA] ">
            {providerProfileData ? (
                <div className="container">
                    <div className="py-20">
                        <div className="md:flex p-10 ">
                            <div className="">
                                <div className="bg-white h-[400px] w-72 border-stone-200 border-[1px] rounded-3xl ">
                                    <div className="bg-violet-50 h-36 w-36 rounded-full mt-6 ml-[72px] mr-[72px] border-[1px] border-stone-200"></div>
                                    <div className="h-28 border-stone-500 flex flex-col justify-center items-center text-lg gap-2">
                                        <span className="text-lg">
                                            ผู้ให้บริการ : {providerProfileData[0].provider_firstname} {providerProfileData[0].provider_lastname}
                                        </span>
                                        <span>คะแนน : </span>
                                    </div>
                                    <div className="flex flex-col justify-center items-center gap-3">
                                        <Buttons
                                            label="ตรวจสอบวัน / การจอง"
                                            color="#3498DB"
                                            className=" w-48 p-2 rounded-full hover:bg-[#5DADE2]"
                                            onClick={() => { }}
                                        />
                                        <Buttons
                                            label="ส่งคำขอใช้บริการ"
                                            buttonType="success"
                                            className=" w-1/2 p-2 rounded-full"
                                            onClick={showModal}
                                        />
                                        <Modal title="ส่งคำขอใช้บริการ" open={isModalOpen} footer={false} className="font-kanit">
                                            <h3 className="text-xl">รายการของคุณ</h3>
                                            <div className="py-3 flex flex-col gap-1 text-base">
                                                <p>- {providerProfileData[0].service_name} ราคา {providerProfileData[0].service_price} บาท</p>
                                                <p>- {providerProfileData[0].pet_name}</p>
                                                <p>- {providerProfileData[0].district_name}</p>
                                            </div>

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
                                    บริการของคุณ : {providerProfileData[0].provider_firstname} {providerProfileData[0].provider_lastname}
                                </div>
                                <div className="bg-white p-6 flex flex-col gap-2 border-stone-200 border-[1px] rounded-3xl">
                                    {providerProfileData[0].service_name}
                                </div>
                                <span className="text-2xl my-3 ">พื้นที่ให้บริการ</span>
                                <div className="bg-white p-6 flex flex-col gap-2 border-stone-200 border-[1px] rounded-3xl">
                                    {providerProfileData[0].district_name}
                                </div>
                                <span className="text-xl mt-3">รีวิวจากผู้ใช้งาน </span>
                                <div className="h-48 bg-white border-stone-200 border-[1px] rounded-3xl hover:overflow-y-auto overflow-hidden">
                                    <div className="p-5 ">
                                        {reviewData ? (
                                            reviewData.map((item) => (
                                                <div className="bg-stone-100 rounded-3xl p-5 mb-3 font-semibold">
                                                    <div className="">ผู้ใช้งาน : {item.users_firstname} {item.users_lastname} </div>
                                                    <div className="">ให้คะแนน : {item.ratings} คะแนน</div>
                                                    <div className="">แสดงความคิดเห็น : {item.review_text}</div>
                                                    <div className="">รายงาน : {item.report}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <><div className="border-stone-200 border-[1px] rounded-3xl p-5 mb-3">ยังไม่มีรีวิวจากผู้ใช้งาน</div></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="m-10 underline flex justify-end">
                            <Link to='/' >
                                กลับไปยังหน้าหลัก
                            </Link>
                        </div>
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