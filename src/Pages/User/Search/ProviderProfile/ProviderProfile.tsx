import { useNavigate, useSearchParams } from "react-router-dom";
import { Modal, Space, DatePicker, Breadcrumb, Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Buttons from "../../../../components/ItemsGroup/Button/Buttons";
import Cookies from "universal-cookie";
import { RangeValue } from "rc-picker/lib/interface"
import './ProviderProfile.css'

const { RangePicker } = DatePicker;
import dayjs from "dayjs"
import "dayjs/locale/th"
import { SwapOutlined, UserOutlined } from "@ant-design/icons";
import httpClient from "../../../../utils/httpClient";
import { AuthContext } from "../../../../context/AuthContext";
import { ProviderProfileInfo } from "./ProviderProfileInfo";
import { Link } from "react-router-dom";


type ProviderProfileData = {
    users_id: number;
    users_firstname: string;
    users_lastname: string;
    providerId: number;
    provider_firstname: string;
    provider_lastname: string;
    provider_profile: string;
    service_id: string;
    service_name: string;
    district_name: string;
    service_price: number;
    pet_name: string;
    review_text: string;
    review_time: string;
    ratings: number;
    report: number;
    booking_start: string;
    booking_end: string;
};

export const ProviderProfile = () => {
    const [searchParams] = useSearchParams();
    const [providerProfileData, setProviderProfileData] = useState<ProviderProfileData[] | null>(null);
    const [reviewData, setReviewData] = useState<ProviderProfileData[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [firstTime, setFirstTime] = useState<string | null>(null);
    const [secondTime, setSecondTime] = useState<string | null>(null);
    const [imageProfile, setImageProfile] = useState<string | null>(null);
    const petId = searchParams.get("petId");
    const districtId = searchParams.get("districtId");
    const serviceId = searchParams.get("serviceId");
    const providerId = searchParams.get("providerId");
    const thisProviderId = searchParams.get("thisProviderId");
    const cookies = new Cookies();
    const userId = cookies.get('userId');
    const [selectTime, setSelectTime] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
    const navigate = useNavigate();
    const { authenticated } = useContext(AuthContext);

    const handleTimeChange = (value: RangeValue<dayjs.Dayjs>) => {
        setSelectTime(value as [dayjs.Dayjs, dayjs.Dayjs]);
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        try {
            if (!selectTime) {
                alert("** โปรดระบุวันที่ต้องการใช้บริการ **");
                return;
            }
            if (providerProfileData && providerProfileData.length > 0) {
                const selectedTimeValues = selectTime?.length === 2
                    ? selectTime.map(e => e && e.add(7, "hours").toISOString())
                    : [null, null];

                // ดึงวันที่ปัจจุบัน
                const today = dayjs();

                // ตรวจสอบว่าวันที่ที่ผู้ใช้เลือกมากกว่าวันปัจจุบันหรือไม่
                const isFutureDate = selectTime && selectTime[0].isAfter(today);

                if (!isFutureDate) {
                    // ถ้าวันที่เลือกไม่ใช่วันถัดไป
                    alert("** หมายเหตุ โปรดเลือกวันหรือเวลาการจองอย่างน้อยก่อน 1 วัน **");
                    setSelectTime(null);
                    setFirstTime(null);
                    setSecondTime(null);
                    return; // ออกจาก function เพื่อไม่ให้ทำการส่งคำขอ
                }

                if (authenticated === false) {
                    navigate('/login')
                }
                if (!firstTime || !secondTime) {
                    // ถ้าวันที่เลือกไม่ใช่วันถัดไป
                    alert("** หมายเหตุ โปรดเลือกระบุเวลาที่ต้องการใช้บริการ **");
                    return; // ออกจาก function เพื่อไม่ให้ทำการส่งคำขอ
                }
                const response = await httpClient.post('user/api/req-service', {
                    pet_id: petId,
                    district_id: districtId,
                    service_id: serviceId,
                    provider_id: providerId,
                    service_price: providerProfileData[0]?.service_price,
                    users_id: String(userId),
                    booking_first: selectedTimeValues[0],
                    booking_second: selectedTimeValues[1],
                    time_first: firstTime,
                    time_second: secondTime
                });
                console.log(response);
                setIsModalOpen(false);
                alert("ส่งคำขอใช้บริการเสร็จสิ้นหากพี่เลี้ยงรับงานของคุณโปรดรอชำระเงิน")
                navigate("/")
            } else {
                console.error("providerProfileData is null or empty");
            }
        } catch (error) {
            console.error("Error handling request:", error);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectTime(null);
        setFirstTime(null);
        setSecondTime(null);
    };

    useEffect(() => {
        const fetchProviderData = async () => {
            try {
                const response = await httpClient.post('public/api/provider-data', {
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
        httpClient.get(`public/api/get-review?provider_id=${providerId}`)
            .then(response => {
                setReviewData(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleBackPage = async () => {
        if (thisProviderId) {
            try {
                const response = await httpClient.post('public/api/search-provider', {
                    id: thisProviderId
                });

                const searchResults = response.data.data;

                console.log('searchResults', searchResults)
                if (searchResults.length > 0) {
                    navigate('/search-provider-service', { state: { searchResults } });
                } else {
                    console.log('No results found');
                    alert('ไม่พบข้อมูลผู้ให้บริการ');
                }
            } catch (error) {
                console.error('Error searching for provider:', error);
                alert('!! ไม่พบข้อมูลผู้ให้บริการ !!');
            }
            return
        }
        if (petId && districtId && serviceId) {
            try {
                const searchParams = new URLSearchParams({
                    petId: petId.toString(),
                    districtId: districtId.toString(),
                    serviceId: serviceId.toString(),
                });

                navigate(`/search-service?${searchParams.toString()}`);
            } catch (error) {
                console.error("Error in handleSearch:", error);
            }
        }
        else {
            console.log("Please select values for all options");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const providerFilename = providerProfileData && providerProfileData[0] && providerProfileData[0].provider_profile;
                const apiUrl = `http://localhost:3000/public/api/get-provider-profile?filename=${providerFilename}`;
                console.log('apiUrl', apiUrl)
                console.log('providerFilename', providerFilename)
                try {
                    setImageProfile(apiUrl)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            } catch (error) {
                console.error("Error fetching payment data:", error);
            }
        };
        fetchData();
    }, [providerProfileData]);
    console.log('imageProfile', imageProfile)
    console.log('providerProfileData', providerProfileData && providerProfileData[0] && providerProfileData[0].provider_profile);


    const bookingTime = [
        { value: '00:00', label: '00:00 น.' },
        { value: '01:00', label: '01:00 น.' },
        { value: '02:00', label: '02:00 น.' },
        { value: '03:00', label: '03:00 น.' },
        { value: '04:00', label: '04:00 น.' },
        { value: '05:00', label: '05:00 น.' },
        { value: '06:00', label: '06:00 น.' },
        { value: '07:00', label: '07:00 น.' },
        { value: '08:00', label: '08:00 น.' },
        { value: '09:00', label: '09:00 น.' },
        { value: '10:00', label: '10:00 น.' },
        { value: '11:00', label: '11:00 น.' },
        { value: '12:00', label: '12:00 น.' },
        { value: '13:00', label: '13:00 น.' },
        { value: '14:00', label: '14:00 น.' },
        { value: '15:00', label: '15:00 น.' },
        { value: '16:00', label: '16:00 น.' },
        { value: '17:00', label: '17:00 น.' },
        { value: '18:00', label: '18:00 น.' },
        { value: '19:00', label: '19:00 น.' },
        { value: '20:00', label: '20:00 น.' },
        { value: '21:00', label: '21:00 น.' },
        { value: '22:00', label: '22:00 น.' },
        { value: '23:00', label: '23:00 น.' },
    ]

    return (
        <div className="bg-[#FFF8EA] ">
            {providerProfileData ? (
                <div className="container">
                    <div className="py-10">
                        <div className="flex p-10 flex-col ">
                            <div className="border-b-2 border-stone-200 w-full mb-10 flex justify-between">
                                <div className="flex items-center pb-3">
                                    <Breadcrumb
                                        className="breadcrumb"
                                        separator=">"
                                        items={[
                                            {
                                                title: <Link to='/'>หน้าหลัก</Link>
                                            },
                                            {
                                                title: <div className="px-1 cursor-pointer hover:bg-[#e0d7d773] hover:text-black hover:rounded-[4px]" onClick={handleBackPage}>ผู้ให้บริการ(พี่เลี้ยง)</div>,
                                            },
                                            {
                                                title: `พี่เลี้ยง : ${providerProfileData[0].provider_firstname} ${providerProfileData[0].provider_lastname}`,
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="flex max-[804px]:flex-col max-[804px]:items-center gap-12">
                                <div className="">
                                    <div className="bg-white h-[360px] w-72 border-stone-200 border-[1px] rounded-3xl ">
                                        <div className="bg-violet-50 h-36 w-36 rounded-full mt-6 ml-[72px] mr-[72px] border-[1px] border-stone-200">
                                            <div className="flex justify-center items-center h-full">
                                                {imageProfile && (
                                                    <img
                                                        src={imageProfile}
                                                        className="rounded-full object-cover"
                                                        style={{ width: 150, height: 150, backgroundColor: '#D5D3D4' }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="h-28 border-stone-500 flex flex-col justify-center items-center text-lg gap-2">
                                            <span className="text-lg">
                                                ผู้ให้บริการ : {providerProfileData[0].provider_firstname} {providerProfileData[0].provider_lastname}
                                            </span>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-3">
                                            <Buttons
                                                label="ส่งคำขอใช้บริการ"
                                                buttonType="success"
                                                className="text-white w-1/2 p-2 rounded-full"
                                                onClick={showModal}
                                            />
                                            <Modal title="ส่งคำขอใช้บริการ" open={isModalOpen} footer={false} className="font-kanit">
                                                <h3 className="text-xl font-semibold">รายการของคุณ</h3>
                                                <div className="py-3 flex flex-col gap-1 text-base">
                                                    <p>- {providerProfileData[0].service_name} ราคา {providerProfileData[0].service_price} บาท</p>
                                                    <p>- {providerProfileData[0].pet_name}</p>
                                                    <p>- {providerProfileData[0].district_name}</p>
                                                    <p className="pt-3 font-semibold">คุณสามารถเลือกจองวันที่คุณสนใจได้</p>
                                                    <Space direction="vertical" size={12}>
                                                        <RangePicker
                                                            value={selectTime}
                                                            onChange={handleTimeChange}
                                                        />
                                                    </Space>
                                                    {selectTime && (
                                                        <>
                                                            <p className="pt-3 font-semibold ">เลือกเวลาที่คุณต้องการใช้บริการ</p>
                                                            <div className="flex justify-between ">
                                                                <div className="">
                                                                    <Select
                                                                        className="select-time"
                                                                        style={{ width: 180 }}
                                                                        placeholder="เวลาเริ่มใช้บริการ"
                                                                        onChange={(value) => setFirstTime(value.toString())}
                                                                        value={firstTime}
                                                                        options={bookingTime}
                                                                    />
                                                                </div>
                                                                <SwapOutlined />
                                                                <div className="">
                                                                    <Select
                                                                        className="select-time"
                                                                        style={{ width: 180 }}
                                                                        placeholder="เวลาสิ้นสุดการใช้บริการ"
                                                                        onChange={(value) => setSecondTime(value.toString())}
                                                                        value={secondTime}
                                                                        options={bookingTime}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex justify-center items-center gap-2">
                                                    <Buttons
                                                        label="ยกเลิก"
                                                        buttonType="danger"
                                                        className="text-white mt-5 w-1/3 p-2 rounded-full"
                                                        onClick={handleCancel}
                                                    />
                                                    <Buttons
                                                        label="ตกลง"
                                                        buttonType="success"
                                                        className="text-white mt-5 w-1/3 p-2 rounded-full"
                                                        onClick={handleOk}
                                                    />
                                                </div>
                                            </Modal>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 w-full justify-center">
                                    <ProviderProfileInfo
                                        title='บริการของคุณ : '
                                        subtitle={providerProfileData[0].provider_firstname + " " + providerProfileData[0].provider_lastname}
                                        detail={providerProfileData[0].service_name}
                                    />
                                    <ProviderProfileInfo
                                        title='พื้นที่ให้บริการ '
                                        detail={providerProfileData[0].district_name}
                                    />
                                    <ProviderProfileInfo
                                        title='ช่วงเวลาที่ให้บริการ '
                                        detail={dayjs(providerProfileData[0].booking_start).format("DD MMMM YYYY [เวลา :] HH:mm") + ' ถึง ' + dayjs(providerProfileData[0].booking_end).format("DD MMMM YYYY [เวลา :] HH:mm")}
                                    />
                                    <ProviderProfileInfo
                                        title='รีวิวจากผู้ใช้งาน '
                                        comment={
                                            <>
                                                {reviewData ? (
                                                    reviewData.map((item) => (
                                                        <div className="bg-stone-100 rounded-3xl p-5 mb-3 flex justify-between">
                                                            <div className="">
                                                                <div className="">ผู้ใช้งาน : {item.users_firstname} {item.users_lastname} </div>
                                                                <div className="">ให้คะแนน : {item.ratings} คะแนน</div>
                                                                <div className="">แสดงความคิดเห็น : {item.review_text}</div>
                                                            </div>
                                                            <div className="text-stone-400">แสดงความคิดเห็นเมื่อ {item.review_time}</div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <><div className="border-stone-200 border-[1px] rounded-3xl p-5 mb-3">ยังไม่มีรีวิวจากผู้ใช้งาน</div></>
                                                )}
                                            </>
                                        }
                                    />
                                </div>
                            </div>
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