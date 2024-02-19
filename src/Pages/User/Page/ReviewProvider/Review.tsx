import { useNavigate, useSearchParams } from "react-router-dom";
import Buttons from "../../../../components/ItemsGroup/Button/Buttons"
import { useEffect, useState } from "react";
import { Space, Rate } from 'antd';
import httpClient from "../../../../utils/httpClient";

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
  const [value, setValue] = useState<number>(1);
  const [comment, setComment] = useState<string>("")
  const [reportProvider, setReportProvider] = useState<ReviewProps[] | null>(null);
  const [searchParams] = useSearchParams();
  const usersId = searchParams.get("usersId");
  const petId = searchParams.get("petId");
  const districtId = searchParams.get("districtId");
  const serviceId = searchParams.get("serviceId");
  const providerId = searchParams.get("providerId");
  const navigate = useNavigate();

  useEffect(() => {
    httpClient.get(`user/api/show-accept-service`, { params: { users_id: +usersId! } })
      .then(response => {
        const filteredData = response.data.data.filter((item: ReviewProps) =>
          item.users_id === parseInt(usersId!) &&
          item.pet_id === parseInt(petId!) &&
          item.district_id === parseInt(districtId!) &&
          item.service_id === parseInt(serviceId!) &&
          item.provider_id === parseInt(providerId!)
        );
        setReportProvider(filteredData);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [usersId, petId, districtId, serviceId, providerId]);

  const handleOk = async () => {
    try {
      if (!reportProvider || !reportProvider[0]) {
        console.error("Invalid reportProvider data");
        return;
      }
      const item = reportProvider[0];
  
      const response = await httpClient.post("user/api/review-job", {
        providerId: item.provider_id,
        usersId: item.users_id,
        districtId: item.district_id,
        petId: item.pet_id,
        serviceId: item.service_id,
        service_price: item.service_price,
        review_text: comment,
        ratings: value
      });
  
      console.log(response);
      alert("ขอบคุณสำหรับการแสดงความคิดเห็น")
      navigate("/");
    } catch (error) {
      console.error("Error Review:", error);
    }
  };
  console.log('reportProvider', reportProvider)

  return (
    <>
      <div className="bg-[#FFF8EA] ">
        <div className="container p-24 ">
          <h3 className="text-3xl mb-10">ให้คะแนน / รีวิว</h3>
          <div className="h-56 flex justify-center items-center ">
            <div className="flex flex-col ">
              <img src="" alt="" className="bg-slate-500 h-40 w-40 rounded-full mb-10" />
              <h3 className="text-lg">ผู้ให้บริการ : {reportProvider && reportProvider[0]?.provider_firstname} {reportProvider && reportProvider[0]?.provider_lastname}</h3>
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
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            >
            </textarea>
            <Buttons
              label="ตกลง"
              className="p-2 w-32 rounded-xl mt-3"
              buttonType="primary"
              onClick={handleOk}
            />
          </div>
        </div>
      </div>
    </>
  )
}
