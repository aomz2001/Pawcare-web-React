import { Modal } from "antd"
import Buttons from "../../../components/ItemsGroup/Button/Buttons"
import { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "../../../components/ItemsGroup/InputForm";

interface AdminWorkProps {
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
    payment: string;
    provider_phone: string;
    job_complete: string;
}

export const AdminWork = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusWork, setStatusWork] = useState(false);
    const [paymentData, setPaymentData] = useState<AdminWorkProps[]>([]);
    const [imageData, setImageData] = useState<string | null>(null);
    const [statusText, setStatusText] = useState<string>("");
    const [clickedPaymentItem, setClickedPaymentItem] = useState<AdminWorkProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/show-payment-state");
                setPaymentData(response.data.data);
            } catch (error) {
                console.error("Error fetching payment data:", error);
            }
        };
        fetchData();
    }, []);
    console.log('paymentData', paymentData)

    const handleOk = async (clickedPaymentItem: AdminWorkProps) => {
        const paymentFilename = clickedPaymentItem.payment;
        const apiUrl = `http://localhost:3000${paymentFilename}`;
        console.log('paymentFilename', paymentFilename)
        try {
            setImageData(apiUrl)
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOpenWork = (clickedPaymentItem: AdminWorkProps) => {
        setClickedPaymentItem(clickedPaymentItem);
        setStatusWork(true);
    };
    

    const sendStatus = async () => {
        try {
            if (!clickedPaymentItem) {
                console.error("No clicked payment item");
                return;
            }
    
            const requestData = {
                providerId: clickedPaymentItem.provider_id,
                districtId: clickedPaymentItem.district_id,
                petId: clickedPaymentItem.pet_id,
                serviceId: clickedPaymentItem.service_id,
                service_price: clickedPaymentItem.service_price,
                usersId: clickedPaymentItem.users_id,
                status_work: statusText,
            };

            console.log('requestData', requestData);
    
            await axios.put("http://localhost:3000/api/update-status-work", requestData);
            setStatusText("");
            setStatusWork(false);
        } catch (error) {
            console.error("Error updating status_work:", error);
        }
    };

    const handleCloesWork = () => {
        setStatusWork(false);
    };

    const updateJobCompletionStatus = async (item: AdminWorkProps) => {
        try {
            const response = await axios.put('http://localhost:3000/api/put-status-payment', {
                payment_status: 'ชำระเงินเรียบร้อยแล้ว',
                providerId:item.provider_id,
                districtId: item.district_id,
                petId: item.pet_id,
                serviceId: item.service_id,
                service_price: item.service_price,
                usersId: item.users_id,
            });
    
            if (response.status === 200) {
                console.log(response.data);
            }
        } catch (error) {
            console.error("Error updating job completion status:", error);
        }
    };

    return (
        <>
            <div className="text-3xl font-semibold pb-10">งานของคุณ</div>
            <div className=" h-48 mb-4 rounded text-lg">
                {paymentData.length === 0 ? (
                    <div className="flex justify-center">!!! ยินดีด้วยคุณยังไม่มีงาน !!!</div>
                ) : (
                    paymentData.map((paymentItem, index) => (
                        <div key={index} className="flex justify-between items-center border-2 mb-5 p-10 rounded-lg">
                            <div className="">
                                <h3>ผู้ใช้บริการ : {`${paymentItem.users_firstname} ${paymentItem.users_lastname}`}</h3>
                                <h3>ใช้บริการ : {paymentItem.service_name}</h3>
                                <h3>ราคาที่ชำระ : {paymentItem.service_price}</h3>
                            </div>
                            <div className="flex flex-col gap-3 mr-8">
                                <Buttons
                                    label="ตรวจสอบสลีปชำระเงิน"
                                    color="#3498DB"
                                    className="p-2 rounded-xl hover:bg-[#5DADE2]"
                                    onClick={() => handleOk(paymentItem)}
                                />
                                <Buttons
                                    label="แจ้งสถานะผู้ใช้งาน"
                                    buttonType="success"
                                    className="p-2 rounded-xl"
                                    onClick={() => updateJobCompletionStatus(paymentItem)}
                                />
                            </div>
                            <div className="">
                                <h3>ผู้ให้บริการ : {`${paymentItem.provider_firstname} ${paymentItem.provider_lastname}`}</h3>
                                <p>ให้บริการ : {paymentItem.service_name}</p>
                                <p>เบอร์โทรศัพท์ / หมายเลข PromptPay : {paymentItem.provider_phone}</p>
                                <p>สถานะงาน : {paymentItem.job_complete}</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Buttons
                                    label="แจ้งสถานะงานให้ผู้บริการ"
                                    buttonType="success"
                                    className="p-2 rounded-xl"
                                    onClick={() => handleOpenWork(paymentItem)}
                                />
                            </div>
                            <Modal
                                title="ใบเสร็จการชำระเงิน"
                                open={isModalOpen}
                                footer={false}
                                className="font-kanit">
                                <div className="flex flex-col justify-center items-center gap-2">
                                    {imageData && (
                                        <img
                                            src={imageData}
                                            alt="Payment Receipt"
                                            style={{ maxWidth: '100%' }}
                                        />
                                    )}
                                    <Buttons
                                        label="ปิด"
                                        buttonType="danger"
                                        className="mt-5 w-1/4 p-2 rounded-full"
                                        onClick={handleCancel}
                                    />
                                </div>
                            </Modal>
                            <Modal
                                title="แจ้งสถานะงานให้ผู้บริการ"
                                open={statusWork}
                                footer={false}
                                className="font-kanit">
                                <div className="flex flex-col justify-center items-center gap-2 p-5">
                                    <InputForm
                                        label=""
                                        name="status"
                                        placeholder="เริ่มงานได้ หรือ อื่นๆ"
                                        value={statusText}
                                        onChange={(e) => setStatusText(e.target.value)}
                                    />
                                    <div className="w-full flex justify-center gap-3">
                                        <Buttons
                                            label="ส่งข้อความ"
                                            buttonType="success"
                                            className="mt-5 w-1/4 p-2 rounded-full"
                                            onClick={sendStatus}
                                        />
                                        <Buttons
                                            label="ปิด"
                                            buttonType="danger"
                                            className="mt-5 w-1/4 p-2 rounded-full"
                                            onClick={handleCloesWork}
                                        />
                                    </div>
                                </div>
                            </Modal>
                        </div>
                    ))
                )}

            </div>
        </>
    )
}
