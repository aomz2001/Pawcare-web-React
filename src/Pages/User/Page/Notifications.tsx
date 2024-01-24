import { useNavigate } from "react-router-dom"
import Buttons from "../../../components/ItemsGroup/Button/Buttons"
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

interface AcceptServiceDataItem {
    users_id: number;
    users_firstname: string;
    users_lastname: string;
    district_id: number;
    district_name: string;
    pet_id: number;
    pet_name: string;
    service_id: number;
    service_name: string;
    service_price: number;
    provider_id: number;
    provider_firstname: string;
    provider_lastname: string;
}

export const Notifications = () => {
    const [acceptServiceData, setAcceptServiceData] = useState<AcceptServiceDataItem[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const cookies = new Cookies();
        const userId = cookies.get('userId');

        axios.get(`http://localhost:3000/api/show-accept-service?users_id=${userId}`)
            .then(response => {
                setAcceptServiceData(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleDeclineJob = (usersId: number, districtId: number, serviceId: number, petId: number) => {
        axios.delete("http://localhost:3000/api/delete-accept-service", {
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
    const handlePayment = (item: AcceptServiceDataItem) => {
        navigate(`/payment?usersId=${item.users_id}&districtId=${item.district_id}&serviceId=${item.service_id}&petId=${item.pet_id}&providerId=${item.provider_id}`);
    };
    
    // console.log('acceptServiceData', acceptServiceData)
    
    return (
        <>
            <div className="bg-[#FFF8EA]">
                <div className="container ">
                    <div className="sm:p-20 p-10 pt-14">
                        <h2 className="text-3xl border-b-2 border-stone-200 w-full pb-2 mb-5 flex justify-center">การแจ้งเตือนของคุณ</h2>
                        <div className="flex flex-col justify-center items-center">
                            {acceptServiceData ? (
                                acceptServiceData.map((item, index) => (
                                    <div key={index} className="bg-stone-200 w-full max-w-3xl h-auto rounded-3xl mb-2 p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                        <div className="flex flex-col gap-2 pb-5 sm:pb-0">
                                            <div>ผู้ให้บริการ : {item.provider_firstname} {item.provider_lastname}</div>
                                            <div>บริการ : {item.service_name}</div>
                                            <div>พื้นที่ให้บริการ : {item.district_name}</div>
                                            <div>ประเภทสัตว์เลี้ยง : {item.pet_name}</div>
                                            <div>ราคา : {item.service_price} บาท</div>
                                        </div>
                                        <div className="flex flex-col">
                                            <Buttons
                                                label="ชำระเงิน"
                                                className="p-2 mb-3 rounded-xl w-full"
                                                buttonType="success"
                                                onClick={() => handlePayment(item)}
                                            ></Buttons>
                                            <Buttons
                                                label="ยกเลิก"
                                                className="p-2 rounded-xl"
                                                buttonType="danger"
                                                onClick={() => handleDeclineJob(item.users_id, item.district_id, item.service_id, item.pet_id)}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
