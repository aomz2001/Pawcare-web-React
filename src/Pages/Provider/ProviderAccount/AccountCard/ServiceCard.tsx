import { CheckboxValueType } from "antd/es/checkbox/Group";
import Buttons from "../../../../components/ItemsGroup/Button/Buttons";
import { Checkbox } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "../../../../components/ItemsGroup/InputForm";

type ServiceCardProps = {
  pet_id: number;
  pet_name: string;
  district_id: number;
  district_name: string;
  service_id: number;
  service_name: string;
  price_id: number;
  price_name: string;
  provider_id: number;
  provider_name: string;
};

const ServiceCard = () => {
  const [petData, setPetData] = useState<ServiceCardProps[]>([]);
  const [districtData, setDistrictData] = useState<ServiceCardProps[]>([]);
  const [serviceData, setServiceData] = useState<ServiceCardProps[]>([]);
  const [selectedDistricts, setSelectedDistricts] = useState<CheckboxValueType[]>([]);
  const [selectedPets, setSelectedPets] = useState<CheckboxValueType[]>([]);
  const [selectedServices, setSelectedServices] = useState<CheckboxValueType[]>([]);
  const [isPriceVisible, setIsPriceVisible] = useState(false);
  const [servicePrices, setServicePrices] = useState<{ [key: number]: number }>({});


  const onChange = (checkedValues: CheckboxValueType[], type: string) => {
    switch (type) {
      case 'district':
        setSelectedDistricts(checkedValues);
        break;
      case 'pet':
        setSelectedPets(checkedValues);
        break;
      case 'service':
        setSelectedServices(checkedValues);
        setIsPriceVisible(checkedValues.length > 0);
        break;
      default:
        break;
    }
  };

  const fetchData = async () => {
    try {
      const responsePet = await axios.get('http://localhost:3000/pet');
      setPetData(responsePet.data);
      const responseDistrict = await axios.get('http://localhost:3000/district');
      setDistrictData(responseDistrict.data);
      const responseService = await axios.get('http://localhost:3000/service');
      setServiceData(responseService.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
      } else {
        console.log('unexpected error: ', error);
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmation = async () => {
    try {
      const token = localStorage.getItem('token');
      const provider_id = localStorage.getItem('provider_id');

      if (!token || !provider_id) {
        console.error("Token or provider_id not found");
        return;
      }

      if (selectedDistricts.length === 0 && selectedPets.length === 0) {
        console.log("กรุณาเลือกอำเภอที่ต้องการให้บริการ");
        return;
      }
      const servicePayload = selectedServices.map((serviceId: CheckboxValueType) => ({
        service_id: serviceId as number,
        service_price: servicePrices[serviceId as number] || 0,
      }));

      await axios.put(`http://localhost:3000/provider-data-district/${provider_id}`, {
        districtList: selectedDistricts
      });
      await axios.put(`http://localhost:3000/provider-data-pet/${provider_id}`, {
        petList: selectedPets
      });
      await axios.put(`http://localhost:3000/provider-data-service/${provider_id}`, {
        serviceList: servicePayload
      });
      // console.log(districtResponse.data);
      // console.log(petResponse.data);
      window.location.reload()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
      } else {
        console.log('unexpected error: ', error);
      }
    }
  };

  return (
    <>
      <div className="text-xl flex flex-col gap-5 border-t-2 py-6">
        อำเภอที่ต้องการให้บริการ
        <Checkbox.Group
          options={districtData.map((district) =>
            ({ label: district.district_name, value: district.district_id })
          )}
          onChange={(checkedValues) =>
            onChange(checkedValues, 'district')
          }
        />
      </div>
      <div className="text-xl flex flex-col gap-5 py-6">
        ประเภทสัตว์เลี้ยงที่ต้องการให้บริการ
        <Checkbox.Group
          options={petData.map(pet =>
            ({ label: pet.pet_name, value: pet.pet_id })
          )}
          onChange={(checkedValues) =>
            onChange(checkedValues, 'pet')
          }
        />
      </div>
      <div className="text-xl flex flex-col gap-5 py-6">
        ประเภทบริการที่ต้องการให้บริการ
        <Checkbox.Group
          className="max-w-fit flex flex-col gap-5"
          options={serviceData.map(service =>
            ({ label: service.service_name, value: service.service_id })
          )}
          onChange={(checkedValues) =>
            onChange(checkedValues, 'service')
          }
        />
        {isPriceVisible && selectedServices.length > 0 && (
          <div className="max-w-xl flex flex-col gap-y-3 text-base">
            {selectedServices.map((serviceId: CheckboxValueType) => (
              <InputForm
                key={`price_service_${serviceId}`}
                id={`price_service_${serviceId}`}
                label={`กรอกราคาสำหรับ ${serviceData.find(s => s.service_id === (serviceId as number))?.service_name}`}
                placeholder="กรอกราคาที่คุณให้บริการ เช่น 200 ..."
                onChange={(e) => {
                  const price = parseFloat(e.target.value);
                  setServicePrices((prevPrices) => ({
                    ...prevPrices,
                    [(serviceId as number)]: price,
                  }));
                }}
              />
            ))}
          </div>
        )}

      </div>
      <Buttons
        label="ยืนยัน"
        className="w-20 p-2 rounded-xl mb-6 text-base"
        buttonType="secondary"
        onClick={handleConfirmation}
      />
    </>
  );
};

export default ServiceCard;
