import dayjs from "dayjs";
import "dayjs/locale/th";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("th");

interface SearchInfoGroupProps {
    detail: SearchInfoGroup;
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
}

export const SearchInfo = ({ detail }: SearchInfoGroupProps) => {
    return (
        <>
            <div className="">
                <div className="gap-2 flex flex-col justify-center">
                    <h3 className="text-[#F0C163]">ชื่อผู้ให้บริการ : {detail.provider_firstname} {detail.provider_lastname}</h3>
                    <div className="text-white">
                    <p>บริการ : {detail.service_name}</p>
                    <p>อำเภอ : {detail.district_name}</p>
                    <p>สัตว์เลี้ยงที่ให้บริการ : {detail.pet_name}</p>
                    <p>
                        ให้บริการ : {`${dayjs(detail.booking_start).format("DD MMMM YYYY [เวลา:] HH:mm")}`}
                        ถึง {`${dayjs(detail.booking_end).format("DD MMMM YYYY [เวลา:] HH:mm")}`}
                    </p>
                    </div>
                </div>
            </div>
            <div className="text-[#F0C163] flex items-center">{detail.service_price} บาท / บริการ</div>
        </>
    )
}
