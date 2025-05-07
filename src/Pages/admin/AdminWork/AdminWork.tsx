import { Modal } from "antd"
import Buttons from "../../../components/ItemsGroup/Button/Buttons"
import { useEffect, useState } from "react";
import httpClient from "../../../utils/httpClient";
import { AdminWorkDetails } from "./AdminWorkDetails";

interface AdminWorkProps {
    users_id: number;
    users_firstname: string;
    users_lastname: string;
    users_phone: string;
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
    report: string;
    cash_back: string;
}

export const AdminWork = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isComment, setIsComment] = useState<boolean>(false);
    const [paymentOpen, setPaymentOpen] = useState<boolean>(false);
    const [statusWork, setStatusWork] = useState<boolean>(false);
    const [paymentData, setPaymentData] = useState<AdminWorkProps[]>([]);
    const [imageData, setImageData] = useState<string | null>(null);
    const [statusText, setStatusText] = useState<string>("");
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [showQRCode, setShowQRCode] = useState(false);
    const [clickedPaymentItem, setClickedPaymentItem] = useState<AdminWorkProps | null>(null);
    const [file, setFile] = useState<File | undefined>(undefined);

    const isCommentOpen = () => setIsComment(true);
    const isCommentCloes = () => setIsComment(false);
    const handleCancel = () => setIsModalOpen(false);

    const handlePayment = async (item: AdminWorkProps) => {
        // เรียก API สร้าง QR Code
        // alert('** หมายเหตุ เมื่อคุณชำระเงินแล้วทางระบบจะไม่สามารถคืนเงินให้คุณได้ **')
        try {
            const providerNetprice = Number(item.service_price);
            const Netprice = providerNetprice - (providerNetprice * 0.10);
            const response = await httpClient.post("admin/api/generate-qr-admin", {
                mobileNumber: item.provider_phone,
                amount: Netprice,
            });
            const svg = response.data.svg;
            // แสดง QR Code ใน Modal
            setQrCode(svg);
            setShowQRCode(true);
            setPaymentOpen(true);
        } catch (error) {
            console.error("Error generating QR Code:", error);
        }
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        setFile(selectedFile || undefined);
    }

    const handleUpload = async (item: AdminWorkProps) => {
        if (file && item.provider_id !== null && item.district_id !== null && item.pet_id !== null && item.service_id !== null && item.users_id !== null) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('providerId', item.provider_id.toString());
                formData.append('districtId', item.district_id.toString());
                formData.append('petId', item.pet_id.toString());
                formData.append('serviceId', item.service_id.toString());
                formData.append('usersId', item.users_id.toString());

                const response = await httpClient.put("admin/api/upload-payment-admin", formData);
                console.log(response.data);
                setPaymentOpen(false);
                alert("อัพโหลดรูปภาพสำเร็จและรอแอดมินตรวจสอบหากชำระเงินสำเร็จพี่เลี้ยงจะติดต่อคุณกลับไป");
                window.location.reload()
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            console.error("Invalid or null values for parameters");
        }
    };

    const handleOpenWork = (clickedPaymentItem: AdminWorkProps) => {
        setClickedPaymentItem(clickedPaymentItem);
        setStatusWork(true);
    };
    const handleCloesWork = () => setStatusWork(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpClient.get("public/api/show-payment-state");
                setPaymentData(response.data.data);
            } catch (error) {
                console.error("Error fetching payment data:", error);
            }
        };
        fetchData();
    }, []);

    const handleOk = async (clickedPaymentItem: AdminWorkProps) => {
        const paymentFilename = clickedPaymentItem.payment;
        const apiUrl = `http://localhost:3000/public${paymentFilename}`;
        console.log('paymentFilename', paymentFilename)
        console.log('apiUrl', apiUrl)
        console.log('clickedPaymentItem.payment', clickedPaymentItem.payment)
        try {
            setImageData(apiUrl)
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    console.log('paymentData', paymentData)

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

            await httpClient.put("admin/api/update-status-work", requestData);
            setStatusText("");
            setStatusWork(false);
        } catch (error) {
            console.error("Error updating status_work:", error);
        }
    };

    const updateJobCompletionStatus = async (item: AdminWorkProps) => {
        try {
            const response = await httpClient.put('admin/api/put-status-payment', {
                payment_status: 'ชำระเงินเรียบร้อยแล้ว',
                providerId: item.provider_id,
                districtId: item.district_id,
                petId: item.pet_id,
                serviceId: item.service_id,
                service_price: item.service_price,
                usersId: item.users_id,
            });

            if (response.status === 200) {
                console.log(response.data);
                alert("แจ้งสถานะการชำระเงินผู้ใช้งานและคอมเม้นและรายงานเรียบร้อย")
            }
        } catch (error) {
            console.error("Error updating job completion status:", error);
        }
    };

    const handleDeclineJob = (usersId: number, districtId: number, serviceId: number, petId: number, service_price: number) => {
        httpClient.delete("admin/api/clear-work-list", {
            data: { usersId, districtId, serviceId, petId, service_price },
        })
            .then((response) => {
                console.log("Service request deleted successfully");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting service request:", error);
            });
    };

    return (
        <>
            <div className="text-3xl font-semibold pb-10">งานของคุณ</div>
            <div className="flex flex-col mb-4 rounded text-lg max-[1120px]:items-center">
                {paymentData.length === 0 ? (
                    <div className="flex justify-center">!!! ยินดีด้วยคุณยังไม่มีงาน !!!</div>
                ) : (
                    paymentData.map((paymentItem, index) => (
                        <div key={index} className="flex bg-slate-50 border-2 mb-5 p-10 rounded-lg max-w-5xl max-[1120px]:max-w-[460px] max-[1120px]:flex-col ">
                            <div className="flex flex-col justify-between pr-5 border-r-2 max-[1120px]:border-r-0 max-[1120px]:items-center">
                                <div className="max-[1120px]:pb-5">
                                    <AdminWorkDetails title='ผู้ใช้บริการ :' subtitle={`${paymentItem.users_firstname} ${paymentItem.users_lastname}`} />
                                    <AdminWorkDetails title='ใช้บริการ :' subtitle={paymentItem.service_name} />
                                    <AdminWorkDetails title='ราคาที่ชำระ :' subtitle={`${paymentItem.service_price} บาท`} />
                                    {paymentItem.cash_back !== '' && (
                                        <div className=" bg-[#f36464] p-3 rounded-xl mb-3">
                                            <div className="bg-white p-3 rounded-xl">
                                                <AdminWorkDetails title='คำร้องยกเลิกงานและขอเงินคืน :' subtitle={paymentItem.cash_back} />
                                                <AdminWorkDetails title='หมายเลข PromptPay :' subtitle={paymentItem.users_phone} />
                                                <p className="w-[455px] text-[#f36464]">โอนเงินคืนผู้ใช้งานตามหมายเลข PromptPay และแจ้งผู้ให้บริการเพื่อยกเลิกงาน</p>
                                                <div className="flex justify-center">
                                                    <Buttons
                                                        label="เคลียร์รายการ"
                                                        buttonType="danger"
                                                        className="text-white p-2 w-36 rounded-xl"
                                                        onClick={() => {
                                                            handleDeclineJob(
                                                                paymentItem.users_id,
                                                                paymentItem.district_id,
                                                                paymentItem.service_id,
                                                                paymentItem.pet_id,
                                                                paymentItem.service_price
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex gap-3 mr-8 max-[1120px]:mr-0 max-[1120px]:pb-5 max-[1120px]:border-b-2">
                                    <Buttons
                                        label="สถานะชำระเงิน"
                                        color="#3498DB"
                                        className="text-white p-2 w-36 rounded-xl hover:bg-[#5DADE2]"
                                        onClick={() => handleOk(paymentItem)}
                                    />
                                    <Buttons
                                        label="แจ้งผู้ใช้งาน"
                                        buttonType="success"
                                        className="text-white p-2 w-36 rounded-xl"
                                        onClick={isCommentOpen}
                                    />
                                    <Modal
                                        title="แจ้งผู้ใช้งานรอรับบริการและคอมเม้น"
                                        open={isComment}
                                        footer={false}
                                        className="font-kanit ">
                                        <p className="pt-3 text-base">กดตกลงเพื่อแจ้งผู้ใช้งานเพื่อให้รอรับบริการ และแสดงความคิดเห็นหรือรีวิว</p>
                                        <div className="flex justify-center items-center gap-2">
                                            <Buttons
                                                label="ยกเลิก"
                                                buttonType="primary"
                                                className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                onClick={isCommentCloes}
                                            />
                                            <Buttons
                                                label="ตกลง"
                                                buttonType="secondary"
                                                className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                onClick={() => {
                                                    updateJobCompletionStatus(paymentItem)
                                                    isCommentCloes()
                                                }}
                                            />
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2 pl-10 max-[1120px]:pl-0 max-[1120px]:items-center">
                                <div className="max-[1120px]:pb-3 max-[1120px]:pt-5">
                                    <AdminWorkDetails title='ผู้ให้บริการ :' subtitle={`${paymentItem.provider_firstname} ${paymentItem.provider_lastname}`} />
                                    <AdminWorkDetails title='ให้บริการ :' subtitle={paymentItem.service_name} />
                                    <AdminWorkDetails title='หมายเลข PromptPay :' subtitle={paymentItem.provider_phone} />
                                    <AdminWorkDetails title='สถานะการเสร็จงาน :' subtitle={paymentItem.job_complete} />
                                    <AdminWorkDetails title="ราคาสุทธิ (หัก 10%) :" subtitle={`${Number(paymentItem.service_price) - Number(paymentItem.service_price) * 0.10} บาท`} />
                                    <AdminWorkDetails title='รายงานจากผู้ใช้งาน :' subtitle={paymentItem.report || 'ไม่มี'} />
                                </div>
                                <div className="flex gap-3">
                                    <Buttons
                                        label="แจ้งให้ผู้บริการ"
                                        buttonType="success"
                                        className="text-white p-2 w-36 rounded-xl"
                                        onClick={() => handleOpenWork(paymentItem)}
                                    />
                                    {
                                        paymentItem.job_complete !== '' && (
                                            <Buttons
                                                label="โอนเงินให้พี่เลี้ยง"
                                                color="#3498DB"
                                                className="text-white p-2 w-36 rounded-xl hover:bg-[#5DADE2]"
                                                onClick={() => handlePayment(paymentItem)}
                                            />
                                        )
                                    }
                                </div>
                                <Modal
                                    title="แสกนจ่ายโดยแอพธนาคาร"
                                    open={paymentOpen}
                                    footer={false}
                                    className="font-kanit">
                                    <div className="flex justify-center items-center gap-2">
                                        {showQRCode && qrCode && (
                                            <img src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCode)}`} alt="QR Code" />
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center items-center py-4 text-red-500">
                                        <div>
                                            !!! เมื่อแสกนจ่ายแล้วโปรดแนบสลีปเพื่อให้พี่เลี้ยงรับทราบด้านล่างนี้ !!!
                                        </div>
                                    </div>
                                    <div className="pl-36 ">
                                        <input type="file" onChange={handleFile} />
                                    </div>
                                    <div className="flex justify-center">
                                        <Buttons
                                            label="อัพโหลดรูปภาพ"
                                            color="#3498DB"
                                            className="text-white mt-5 w-1/3 p-2 rounded-full hover:bg-[#5DADE2]"
                                            onClick={() => handleUpload(paymentItem)}
                                        />
                                    </div>
                                    <div className="flex  justify-center items-center gap-2">
                                        <Buttons
                                            label="ยกเลิก"
                                            buttonType="danger"
                                            className="text-white mt-5 w-1/3 p-2 rounded-full"
                                            onClick={() => { setPaymentOpen(false) }}
                                        />
                                    </div>
                                </Modal>
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
                                            className="text-white mt-5 w-1/4 p-2 rounded-full"
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
                                        <div className="font-semibold">
                                            <ol className="flex flex-col gap-y-2">*** หมายเหตุ : ***
                                                <li className="flex gap-x-1 items-center ">1. หากสลิปถูกต้องตามจำนวนราคาให้แจ้งพี่เลี้ยงว่า<div className="text-green-500 text-base">เริ่มงานได้</div></li>
                                                <li className="flex gap-x-1 items-center ">2. หากสลิป<div className="text-red-600">ไม่</div>ถูกต้องตามจำนวนราคาให้แจ้งพี่เลี้ยงว่า <div className="text-red-600 text-base">การชำระเงินล้มเหลว</div></li>
                                            </ol>

                                        </div>
                                        <textarea
                                            rows={4}
                                            name="status"
                                            className="block p-2.5 w-full text-base rounded-xl text-black bg-slate-100"
                                            placeholder="แจ้งพี่เลี้ยงได้ที่นี่..."
                                            value={statusText}
                                            onChange={(e) => setStatusText(e.target.value)}
                                        >
                                        </textarea>
                                        <div className="w-full flex justify-center gap-3">
                                            <Buttons
                                                label="ปิด"
                                                buttonType="danger"
                                                className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                onClick={handleCloesWork}
                                            />
                                            <Buttons
                                                label="ส่งข้อความ"
                                                buttonType="success"
                                                className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                onClick={sendStatus}
                                            />
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}
