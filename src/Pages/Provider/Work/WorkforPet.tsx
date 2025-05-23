import { useEffect, useState } from "react";
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { Avatar, Modal } from "antd";
import httpClient from "../../../utils/httpClient";
import { WorkDetails } from "./WorkDetails";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

dayjs.locale("th");

interface ReqServiceDataItem {
    users_id: number;
    users_firstname: string;
    users_lastname: string;
    users_address: string;
    users_phone: string;
    users_profile: string;
    district_id: number;
    district_name: string;
    pet_id: number;
    pet_name: string;
    service_id: number;
    service_name: string;
    service_price: number;
    status_work: string;
    booking_first: string;
    booking_second: string;
    time_first: string;
    time_second: string;
    users_cancel: string;
    payment_admin: string;
}

export function WorkforPet() {
    const [isJobAccepted, setIsJobAccepted] = useState<boolean>(false);
    const [reqServiceData, setReqServiceData] = useState<ReqServiceDataItem[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isJobSucess, seIsJobSucess] = useState<boolean>(false);
    const [statusText, setStatusText] = useState<string>("");
    const [imageProfile, setImageProfile] = useState<(string | null)[]>([]);
    const [imageData, setImageData] = useState<string | null>(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);

    const JobSucessOpen = () => seIsJobSucess(true);
    const JobSucessCloes = () => seIsJobSucess(false);
    const handleOpen = () => setIsModalOpen(true);
    const handleCloes = () => setIsModalOpen(false);
    const JobAcceptedOpen = () => setIsJobAccepted(true);
    const JobAcceptedCloes = () => setIsJobAccepted(false);

    useEffect(() => {
        const providerId = localStorage.getItem("providerId");
        httpClient.get(`provider/api/show-req-service?provider_id=${providerId}`)
            .then((response) => {
                setReqServiceData(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleAcceptJob = async (item: ReqServiceDataItem) => {
        try {
            const providerId = localStorage.getItem("providerId");
            const response = await httpClient.post("provider/api/accept-service", {
                pet_id: item.pet_id,
                district_id: item.district_id,
                service_id: item.service_id,
                provider_id: providerId,
                service_price: item.service_price,
                users_id: item.users_id,
                confirm_work: 'รับงาน'
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error handling request:", error);
        }
    };

    const handleDeclineJob = (usersId: number, districtId: number, serviceId: number, petId: number) => {
        httpClient.delete("provider/api/delete-req-service", {
            data: { usersId, districtId, serviceId, petId },
        })
            .then((response) => {
                console.log("Service request deleted successfully");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting service request:", error);
            });
    };
    const understandWork = (usersId: number, districtId: number, serviceId: number, petId: number) => {
        httpClient.delete("provider/api/delete-req-service", {
            data: { usersId, districtId, serviceId, petId },
        })
            .then((response) => {
                console.log("Service request deleted successfully");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting service request:", error);
            });
    };

    const updateJobCompletionStatus = async (item: ReqServiceDataItem) => {
        try {
            const providerId = localStorage.getItem("providerId");
            const response = await httpClient.put("provider/api/job-complete-status", {
                job_complete: "เสร็จงาน",
                providerId: providerId,
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
    console.log('reqServiceData', reqServiceData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (reqServiceData) {
                    await Promise.all(reqServiceData.map(async (item) => {
                        try {
                            const apiUrl = `http://localhost:3000/public/api/get-provider-profile?filename=${item.users_profile}`;
                            const response = await httpClient.get(apiUrl);
                            setImageProfile(prevState => [...prevState, apiUrl]); // เปลี่ยนไปใช้ setState แบบ function
                            return response.data; // Assuming this contains the profile data

                        } catch (error) {
                            console.error("Error fetching data for user:", error);
                            return null;
                        }
                    }));

                }
            } catch (error) {
                console.error("Error fetching profiles:", error);
            }
        };
        fetchData();
    }, [reqServiceData]);

    const handleCancelJob = async (item: ReqServiceDataItem) => {
        try {
            const providerId = localStorage.getItem("providerId");
            const response = await httpClient.put("provider/api/cancel-job-status", {
                pet_id: item.pet_id,
                district_id: item.district_id,
                service_id: item.service_id,
                provider_id: providerId,
                service_price: item.service_price,
                users_id: item.users_id,
                provider_cancel: statusText
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error handling request:", error);
        }
    };

    const handleShowPayment = async (item: ReqServiceDataItem) => {
        const paymentFilename = item.payment_admin;
        const paymentUrl = `http://localhost:3000/public/api/get-payment-file-admin?filename=${paymentFilename}`;
        console.log('paymentFilename', paymentFilename)
        console.log('paymentUrl', paymentUrl)
        console.log('clickedPaymentItem.payment', item.payment_admin)
        try {
            setImageData(paymentUrl)
            setIsPaymentOpen(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <>
            <div className="flex flex-col  mb-4 rounded ">
                <h3 className="text-3xl font-semibold pb-5">งานของคุณ</h3>
                {reqServiceData ? (
                    reqServiceData.map((item: ReqServiceDataItem, index: number) => (
                        <div key={item.users_id} className="flex flex-col md:flex-row items-center justify-between p-10 h-auto rounded-xl bg-gray-100 mb-5">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-5">
                                    <div className="">
                                        {imageProfile[index] ? (
                                            <img src={imageProfile[index] as string} className="rounded-full object-cover" style={{ width: 150, height: 150, backgroundColor: '#D5D3D4' }} />
                                        ) : (
                                            <Avatar size={150} style={{ backgroundColor: '#D5D3D4' }} icon={<UserOutlined />} />
                                        )}

                                    </div>
                                    <div className="">
                                        <WorkDetails title="ผู้ใช้งาน :" value={`${item.users_firstname} ${item.users_lastname}`} />
                                        <WorkDetails title="ขอใช้บริการ :" value={item.service_name} />
                                        <WorkDetails title="ประเภทสัตว์เลี้ยง :" value={item.pet_name} />
                                        <WorkDetails title="ราคาที่ขอใช้บริการ :" value={item.service_price} />
                                        <WorkDetails title="พื้นที่ใช้บริการ :" value={item.district_name} />
                                        <WorkDetails title="ที่อยู่ที่คุณต้องไปรับงาน :" value={item.users_address} />
                                        <WorkDetails title="เบอร์โทรศัพท์ติดต่อ :" value={item.users_phone} />
                                        <WorkDetails
                                            title="วันและเวลาที่เลือกใช้บริการ:"
                                            values={[
                                                (item.booking_first && item.booking_second) ?
                                                    (item.booking_first && dayjs(item.booking_first).locale("th").format("DD MMMM YYYY ")) + (item.time_first) + " น"
                                                    + (item.booking_second && ` ถึง ${dayjs(item.booking_second).locale("th").format("DD MMMM YYYY ")}`) + (item.time_second) + " น"
                                                    : "ไม่มี"
                                            ]}
                                        />
                                        {item.status_work !== "" && (
                                            <WorkDetails title="สถานะงานจากแอดมิน :" value={item.status_work} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            {item.status_work === "เริ่มงานได้" && (
                                <div className=" flex flex-col justify-end gap-3">
                                    <div className="flex flex-col items-center text-lg">
                                        {item.payment_admin === "" && (
                                            <>
                                                <p>!!! เริ่มงานได้ !!!</p>
                                                <p>กดเสร็จงานเมื่อส่งงานลูกค้าแล้วเพื่อรับเงินผ่านPromptPay</p>
                                            </>
                                        )
                                        }
                                        {item.payment_admin !== "" && (
                                            <>
                                                <p>ตรวจรายได้ค่าให้บริการของคุณได้ที่นี่ !!!</p>
                                            </>
                                        )
                                        }
                                    </div>
                                    <div className="flex flex-col gap-2 justify-center items-center">
                                        {item.payment_admin === "" && (
                                            <Buttons
                                                label="เสร็จงาน"
                                                className="text-white p-2 w-36 rounded-xl"
                                                buttonType="primary"
                                                onClick={JobSucessOpen}
                                            />
                                        )
                                        }
                                        {item.payment_admin !== "" && (
                                            <>
                                                <Buttons
                                                    label="ตรวจสอบเงินเข้าแล้วที่นี่"
                                                    className="text-white p-2 w-48 rounded-xl"
                                                    buttonType="success"
                                                    onClick={() => { handleShowPayment(item) }}
                                                />
                                            </>
                                        )}
                                    </div>
                                    <Modal
                                        title="ใบเสร็จรับเงินจากระบบ"
                                        open={isPaymentOpen}
                                        footer={false}
                                        className="font-kanit">
                                        <div className="font-bold">ระบบหักจำนวนเงิน 10% ราคาสุทธิแล้ว {`${Number(item.service_price) - Number(item.service_price) * 0.10} บาท`}</div>
                                        <div className="font-bold underline"><Link to='/condition'>ตามเงื่อนไขในข้อตกลงการใช้งานของแพลตฟอร์ม</Link></div>
                                        <div className="font-bold flex justify-center my-6">------ ขอบคุณที่ร่วมงานกับเรา ------</div>
                                        <div className="flex flex-col justify-center items-center gap-2 mt-4">
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
                                                onClick={() => { setIsPaymentOpen(false) }}
                                            />
                                        </div>
                                    </Modal>
                                    <Modal
                                        title="ให้บริการเสร็จสิ้นแล้วกดตกตลงเพื่อแจ้งแอดมิน"
                                        open={isJobSucess}
                                        footer={false}
                                        className="font-kanit"
                                    >
                                        <div className="flex flex-col justify-center items-center gap-2 p-5">
                                            <div className="w-full flex justify-center gap-3">
                                                <Buttons
                                                    label="ยกเลิก"
                                                    buttonType="primary"
                                                    className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                    onClick={JobSucessCloes}
                                                />
                                                <Buttons
                                                    label="ตกลง"
                                                    buttonType="secondary"
                                                    className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                    onClick={() => {
                                                        updateJobCompletionStatus(item);
                                                        alert("ขอบคุณที่ร่วมงานกับเรา และ แอดมินจะโอนเงินไปให้คุณผ่านหมายเลย PromptPay");
                                                        window.location.reload()
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            )}
                            {item.status_work === "การชำระเงินล้มเหลว" && (
                                <div className=" flex flex-col justify-end gap-3">
                                    <div className="flex flex-col items-center text-lg">
                                        <p>!!! การชำระเงินไม่สำเร็จ !!!</p>
                                        <p>กดรับทราบเพื่อลบรายการ</p>
                                    </div>
                                    <div className="flex justify-center">
                                        <Buttons
                                            label="รับทราบ"
                                            className="text-white p-2 w-36 rounded-xl"
                                            buttonType="primary"
                                            onClick={() => {
                                                alert("ลบรายการเสร็จสิ้น");
                                                handleDeclineJob(item.users_id, item.district_id, item.service_id, item.pet_id);
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                            <>
                                {item.users_cancel !== "" && (
                                    <div className="w-[260px] flex flex-col items-center">
                                        <p className="font-semibold text-red-700">
                                            ขออภัย ! งานของคุณถูกยกเลิกเนื่องจากคุณ {item.users_firstname} {item.users_lastname} {item.users_cancel}
                                        </p>
                                        <Buttons
                                            label="รับทราบ"
                                            buttonType="primary"
                                            className="text-white mt-5 w-28 p-2 rounded-full"
                                            onClick={() => {
                                                understandWork(item.users_id, item.district_id, item.service_id, item.pet_id)
                                            }}
                                        />
                                    </div>
                                )}
                                {item.status_work === "" && (
                                    <>
                                        {item.users_cancel === "" && (
                                            <div className="flex flex-col text-white gap-4 w-40">
                                                <Buttons
                                                    label="รับงาน"
                                                    className="text-white p-2 rounded-xl"
                                                    buttonType="success"
                                                    onClick={JobAcceptedOpen}
                                                />
                                                <Modal
                                                    title="ยืนยันการรับงาน"
                                                    open={isJobAccepted}
                                                    footer={false}
                                                    className="font-kanit"
                                                >
                                                    <div className="flex flex-col justify-center items-center gap-2 p-5">
                                                        <div className="w-full flex justify-center gap-x-3">
                                                            <Buttons
                                                                label="ยกเลิก"
                                                                buttonType="primary"
                                                                className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                                onClick={JobAcceptedCloes}
                                                            />
                                                            <Buttons
                                                                label="ตกลง"
                                                                buttonType="secondary"
                                                                className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                                onClick={() => {
                                                                    handleAcceptJob(item);
                                                                    alert(`คุณได้รับงานของคุณ ${item.users_firstname} ${item.users_lastname} โปรดรอแอดมินตรวจสอบและติดต่อกลับ`);
                                                                    JobAcceptedCloes();
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Modal>
                                                <Buttons
                                                    label="ไม่รับงาน"
                                                    className="text-white p-2 rounded-xl"
                                                    buttonType="danger"
                                                    onClick={handleOpen}
                                                />
                                                <Modal
                                                    title="โปรดระบุเหตุผลที่ไม่รับงาน"
                                                    open={isModalOpen}
                                                    footer={false}
                                                    className="font-kanit"
                                                >
                                                    <div className="flex flex-col justify-center items-center gap-2 p-5">
                                                        <textarea
                                                            rows={4}
                                                            className="block p-2.5 w-full text-base rounded-xl text-black bg-slate-100"
                                                            placeholder="Write your thoughts here..."
                                                            value={statusText}
                                                            onChange={(e) => setStatusText(e.target.value)}
                                                        >
                                                        </textarea>
                                                        <div className="w-full flex justify-center gap-x-3">
                                                            <Buttons
                                                                label="ยกเลิก"
                                                                buttonType="primary"
                                                                className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                                onClick={handleCloes}
                                                            />
                                                            <Buttons
                                                                label="ตกลง"
                                                                buttonType="secondary"
                                                                className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                                onClick={() => {
                                                                    if (statusText) {
                                                                        handleCancelJob(item)
                                                                        handleDeclineJob(item.users_id, item.district_id, item.service_id, item.pet_id);
                                                                    } else {
                                                                        alert(`กรุณาแจ้งสาเหตุที่ไม่รับงาน`);
                                                                    }
                                                                }}
                                                                disabled={!statusText}
                                                            />
                                                        </div>
                                                    </div>
                                                </Modal>
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}
