import { useEffect, useState } from "react";
import { UploadFile } from "../../../components/ItemsGroup/UploadFile";
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import axios from "axios";

interface ReqServiceDataItem {
    users_id: number;
    users_firstname: string;
    users_lastname: string;
    users_address: string;
    users_phone: string;
    district_id: number;
    district_name: string;
    pet_id: number;
    pet_name: string;
    service_id: number;
    service_name: string;
    service_price: number;
}

export function WorkforPet() {
    const [isJobAccepted, setIsJobAccepted] = useState<boolean>(false);
    const [reqServiceData, setReqServiceData] = useState<ReqServiceDataItem[] | null>(null);

    useEffect(() => {
        const providerId = localStorage.getItem('providerId');
        axios.get(`http://localhost:3000/api/show-req-service?provider_id=${providerId}`)
            .then(response => {
                setReqServiceData(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleAcceptJob = async (item: ReqServiceDataItem) => {
        try {
            const providerId = localStorage.getItem('providerId');
            const response = await axios.post('http://localhost:3000/api/accept-service', {
                pet_id: item.pet_id,
                district_id: item.district_id,
                service_id: item.service_id,
                provider_id: providerId,
                service_price: item.service_price,
                users_id: item.users_id,
            });
            console.log(response.data);
            setIsJobAccepted(true);
        } catch (error) {
            console.error("Error handling request:", error);
        }
    };

    const handleDeclineJob = (usersId: number, districtId: number, serviceId: number, petId: number) => {
        axios.delete("http://localhost:3000/api/delete-req-service", {
            data: { usersId, districtId, serviceId, petId }
        })
            .then(response => {
                console.log("Service request deleted successfully");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting service request:", error);
            });
    };
    console.log('reqServiceData', reqServiceData)

    return (
        <>
            <div className="flex flex-col  mb-4 rounded ">
                <h3 className="text-3xl font-semibold pb-5">งานของคุณ</h3>
                {reqServiceData ? (
                    reqServiceData.map((item: any) => (
                        <div key={item.users_id} className="flex flex-col md:flex-row items-center justify-between p-10 h-auto rounded-xl bg-gray-100 mb-5">
                            <div className="flex flex-col gap-2">
                                <p className="text-xl text-gray-400 dark:text-gray-500">
                                    ผู้ใช้งาน : {item.users_firstname} {item.users_lastname}
                                </p>
                                <p className="text-xl text-gray-400 dark:text-gray-500">
                                    ขอใช้บริการ : {item.service_name}
                                </p>
                                <p className="text-xl text-gray-400 dark:text-gray-500">
                                    ราคาที่ขอใช้บริการ : {item.service_price} บาท
                                </p>
                                <p className="text-xl text-gray-400 dark:text-gray-500">
                                    พื้นที่ใช้บริการ : {item.district_name}
                                </p>
                                <p className="text-xl text-gray-400 dark:text-gray-500">
                                    ที่อยู่ที่คุณต้องไปรับงาน : {item.users_address}
                                </p>
                                <p className="text-xl text-gray-400 dark:text-gray-500">
                                    เบอร์โทรศัพท์ติดต่อ : {item.users_phone}
                                </p>
                                <p className="text-xl text-gray-400 dark:text-gray-500">
                                    สถานะงาน : 
                                </p>
                            </div>
                            {!isJobAccepted && (
                                <div className="flex flex-col text-white gap-4 w-40">
                                    <Buttons
                                        label="รับงาน"
                                        className="p-2 rounded-xl"
                                        buttonType="success"
                                        onClick={() => handleAcceptJob(item)}
                                    />
                                    <Buttons
                                        label="ไม่รับงาน"
                                        className="p-2 rounded-xl"
                                        buttonType="danger"
                                        onClick={() => handleDeclineJob(item.users_id, item.district_id, item.service_id, item.pet_id)}
                                    />
                                </div>
                            )}
                            {isJobAccepted && (
                                <>
                                    <div className="text-lg">โปรดรอแอดมินตรวจสอบ</div>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}