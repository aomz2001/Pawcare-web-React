import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { SearchInfo } from "./SearchInfo";
import { Breadcrumb, Select } from "antd";
import dogImage from '../../../assets/image/bg-dog.jpeg'
import catImage from '../../../assets/image/bg-cat.jpeg'

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
  provider_profile: string;
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
          thisProviderId: provider_id.toString(),
        });

        navigate(`/provider-profile?${searchParams.toString()}`);
      } catch (error) {
        console.error("Error in handleSearch:", error);
      }
    } else {
      console.log("Please select values for all options");
    }
  };
  console.log('searchResults', searchResults)
  return (
    <>
      <div className="bg-[#FFF8EA]">
        <div className="container">
          <div className="container pt-20 pb-20 flex flex-col items-center">
            <div className="border-b-2 border-stone-200 w-full mb-10 flex justify-between">
              <div className="flex items-center">
                <Breadcrumb
                  className="breadcrumb pb-2"
                  separator=">"
                  items={[
                    {
                      title: <Link to='/'>หน้าหลัก</Link>
                    },
                    {
                      title: 'ผู้ให้บริการ(พี่เลี้ยง)',
                    },
                  ]}
                />
              </div>
              {/* <div className="pb-2 flex gap-x-2 px-10">
                <Select
                  defaultValue="ทุกราคา"
                  className="find-mentor"
                  style={{ width: 180 }}
                  placeholder="เลือกราคา"
                  onChange={(value) => setPriceFilter(value.toString())}
                  value={priceFilter}
                  options={[
                    { value: '300', label: 'น้อยกว่า 300 บาท' },
                    { value: '500', label: 'น้อยกว่า 500 บาท' },
                    { value: '501', label: '500 บาทขึ้นไป' },
                    { value: '0', label: 'ทุกราคา' },
                  ]}
                />
              </div> */}
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
              const backgroundImage = result.pet_name === 'สุนัข' ? `url(${dogImage})` : result.pet_name === 'แมว' ? `url(${catImage})` : 'none';
              return (
                isPriceInRange && (
                  <div
                    key={result.provider_id}
                    className="text-lg h-auto bg-[#2D2D2D] w-3/5 mb-5 rounded-3xl p-10 flex justify-between hover:bg-[#4f4f4f] cursor-pointer lg:w-4/5 max-[799px]:flex-col"
                    style={{ 
                      backgroundImage,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center top', // เพิ่มคุณสมบัติ CSS background-size
                    }}
                    onClick={() => handleSearch(result.provider_id, result.pet_id, result.district_id, result.service_id)}
                  >
                    <SearchInfo key={result.provider_id} detail={result} providerId={result.provider_id} />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderSearch;
