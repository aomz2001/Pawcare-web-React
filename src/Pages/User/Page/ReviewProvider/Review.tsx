import { useSearchParams } from "react-router-dom";
import Buttons from "../../../../components/ItemsGroup/Button/Buttons"
import { useEffect, useState } from "react";
import axios from "axios";
import { Space, Rate } from 'antd';


interface ReviewProps {
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

export const Review = () => {
  const desc = ['1 คะแนน', '2 คะแนน', '3 คะแนน', '4 คะแนน', '5 คะแนน'];
  const [value, setValue] = useState(1);
  const [paymentServiceData, setPaymentServiceData] = useState<ReviewProps[] | null>(null);
  const [searchParams] = useSearchParams();
  const usersId = searchParams.get("usersId");
  const petId = searchParams.get("petId");
  const districtId = searchParams.get("districtId");
  const serviceId = searchParams.get("serviceId");
  const providerId = searchParams.get("providerId");

  console.log('usersId', usersId)
  console.log('petId', petId)

  useEffect(() => {
    axios.get(`http://localhost:3000/api/show-accept-service`, { params: { users_id: +usersId! } })
      .then(response => {
        const filteredData = response.data.data.filter((item: ReviewProps) =>
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
  console.log('paymentServiceData', paymentServiceData)
  return (
    <>
      <div className="bg-[#FFF8EA] ">
        <div className="container p-24 ">
          <h3 className="text-3xl mb-10">ให้คะแนน / รีวิว</h3>
          <div className="h-56 flex justify-center items-center ">
            <div className="flex flex-col ">
              <img src="" alt="" className="bg-slate-500 h-40 w-40 rounded-full mb-10" />
              <h3 className="text-lg">ผู้ให้บริการ : {paymentServiceData && paymentServiceData[0]?.provider_firstname} {paymentServiceData && paymentServiceData[0]?.provider_lastname}</h3>
            </div>
          </div>
          <div className="flex justify-center mt-10">
            <Space>
              <Rate tooltips={desc} onChange={setValue} value={value} />
              {value ? <span>{desc[value - 1]}</span> : ''}
            </Space>
          </div>
          <div className="p-5"></div>
          <label htmlFor="message" className="block mb-2 text-xl font-medium text-black">รีวิว / แสดงความคิดเห็น</label>
          <div className="flex flex-col items-end">
            <textarea
              rows={4}
              className="block p-2.5 w-full text-lg rounded-xl text-black "
              placeholder="Write your thoughts here..."
            >
            </textarea>
            <Buttons
              label="ตกลง"
              className="p-2 w-32 rounded-xl mt-3"
              buttonType="primary"
              onClick={() => { }}
            />
            <div className="mt-10 underline text-black cursor-pointer">
              รายงาน
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
