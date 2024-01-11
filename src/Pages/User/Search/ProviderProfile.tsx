import { Link } from "react-router-dom"
import { Modal } from 'antd';
import { useState } from 'react';
import Buttons from "../../../components/ItemsGroup/Button/Buttons";

export const ProviderProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="bg-[#FFF8EA] ">
                <img src="src/assets/image/flowers.jpg" alt="" className="brightness-[.75] h-52 object-cover w-full " />
                <div className="container">
                    <div className="pt-8 pb-5">
                        <div className="md:flex p-10 ">
                            <div className="">
                                <div className="bg-white h-96 w-72 border-stone-200 border-[1px] rounded-3xl">
                                    <div className="bg-violet-50 h-36 w-36 rounded-full mt-6 ml-[72px] mr-[72px] border-[1px] border-stone-200"></div>
                                    <div className="h-36 border-stone-500 flex flex-col justify-center items-center text-lg gap-2">
                                        <h3>ยืนยันตัวตน : </h3>
                                        <span>คะแนน : </span>
                                    </div>
                                    <div className="flex justify-center">
                                        <Buttons
                                            label="ส่งคำขอใช้บริการ"
                                            buttonType="success"
                                            className=" w-1/2 p-2 rounded-full"
                                            onClick={showModal}
                                        />
                                        <Modal title="ส่งคำขอใช้บริการ" open={isModalOpen} footer={false} >
                                            <p>คลิกยืนยันเพื่อส่งคำขอใช้บริการ</p>
                                            <div className="flex justify-center items-center gap-2">
                                                <Buttons
                                                    label="ตกลง"
                                                    buttonType="success"
                                                    className="mt-5 w-1/3 p-2 rounded-full"
                                                    onClick={handleOk} />
                                                <Buttons
                                                    label="ยกเลิก"
                                                    buttonType="danger"
                                                    className="mt-5 w-1/3 p-2 rounded-full"
                                                    onClick={handleCancel}
                                                />
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 pl-10 w-full">
                                <span className="text-3xl">ผู้ให้บริการ :</span>
                                <span className="text-2xl">บริการ : </span>
                                <span className="text-2xl mb-5">พื้นที่ให้บริการ : </span>
                                <span className="text-xl ">รีวิวจากผู้ใช้งาน </span>
                                <div className="h-48 bg-white border-stone-200 border-[1px] rounded-3xl hover:overflow-y-auto overflow-hidden">
                                    <div className="p-5 ">
                                        <div className="border-stone-200 border-[1px] rounded-3xl p-5 mb-3">User ? : comment 5.0 คะแนน</div>
                                        <div className="border-stone-200 border-[1px] rounded-3xl p-5 mb-3">User ? : comment 5.0 คะแนน</div>
                                        <div className="border-stone-200 border-[1px] rounded-3xl p-5 mb-3">User ? : comment 5.0 คะแนน</div>
                                        <div className="border-stone-200 border-[1px] rounded-3xl p-5 mb-3">User ? : comment 5.0 คะแนน</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to='/search-service' className="m-10 underline flex justify-end">กลับไปหน้าก่อนหน้านี้</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
