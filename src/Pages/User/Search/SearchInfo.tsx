import dayjs from "dayjs";
import "dayjs/locale/th";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Avatar, Rate, Space, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import httpClient from "../../../utils/httpClient";
import './SearchInfo.css'

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("th");

interface SearchInfoGroupProps {
    detail: SearchInfoGroup;
}
interface ReviewData {
    avg_rating: number;
    provider_id: number;
}

export interface SearchInfoGroup {
    provider_id: number;
    provider_firstname: string;
    provider_lastname: string;
    district_name: string;
    pet_name: string;
    service_name: string;
    service_price: number;
    booking_start: string | null;
    booking_end: string | null;
    provider_profile: string;
}

export const SearchInfo = ({ detail, providerId }: SearchInfoGroupProps & { providerId: number }) => {

    const [reviewData, setReviewData] = useState<ReviewData[] | null>(null);
    const [imageProfile, setImageProfile] = useState<string | null>(null);

    useEffect(() => {
        httpClient.get(`/public/api/get-avg-ratings?provider_id=${providerId}`)
            .then(response => {
                setReviewData(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [providerId]);
    console.log('SearchInfoGroup', detail)
    console.log('reviewData', reviewData)
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const providerFilename = detail.provider_profile;
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
    }, []);

    return (
        <>
            <div className="flex gap-x-6 max-[1020px]:flex-col max-[1020px]:gap-y-4 max-[1020px]:items-center">
                <Space>
                    {imageProfile ? (
                        <img src={imageProfile} className="rounded-full object-cover" style={{ width: 150, height: 150, backgroundColor: '#D5D3D4' }} />
                    ) : (
                        <Avatar size={150} style={{ backgroundColor: '#D5D3D4' }} icon={<UserOutlined />} />
                    )}
                </Space>
                <div className="gap-2 flex flex-col justify-center">
                    <h3 className="text-[#F0C163]">ชื่อผู้ให้บริการ : {detail.provider_firstname} {detail.provider_lastname}</h3>
                    <div className="text-white">
                        <p>บริการ : {detail.service_name}</p>
                        <p>อำเภอ : {detail.district_name}</p>
                        <p>สัตว์เลี้ยงที่ให้บริการ : {detail.pet_name}</p>
                        <p>
                            เริ่มให้บริการ : {`${dayjs(detail.booking_start).format("DD MMMM YYYY [เวลา:] HH:mm")}`}
                        </p>
                        <p>
                            ให้บริการถึง : {`${dayjs(detail.booking_end).format("DD MMMM YYYY [เวลา:] HH:mm")}`}
                        </p>
                        {reviewData ? (
                            reviewData.map((item) => (
                                <div key={item.provider_id} className="flex items-center gap-x-3">
                                    <div className="">คะแนนรีวิว : {item.avg_rating.toFixed(1)} <Rate allowHalf disabled defaultValue={item.avg_rating} className="rate-review" /></div>
                                    {item.avg_rating >= 4 ?
                                        <Tag color="gold" className="tag-recommend">แนะนำ</Tag>
                                        : null
                                    }
                                </div>
                            ))
                        ) : (
                            <><div className="">ยังไม่มีรีวิวจากผู้ใช้งาน</div></>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-[#F0C163] flex items-center max-[1020px]:px-14">{detail.service_price} บาท / บริการ</div>
        </>
    )
}
