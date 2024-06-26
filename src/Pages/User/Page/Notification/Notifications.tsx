import { Link, useNavigate } from "react-router-dom"
import Buttons from "../../../../components/ItemsGroup/Button/Buttons"
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Avatar, Modal } from "antd";
import httpClient from "../../../../utils/httpClient";
import { NotifitionCard } from "./NotifitionCard";
import { UserOutlined } from "@ant-design/icons";

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
    payment_status: string;
    payment: string;
    provider_cancel: string;
    provider_profile: string;
    cash_back: string;
}

export const Notifications = () => {
    const [acceptServiceData, setAcceptServiceData] = useState<AcceptServiceDataItem[] | null>(null);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCancelJob, setCancelJob] = useState(false);
    const [isCancelService, cancelService] = useState(false);
    const [statusText, setStatusText] = useState<string>("");
    const [cancelText, setCancelText] = useState<string>("");
    const [cancelservice, setCancelService] = useState<string>("");
    const handleOpen = () => setIsModalOpen(true);
    const handleCloes = () => setIsModalOpen(false);
    const cancelOpen = () => setCancelJob(true);
    const cancelCloes = () => setCancelJob(false);
    const cancelServiceOpen = () => cancelService(true);
    const cancelServiceCloes = () => cancelService(false);
    const [imageProfile, setImageProfile] = useState<{ [key: number]: string } | null>(null);

    useEffect(() => {
        const cookies = new Cookies();
        const userId = cookies.get('userId');

        httpClient.get(`user/api/show-accept-service?users_id=${userId}`)
            .then(response => {
                setAcceptServiceData(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleDeclineJob = (providerId: number, districtId: number, petId: number, serviceId: number, service_price: number, usersId: number) => {
        httpClient.delete("user/api/delete-accept-service", {
            data: { providerId, districtId, petId, serviceId, service_price, usersId }
        })
            .then(response => {
                console.log("Service request deleted successfully");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting service request:", error);
            });
        console.log('usersId', usersId)
    };
    const handlePayment = (item: AcceptServiceDataItem) => {
        navigate(`/payment?usersId=${item.users_id}&districtId=${item.district_id}&serviceId=${item.service_id}&petId=${item.pet_id}&providerId=${item.provider_id}`);
    };

    const handleReview = (item: AcceptServiceDataItem) => {
        navigate(`/review-provider?usersId=${item.users_id}&districtId=${item.district_id}&serviceId=${item.service_id}&petId=${item.pet_id}&providerId=${item.provider_id}`);
    };

    const ReportProvider = async (index: number) => {
        try {
            if (!acceptServiceData || acceptServiceData.length === 0 || index < 0 || index >= acceptServiceData.length) {
                console.error("Invalid reportProvider data or index");
                return;
            }

            const item = acceptServiceData[index];

            const response = await httpClient.put('user/api/report-provider', {
                report: statusText,
                providerId: item.provider_id,
                districtId: item.district_id,
                petId: item.pet_id,
                serviceId: item.service_id,
                service_price: item.service_price,
                usersId: item.users_id,
            });

            if (response.status === 200) {
                console.log(response.data);
                alert("ขอบคุณสำหรับการรายงาน")
                navigate("/")
            }
        } catch (error) {
            console.error("Error updating job completion status:", error);
        }
    };
    const understandJobCancel = (providerId: number, districtId: number, petId: number, serviceId: number, service_price: number, usersId: number, provider_cancel: string) => {
        httpClient.delete("user/api/understand-job-cancel", {
            data: { providerId, districtId, petId, serviceId, service_price, usersId, provider_cancel }
        })
            .then(response => {
                console.log("Service request deleted successfully");
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting service request:", error);
            });
    };
    const userCancelJob = async (index: number) => {
        try {
            if (!acceptServiceData || acceptServiceData.length === 0 || index < 0 || index >= acceptServiceData.length) {
                console.error("Invalid reportProvider data or index");
                return;
            }

            const item = acceptServiceData[index];

            const response = await httpClient.put('user/api/users-cancel-job', {
                users_cancel: cancelText,
                providerId: item.provider_id,
                districtId: item.district_id,
                petId: item.pet_id,
                serviceId: item.service_id,
                service_price: item.service_price,
                usersId: item.users_id,
            });

            if (response.status === 200) {
                console.log(response.data);
                alert("ยกเลิกงานเสร็จสิ้น")
                navigate("/")
            }
        } catch (error) {
            console.error("Error updating job completion status:", error);
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (acceptServiceData) {
                    await Promise.all(acceptServiceData.map(async (item) => {
                        try {
                            const apiUrl = `http://localhost:3000/public/api/get-provider-profile?filename=${item.provider_profile}`;
                            // เซ็ต URL ของรูปภาพให้กับ imageProfile โดยใช้ provider_id
                            setImageProfile(prevState => ({
                                ...prevState,
                                [item.provider_id]: apiUrl
                            }));
                        } catch (error) {
                            console.error("Error fetching data for provider:", error);
                        }
                    }));
                }
            } catch (error) {
                console.error("Error fetching provider profiles:", error);
            }
        };
        fetchData();
    }, [acceptServiceData]);

    const userCancelJobCashback = async (index: number) => {
        try {
            if (!acceptServiceData || acceptServiceData.length === 0 || index < 0 || index >= acceptServiceData.length) {
                console.error("Invalid reportProvider data or index");
                return;
            }

            const item = acceptServiceData[index];

            const response = await httpClient.put('user/api/users-cash-back', {
                cash_back: cancelservice,
                providerId: item.provider_id,
                districtId: item.district_id,
                petId: item.pet_id,
                serviceId: item.service_id,
                service_price: item.service_price,
                usersId: item.users_id,
            });

            if (response.status === 200) {
                console.log(response.data);
                alert("ยกเลิกงานเสร็จสิ้น")
                navigate("/")
            }
        } catch (error) {
            console.error("Error updating job completion status:", error);
        }

    };

    console.log('acceptServiceData', acceptServiceData)

    return (
        <>
            <div className="bg-[#FFF8EA]">
                <div className="container ">
                    <div className="sm:p-20 p-10 pt-14">
                        <h2 className="text-3xl border-b-2 border-stone-200 w-full pb-10 mb-10 flex justify-center">การแจ้งเตือน และประวัติการใช้บริการต่างๆของคุณ</h2>
                        <div className="flex flex-col justify-center items-center">
                            {acceptServiceData ? (
                                acceptServiceData.map((item, index) => (
                                    <div key={index} className="bg-stone-200 w-full max-w-4xl h-auto rounded-3xl mb-2 p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                                        <div className="flex flex-col gap-2 pb-5 sm:pb-0">
                                            <div className="flex items-center gap-6">
                                                <div className="">
                                                    {imageProfile && item.provider_id && imageProfile[item.provider_id] ? (
                                                        <img
                                                            src={imageProfile[item.provider_id]}
                                                            className="rounded-full object-cover"
                                                            style={{ width: 150, height: 150 }}
                                                        />
                                                    ) : (
                                                        <Avatar size={150} style={{ backgroundColor: '#D5D3D4' }} icon={<UserOutlined />} />
                                                    )}
                                                </div>
                                                <div className="">
                                                    <NotifitionCard title="ผู้ให้บริการ :" subtitle={`${item.provider_firstname} ${item.provider_lastname}`} />
                                                    <NotifitionCard title="บริการ :" subtitle={item.service_name} />
                                                    <NotifitionCard title="พื้นที่ให้บริการ :" subtitle={item.district_name} />
                                                    <NotifitionCard title="ประเภทสัตว์เลี้ยง :" subtitle={item.pet_name} />
                                                    <NotifitionCard title="ราคา :" subtitle={`${item.service_price} บาท`} />
                                                    {item.payment_status !== "" && (
                                                        <NotifitionCard title="สถานะการชำระเงิน :" subtitle={item.payment_status} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col">
                                            {item.provider_cancel !== "" && (
                                                <div className="max-w-[220px] flex flex-col items-center">
                                                    <p className="font-semibold text-red-700">
                                                        ขออภัย ! งานของคุณถูกยกเลิกเนื่องจากคุณ {item.provider_firstname} {item.provider_lastname}
                                                        {item.provider_cancel}
                                                    </p>
                                                    <Buttons
                                                        label="รับทราบ"
                                                        buttonType="primary"
                                                        className="text-white mt-5 w-28 p-2 rounded-full"
                                                        onClick={() => understandJobCancel(item.provider_id, item.district_id, item.pet_id, item.service_id, item.service_price, item.users_id, item.provider_cancel)}
                                                    />
                                                </div>
                                            )}
                                            {item.provider_cancel === "" && (
                                                <>
                                                    {item.payment_status !== "ชำระเงินเรียบร้อยแล้ว" && item.payment === "" &&(
                                                        <>
                                                            <Buttons
                                                                label="ชำระเงิน"
                                                                className="text-white p-2 mb-3 rounded-xl w-32"
                                                                buttonType="success"
                                                                onClick={() => handlePayment(item)}
                                                            />
                                                            <Buttons
                                                                label="ยกเลิก"
                                                                className="text-white p-2 rounded-xl w-32"
                                                                buttonType="danger"
                                                                onClick={cancelOpen}
                                                            />
                                                            <Modal
                                                                title="แจ้งพี่เลี้ยงเกี่ยวกับสาเหตุการยกเลิกงาน"
                                                                open={isCancelJob}
                                                                footer={false}
                                                                className="font-kanit">
                                                                <div className="flex flex-col justify-center items-center gap-2 p-5">
                                                                    <textarea
                                                                        rows={4}
                                                                        className="block p-2.5 w-full text-lg rounded-xl text-black bg-slate-100"
                                                                        placeholder="Write your thoughts here..."
                                                                        value={cancelText}
                                                                        onChange={(e) => setCancelText(e.target.value)}
                                                                    >
                                                                    </textarea>
                                                                    <div className="w-full flex justify-center gap-3">
                                                                        <div className="mt-5 flex gap-x-3">
                                                                            <Buttons
                                                                                label="ยกเลิก"
                                                                                buttonType="primary"
                                                                                className="text-white p-2 w-24 rounded-full"
                                                                                onClick={cancelCloes}
                                                                            />
                                                                            <Buttons
                                                                                label="ตกลง"
                                                                                className="text-white p-2 w-24 rounded-full"
                                                                                buttonType="secondary"
                                                                                onClick={() => {
                                                                                    if (cancelText) {
                                                                                        userCancelJob(index);
                                                                                        handleDeclineJob(item.provider_id, item.district_id, item.pet_id, item.service_id, item.service_price, item.users_id);
                                                                                    } else {
                                                                                        alert("กรุณาแจ้งสาเหตุยกเลิกงานให้พี่เลี้ยง");
                                                                                    }
                                                                                }}
                                                                                disabled={!cancelText}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Modal>
                                                        </>
                                                    )}
                                                    {item.payment_status === "ชำระเงินเรียบร้อยแล้ว" && (
                                                        <div className="flex flex-col gap-2 justify-center items-center">
                                                            <p className="font-bold">รอรับบริการและพี่เลี้ยงจะติดต่อคุณกลับ</p>
                                                            <p>หลังรับบริการแล้วคุณสามารถรีวิวได้ที่นี่!</p>
                                                            <Buttons
                                                                label="รีวิวพี่เลี้ยงที่นี่"
                                                                className="text-white p-2 rounded-xl w-36"
                                                                buttonType="primary"
                                                                onClick={() => handleReview(item)}
                                                            />
                                                            <Buttons
                                                                label="รายงานพี่เลี้ยง"
                                                                className="text-white p-2 rounded-xl w-36"
                                                                buttonType="danger"
                                                                onClick={handleOpen}
                                                            />
                                                        </div>
                                                    )}
                                                    <Modal
                                                        title="รายงานพี่เลี้ยงเพื่อแจ้งแอดมิน"
                                                        open={isModalOpen}
                                                        footer={false}
                                                        className="font-kanit">
                                                        <div className="flex flex-col justify-center items-center gap-2 p-5">
                                                            <textarea
                                                                rows={4}
                                                                className="block p-2.5 w-full text-lg rounded-xl text-black bg-slate-100"
                                                                placeholder="Write your thoughts here..."
                                                                value={statusText}
                                                                onChange={(e) => setStatusText(e.target.value)}
                                                            >
                                                            </textarea>
                                                            <div className="w-full flex justify-center gap-3">
                                                                <Buttons
                                                                    label="ยกเลิก"
                                                                    buttonType="danger"
                                                                    className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                                    onClick={handleCloes}
                                                                />
                                                                <Buttons
                                                                    label="รายงาน"
                                                                    buttonType="edit"
                                                                    className="text-white mt-5 w-1/4 p-2 rounded-full"
                                                                    onClick={() => {
                                                                        if (statusText) {
                                                                            handleOpen();
                                                                            ReportProvider(index);
                                                                        } else {
                                                                            alert("กรุณาแจ้งสาเหตุที่รายงานให้แอดมินทราบ");
                                                                        }
                                                                    }}
                                                                    disabled={!statusText}
                                                                />
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </>
                                            )}
                                            {item.payment !== "" && item.cash_back === "" && item.payment_status === "" && (
                                                <div className="flex flex-col items-center justify-center gap-y-4">
                                                    <p className="font-semibold text-red-700">
                                                        ** โปรดรอแอดมินกำลังตรวจสอบสถานะการชำระเงิน **
                                                    </p>
                                                    <Buttons
                                                        label="ยกเลิก"
                                                        className="text-white p-2 w-[120px] rounded-xl"
                                                        buttonType="danger"
                                                        onClick={cancelServiceOpen}
                                                    />
                                                    <Modal
                                                        title="ระบุเหตุผลเพื่อยกเลิกรายการและขอเงินคืน"
                                                        open={isCancelService}
                                                        footer={false}
                                                        className="font-kanit">
                                                        <div className="flex flex-col justify-center items-center gap-2 p-5">
                                                            <textarea
                                                                rows={4}
                                                                className="block p-2.5 w-full text-lg rounded-xl text-black bg-slate-100"
                                                                placeholder="Write your thoughts here..."
                                                                value={cancelservice}
                                                                onChange={(e) => setCancelService(e.target.value)}
                                                            >
                                                            </textarea>
                                                            <div className="w-full flex justify-center gap-3">
                                                                <div className="mt-5 flex gap-x-3">
                                                                    <Buttons
                                                                        label="ยกเลิก"
                                                                        buttonType="primary"
                                                                        className="text-white p-2 w-24 rounded-full"
                                                                        onClick={cancelServiceCloes}
                                                                    />
                                                                    <Buttons
                                                                        label="ตกลง"
                                                                        className="text-white p-2 w-24 rounded-full"
                                                                        buttonType="secondary"
                                                                        onClick={() => {
                                                                            if (cancelservice) {
                                                                                userCancelJobCashback(index);
                                                                            } else {
                                                                                alert("กรุณาแจ้งสาเหตุยกเลิกงานและขอเงินคืน");
                                                                            }
                                                                        }}
                                                                        disabled={!cancelservice}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </div>
                                            )}
                                            {item.cash_back !== "" && (
                                                <div className=" flex flex-col items-center">
                                                    <p className="font-semibold text-red-700 w-[310px]">
                                                        รอรับเงินคืนจากระบบภายใน 5 - 7 วัน<br/>
                                                        ** หมายเหตุ ระบบจะโอนเงินกลับคืนตามหมายเลข PromptPay ของท่านโปรดตรวจสอบหมายเลข PromptPay ของท่านที่
                                                        <Link to='/my-account' className="underline"> เมนูตั้งค่าบัญชี</Link> **
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>ยังไม่มีรายการ</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}