import { useEffect, useState } from "react";
import Buttons from "../../../../components/ItemsGroup/Button/Buttons"
import axios from "axios";
import InputForm from "../../../../components/ItemsGroup/InputForm";
import { Modal } from "antd";
import EditModal from "../../../../components/ItemsGroup/Modals/EditModal";

type DistrictProps = {
  district_name: string;
  district_id: number;
};

export const DistrictInfor = () => {
  const [districtData, setDistrictData] = useState<DistrictProps[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [district, setDistrict] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openEditModal = (id: number, district_name: string): void => {
    setEditName(district_name);
    setEditId(id);
    setIsModalOpen(true);
  }

  const closeEditModal = (): void => {
    setEditId(null);
    setEditName('');
    setIsModalOpen(false);
  }

  const handleSaveEdit = async (): Promise<void> => {
    if (districtData && editId) {
      try {
        const { data, status } = await axios.put<DistrictProps>(
          `http://localhost:3000/district/${editId}`,
          { district_name: editName },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log(JSON.stringify(data, null, 4));
        console.log(status);

        const updatedDistrict = districtData.map((district) =>
          district.district_id === editId ? { ...district, district_name: editName } : district
        );

        setDistrictData(updatedDistrict);
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

  const handleDelete = async (district_id: number): Promise<void> => {
    if (districtData) {
      try {
        const { status } = await axios.delete(
          `http://localhost:3000/district/${district_id}`
        );

        console.log(status);

        const updatedDistrict = districtData.filter((district) => district.district_id !== district_id);
        setDistrictData(updatedDistrict);
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

  const createDistrict = async () => {
    try {
      const { data, status } = await axios.post<DistrictProps>(
        'http://localhost:3000/district',
        { district_name: district }, // เปลี่ยน key เป็น district_name
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
      setDistrict('');
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
        const response = await axios.get<DistrictProps[]>('http://localhost:3000/district');
        setDistrictData(response.data);
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
        <h3 className="font-semibold">อำเภอ</h3>
        <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-xl">
          <InputForm
            id="dataPet"
            name="pet"
            placeholder="อำเภอ"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <Buttons
            label="เพิ่มข้อมูล"
            buttonType="success"
            className="p-2 rounded-xl"
            onClick={createDistrict}
          />
          <div className="bg-white p-5 ">
            <h5 className="flex  justify-center font-semibold pb-5">ข้อมูลอำเภอ</h5>
            {districtData && districtData.length > 0 ? (
              districtData.map((district) => (
                <div key={district.district_id}>
                  อำเภอ : {district.district_name}
                  <div className="flex flex-col gap-3 py-3">
                    <Buttons
                      label="แก้ไขข้อมูล"
                      buttonType="edit"
                      className="p-2 rounded-xl"
                      onClick={() => openEditModal(district.district_id, district.district_name)}
                    />
                    <Buttons
                      label="ลบข้อมูล"
                      buttonType="danger"
                      className="p-2 rounded-xl"
                      onClick={() => handleDelete(district.district_id)}
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
