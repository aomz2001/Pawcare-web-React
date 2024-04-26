import { Modal } from "antd";
import Buttons from "../../../../components/ItemsGroup/Button/Buttons"
import EditModal from "../../../../components/ItemsGroup/Modals/EditModal";
import { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "../../../../components/ItemsGroup/InputForm";
import httpClient from "../../../../utils/httpClient";

type PriceProps = {
    price_name: string;
    price_id: number;
};

export const PriceInfor = () => {
    const [priceData, setpriceData] = useState<PriceProps[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [price, setprice] = useState<string>("");
    const [editId, setEditId] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openEditModal = (price_id: number, price_name: string): void => {
        setEditName(price_name);
        setEditId(price_id);
        setIsModalOpen(true);
    }

    const closeEditModal = (): void => {
        setEditId(null);
        setEditName('');
        setIsModalOpen(false);
    }

    const handleSaveEdit = async (): Promise<void> => {
        if (priceData && editId) {
            try {
                const { data, status } = await httpClient.put<PriceProps>(`admin/price/${editId}`,{ price_name: editName });

                console.log(JSON.stringify(data, null, 4));
                console.log(status);

                const updatedprice = priceData.map((price) =>
                    price.price_id === editId ? { ...price, price_name: editName } : price
                );

                setpriceData(updatedprice);
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

    const handleDelete = async (price_id: number): Promise<void> => {
        if (priceData) {
            try {
                const { status } = await httpClient.delete(
                    `admin/price/${price_id}`
                );

                console.log(status);

                const updatedprice = priceData.filter((price) => price.price_id !== price_id);
                setpriceData(updatedprice);
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

    const createprice = async () => {
        try {
            const { data, status } = await httpClient.post<PriceProps>(
                'admin/price',
                { price_name: price },
            );

            console.log(JSON.stringify(data, null, 4));
            console.log(status);

            setError(null);
            setprice('');
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
                const response = await httpClient.get<PriceProps[]>('admin/price');
                setpriceData(response.data);
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
                <h3 className="font-semibold">ราคา</h3>
                <div className="flex flex-col gap-4 bg-slate-100 p-5 rounded-xl">
                    <InputForm
                        id="dataPet"
                        name="pet"
                        placeholder="ราคา"
                        value={price}
                        onChange={(e) => setprice(e.target.value)}
                    />
                    <Buttons
                        label="เพิ่มข้อมูล"
                        buttonType="success"
                        className="text-white p-2 rounded-xl"
                        onClick={createprice}
                    />
                    <div className="bg-white p-5 ">
                        <h5 className="flex  justify-center font-semibold pb-5">ข้อมูลราคา</h5>
                        {priceData && priceData.length > 0 ? (
                            priceData.map((price) => (
                                <div key={price.price_id}>
                                    ราคา : {price.price_name} บาท
                                    <div className="flex flex-col gap-3 py-3">
                                        <Buttons
                                            label="แก้ไขข้อมูล"
                                            buttonType="edit"
                                            className="text-white p-2 rounded-xl"
                                            onClick={() => openEditModal(price.price_id, price.price_name)}
                                        />
                                        <Buttons
                                            label="ลบข้อมูล"
                                            buttonType="danger"
                                            className="text-white p-2 rounded-xl"
                                            onClick={() => handleDelete(price.price_id)}
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
