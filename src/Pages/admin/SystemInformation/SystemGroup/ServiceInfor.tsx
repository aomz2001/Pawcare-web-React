import { useEffect, useState } from "react";
import Buttons from "../../../../components/ItemsGroup/Button/Buttons"
import axios from "axios";
import InputForm from "../../../../components/ItemsGroup/InputForm";
import { Modal } from "antd";
import EditModal from "../../../../components/ItemsGroup/Modals/EditModal";

type ServiceProps = {
  service_name: string;
  service_id: number;
};

export const ServiceInfor = () => {
  const [serviceData, setServiceData] = useState<ServiceProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openEditModal = (service_id: number, service_name: string): void => {
    setEditName(service_name);
    setEditId(service_id);
    setIsModalOpen(true);
  }

  const closeEditModal = (): void => {
    setEditId(null);
    setEditName('');
    setIsModalOpen(false);
  }

  const handleSaveEdit = async (): Promise<void> => {
    if (serviceData && editId) {
      try {
        const { data, status } = await axios.put<ServiceProps>(
          `http://localhost:3000/service/${editId}`,
          { service_name: editName },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log(JSON.stringify(data, null, 4));
        console.log(status);

        const updatedService = serviceData.map((service) =>
        service.service_id === editId ? { ...service, service_name: editName } : service
        );

        setServiceData(updatedService);
        closeEditModal();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          setError(error.message);
        } else {
          console.log("unexpected error: ", error);
          setError("An unexpected error occurred");
        }
      }
    }
  };

  const handleDelete = async (service_id: number): Promise<void> => {
    if (serviceData) {
      try {
        const { status } = await axios.delete(
          `http://localhost:3000/service/${service_id}`
        );

        console.log(status);

        const updatedService = serviceData.filter((service) => service.service_id !== service_id);
        setServiceData(updatedService);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error message: ", error.message);
          setError(error.message);
        } else {
          console.log("unexpected error: ", error);
          setError("An unexpected error occurred");
        }
      }
    }
  };

  const createservice = async () => {
    try {
      const { data, status } = await axios.post<ServiceProps>(
        'http://localhost:3000/service',
        { service_name: service }, // เปลี่ยน key เป็น service_name
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      console.log(JSON.stringify(data, null, 4));
      console.log(status);

      setError(null);
      setService('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        setError(error.message);
      } else {
        console.log('unexpected error: ', error);
        setError('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    // ใช้ useEffect เพื่อดึงข้อมูลเมื่อคอมโพเนนต์โหลด
    const fetchData = async () => {
      try {
        const response = await axios.get<ServiceProps[]>('http://localhost:3000/service');
        setServiceData(response.data);
        setError(null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log('error message: ', error.message);
          setError(error.message);
        } else {
          console.log('unexpected error: ', error);
          setError('An unexpected error occurred');
        }
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-col p-10 text-lg gap-2 max-w-lg">
        <h3 className="font-semibold">บริการของระบบ</h3>
        <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-xl">
          <InputForm
            id="dataPet"
            name="pet"
            placeholder="บริการของระบบ"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <Buttons
            label="เพิ่มข้อมูล"
            buttonType="success"
            className="p-2 rounded-xl"
            onClick={createservice}
          />
          <div className="bg-white p-5 ">
            <h5 className="flex  justify-center font-semibold pb-5">ข้อมูลบริการของระบบ</h5>
            {serviceData && serviceData.length > 0 ? (
              serviceData.map((service) => (
                <div key={service.service_id}>
                  บริการของระบบ : {service.service_name}
                  <div className="flex flex-col gap-3 py-3">
                    <Buttons
                      label="แก้ไขข้อมูล"
                      buttonType="edit"
                      className="p-2 rounded-xl"
                      onClick={() => openEditModal(service.service_id, service.service_name)}
                    />
                    <Buttons
                      label="ลบข้อมูล"
                      buttonType="danger"
                      className="p-2 rounded-xl"
                      onClick={() => handleDelete(service.service_id)}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>ไม่มีข้อมูล</div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal title="แก้ไขข้อมูล" open={isModalOpen} onOk={handleSaveEdit} onCancel={closeEditModal} footer={false}>
          <EditModal
            editName={editName}
            setEditName={setEditName}
            handleSaveEdit={handleSaveEdit}
            closeEditModal={closeEditModal}
          />
        </Modal>
      )}
    </>
  )
}
