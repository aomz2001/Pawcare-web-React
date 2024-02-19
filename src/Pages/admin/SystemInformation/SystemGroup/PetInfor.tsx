import { useEffect, useState } from "react";
import Buttons from "../../../../components/ItemsGroup/Button/Buttons"
import InputForm from "../../../../components/ItemsGroup/InputForm"
import axios from "axios";
import EditModal from "../../../../components/ItemsGroup/Modals/EditModal";
import Modal from "antd/es/modal/Modal";
import httpClient from "../../../../utils/httpClient";

type PetProps = {
    pet_name: string;
    pet_id: number;
};

export const PetInfor = () => {
    const [petData, setPetData] = useState<PetProps[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [pet, setPet] = useState<string>("");
    const [editId, setEditId] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openEditModal = (pet_id: number, pet_name: string): void => {
        setEditName(pet_name);
        setEditId(pet_id);
        setIsModalOpen(true);
    }

    const closeEditModal = (): void => {
        setEditId(null);
        setEditName('');
        setIsModalOpen(false);
    }

    const handleSaveEdit = async (): Promise<void> => {
        if (petData && editId) {
            try {
                const { data, status } = await httpClient.put<PetProps>(
                    `admin/pet/${editId}`,
                    { pet_name: editName },
                );

                console.log(JSON.stringify(data, null, 4));
                console.log(status);

                const updatedPet = petData.map((pet) =>
                    pet.pet_id === editId ? { ...pet, pet_name: editName } : pet
                );

                setPetData(updatedPet);
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

    const handleDelete = async (pet_id: number): Promise<void> => {
        if (petData) {
            try {
                const { status } = await httpClient.delete(
                    `admin/pet/${pet_id}`
                );

                console.log(status);

                const updatedPet = petData.filter((pet) => pet.pet_id !== pet_id);
                setPetData(updatedPet);
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


    const createPet = async () => {
        try {
            const { data, status } = await httpClient.post<PetProps>(
                'admin/pet',
                { pet_name: pet },
            );
            console.log(JSON.stringify(data, null, 4));
            console.log(status);
            setError(null);
            setPet('');
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
                const response = await httpClient.get<PetProps[]>('public/pet');
                setPetData(response.data);
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
                <h3 className="font-semibold">สัตว์เลี้ยง</h3>
                <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-xl">
                    <InputForm
                        id="dataPet"
                        name="pet"
                        placeholder="สัตว์เลี้ยง"
                        value={pet}
                        onChange={(e) => setPet(e.target.value)}
                    />
                    <Buttons
                        label="เพิ่มข้อมูล"
                        buttonType="success"
                        className="p-2 rounded-xl"
                        onClick={createPet}
                    />
                    <div className="bg-white p-5 ">
                        <h5 className="flex  justify-center font-semibold pb-5">ข้อมูลสัตว์เลี้ยง</h5>
                        {petData && petData.length > 0 ? (
                            petData.map((pet) => (
                                <div key={pet.pet_id}>
                                    สัตว์เลี้ยง : {pet.pet_name}
                                    <div className="flex flex-col gap-3 py-3">
                                        <Buttons
                                            label="แก้ไขข้อมูล"
                                            buttonType="edit"
                                            className="p-2 rounded-xl"
                                            onClick={() => openEditModal(pet.pet_id, pet.pet_name)}
                                        />
                                        <Buttons
                                            label="ลบข้อมูล"
                                            buttonType="danger"
                                            className="p-2 rounded-xl"
                                            onClick={() => handleDelete(pet.pet_id)}
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