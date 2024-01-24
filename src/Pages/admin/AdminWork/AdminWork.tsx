import { Modal } from "antd"
import Buttons from "../../../components/ItemsGroup/Button/Buttons"
import { useEffect, useState } from "react";
import axios from "axios";

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
}

export const AdminWork = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentData, setPaymentData] = useState<AdminWorkProps[]>([]);
    const [imageData, setImageData] = useState(null);

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

    const handleOk = async (clickedPaymentItem : AdminWorkProps) => {
        const paymentFilename = clickedPaymentItem.payment;
        const apiUrl = `http://localhost:3000${paymentFilename}`;
        console.log('paymentFilename', paymentFilename)
        try {
            const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

            setImageData(response.data);

            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
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
                        </div>
                        <div className="">
                            <h3>ผู้ให้บริการ : {`${paymentItem.provider_firstname} ${paymentItem.provider_lastname}`}</h3>
                            <p>ให้บริการ : {paymentItem.service_name}</p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Buttons
                                label="อนุญาตให้เริ่มงาน"
                                buttonType="success"
                                className="p-2 rounded-xl"
                                onClick={() => { }}
                            />
                            <Buttons
                                label="ตรวจสอบงาน / จ่ายเงินให้ผู้ให้บริการ"
                                buttonType="edit"
                                className="p-2 rounded-xl"
                                onClick={() => { }}
                            />
                        </div>
                    </div>
                ))
                )}
                <Modal
                    title="ใบเสร็จการชำระเงิน"
                    open={isModalOpen}
                    footer={false}
                    className="font-kanit">
                    <div className="flex  justify-center items-center gap-2">
                        {imageData && (
                            <img
                                src={`data:image/jpeg;base64,${Buffer.from(imageData, 'binary').toString('base64')}`}
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
            </div>
        </>
    )
}
