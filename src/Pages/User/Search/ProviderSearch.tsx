import { Link, useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs"
import "dayjs/locale/th"
import { useState } from "react";

dayjs.locale("th")

type SearchResults = {
  provider_id: number;
  provider_firstname: string;
  provider_lastname: string;
  district_id: number;
  district_name: string;
  pet_id: number;
  pet_name: string;
  service_id: number;
  service_name: string;
  service_price: number;
  booking_start: string;
  booking_end: string;
}[];

const ProviderSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchResults: SearchResults = location.state?.searchResults || [];
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const handleSearch = (provider_id: number, pet_id: number, district_id: number, service_id: number) => {
    if (pet_id && district_id && service_id && provider_id) {
      try {
        const searchParams = new URLSearchParams({
          petId: pet_id.toString(),
          districtId: district_id.toString(),
          serviceId: service_id.toString(),
          providerId: provider_id.toString(),
        });

        navigate(`/provider-profile?${searchParams.toString()}`);
      } catch (error) {
        console.error("Error in handleSearch:", error);
      }
    } else {
      console.log("Please select values for all options");
    }
  };
  console.log('priceFilter', priceFilter)
  console.log('searchResults', searchResults)
  return (
    <>
      <div className="bg-[#FFF8EA]">
        <div className="container">
          <div className="container pt-20 pb-20 flex flex-col items-center">
            <div className="border-b-2 border-stone-200 w-full mb-10 flex justify-between">
              <div className="pb-2 flex gap-x-2 pl-10">
                <div className="bg-stone-200 p-2 rounded-3xl px-4">บริการที่แนะนำสำหรับคุณ</div>
              </div>
              <div className="pb-2 flex gap-x-2 px-10">
                <select
                  className='px-6 rounded-full cursor-pointer mx-10'
                  onChange={(e) => setPriceFilter(e.target.value)}
                  value={priceFilter || ""}
                >
                  <option value="" hidden>เลือกราคา</option>
                  <option value="300">น้อยกว่า 300 บาท</option>
                  <option value="500">น้อยกว่า 500 บาท</option>
                  <option value="501">500 บาทขึ้นไป</option>
                  <option value="0">ทุกราคา</option>
                </select>
              </div>
            </div>
            {searchResults.map((result) => {
              const isPriceInRange =
                (!priceFilter ||
                  (priceFilter === "300" && result.service_price < 300) ||
                  (priceFilter === "500" && result.service_price < 500) ||
                  (priceFilter === "501" && result.service_price >= 500) ||
                  (priceFilter === "0" && result.service_price > 0)
                );
                console.log('result.service_price', result.service_price)

              return (
                isPriceInRange && (
                  <div
                    key={result.provider_id}
                    className="text-lg h-auto bg-[#2D2D2D] w-4/5 mb-5 rounded-3xl p-10 flex justify-between hover:bg-[#4f4f4f] cursor-pointer"
                    onClick={() => handleSearch(result.provider_id, result.pet_id, result.district_id, result.service_id)}
                  >
                    <div className="md:flex">
                      <div className=" gap-2 flex flex-col justify-center">
                        <h3 className="text-[#F0C163]">ชื่อผู้ให้บริการ : {result.provider_firstname} {result.provider_lastname}</h3>
                        <p className="text-white">บริการ : {result.service_name}</p>
                        <p className="text-white">อำเภอ : {result.district_name}</p>
                        <p className="text-white">สัตว์เลี้ยงที่ให้บริการ : {result.pet_name}</p>
                        <p className="text-white">ให้บริการ : {dayjs(result.booking_start).format("DD MMMM YYYY [เวลา:] HH:mm")} ถึง {dayjs(result.booking_end).format("DD MMMM YYYY [เวลา:] HH:mm")}</p>
                      </div>
                    </div>
                    <div className="text-[#F0C163]  flex items-center">{result.service_price} บาท / บริการ</div>
                  </div>
                )
              );
            })}
          </div>
          <div className="flex justify-end pr-28 pb-12 underline">
            <Link to="/">กลับไปหน้าหลัก</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderSearch;
