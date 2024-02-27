import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Buttons from "../../../../components/ItemsGroup/Button/Buttons";
import httpClient from "../../../../utils/httpClient";
import { PaymentChoice } from "./PaymentChoice";

interface PaymentServiceDataItem {
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

export const Payment = () => {
    const [paymentServiceData, setPaymentServiceData] = useState<PaymentServiceDataItem[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showQRCode, setShowQRCode] = useState(false);
    const [searchParams] = useSearchParams();
    const usersId = searchParams.get("usersId");
    const petId = searchParams.get("petId");
    const districtId = searchParams.get("districtId");
    const serviceId = searchParams.get("serviceId");
    const providerId = searchParams.get("providerId");
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [file, setFile] = useState<File | undefined>(undefined);
    const navigate = useNavigate();

    const handleOk = async () => {
        // เรียก API สร้าง QR Code
        try {
            const response = await httpClient.post("user/api/generate-qr", {
                mobileNumber: "0982676425",
                amount: paymentServiceData && paymentServiceData[0]?.service_price,
            });
            const svg = response.data.svg;
            // แสดง QR Code ใน Modal
            setQrCode(svg);
            setShowQRCode(true);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error generating QR Code:", error);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        httpClient.get(`user/api/show-accept-service`, { params: { users_id: +usersId! } })
            .then(response => {
                const filteredData = response.data.data.filter((item: PaymentServiceDataItem) =>
                    item.users_id === parseInt(usersId!) &&
                    item.pet_id === parseInt(petId!) &&
                    item.district_id === parseInt(districtId!) &&
                    item.service_id === parseInt(serviceId!) &&
                    item.provider_id === parseInt(providerId!)
                );
                setPaymentServiceData(filteredData);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [usersId, petId, districtId, serviceId, providerId]);

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        setFile(selectedFile || undefined);
    }

    const handleUpload = async () => {
        if (file && providerId !== null && districtId !== null && petId !== null && serviceId !== null && usersId !== null) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('providerId', providerId);
                formData.append('districtId', districtId);
                formData.append('petId', petId);
                formData.append('serviceId', serviceId);
                formData.append('usersId', usersId);

                const response = await httpClient.put("user/api/upload-payment", formData);
                console.log(response.data);
                setIsModalOpen(false);
                alert("อัพโหลดรูปภาพสำเร็จและรอแอดมินตรวจสอบหากชำระเงินสำเร็จพี่เลี้ยงจะติดต่อคุณกลับไป");
                navigate('/');
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            console.error("Invalid or null values for parameters");
        }
    };
    
    return (
        <>
            <div className="bg-[#FFF8EA]">
                <div className="container p-24">
                    <h2 className="text-3xl mb-10 md:mb-16">เลือกวิธีการชำระเงิน</h2>
                    <div className="w-full flex flex-col gap-5 justify-between items-center lg:flex-row">
                        <div className="flex flex-col gap-5">
                            <PaymentChoice payment='QR Payment' onClick={handleOk}/>
                        </div>
                        <Modal
                            title="แสกนจ่ายโดยแอพธนาคาร"
                            open={isModalOpen}
                            footer={false}
                            className="font-kanit">
                            <div className="flex justify-center items-center gap-2">
                                {showQRCode && qrCode && (
                                    <img src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCode)}`} alt="QR Code" />
                                )}
                            </div>
                            <div className="flex flex-col justify-center items-center py-4 text-red-500">
                                <div>
                                    !!! เมื่อแสกนจ่ายแล้วโปรดแนบสลีปเพื่อให้แอดมินตรวจสอบด้านล่างนี้ !!!
                                </div>
                            </div>
                            <div className="pl-36 ">
                                <input type="file" onChange={handleFile} />
                            </div>
                            <div className="flex justify-center">
                                <Buttons
                                    label="อัพโหลดรูปภาพ"
                                    color="#3498DB"
                                    className="mt-5 w-1/3 p-2 rounded-full hover:bg-[#5DADE2]"
                                    onClick={handleUpload}
                                />
                            </div>
                            <div className="flex  justify-center items-center gap-2">
                                <Buttons
                                    label="ยกเลิก"
                                    buttonType="danger"
                                    className="mt-5 w-1/3 p-2 rounded-full"
                                    onClick={handleCancel}
                                />
                            </div>
                        </Modal>
                        <div className="bg-red-500 flex flex-col">
                            <h3 className="bg-[#D9D9D9] px-40 py-6 text-xl shadow-md">รายละเอียดการชำระเงิน</h3>
                            <div className=" bg-white p-10 text-lg shadow-md flex flex-col gap-5">
                                <div className="flex flex-col gap-3">
                                    <div className="font-bold">รายละเอียดบริการของคุณ </div>
                                    <div>
                                        - {paymentServiceData && paymentServiceData[0]?.service_name}
                                    </div>
                                    <div>
                                        - {paymentServiceData && paymentServiceData[0]?.pet_name}
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="font-bold">ค่าบริการของคุณ</div>
                                    <div>{paymentServiceData && paymentServiceData[0]?.service_price} บาท</div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="font-bold">ส่วนลด </div>
                                    <div>0 บาท</div>
                                </div>
                                <div className="flex justify-between border-t-2 pt-5">
                                    <div className="font-bold">รวมราคาค่าบริการทั้งหมด </div>
                                    <div>{paymentServiceData && paymentServiceData[0]?.service_price} บาท</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-16 underline">
                        <Link to='/notifications' className="">กลับไปหน้าก่อนหน้านี้</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
