import { useState } from "react";
import { VertifyForWork } from "./VertifyForWork"
import { UploadFile } from "../../../components/ItemsGroup/UploadFile";
import Buttons from "../../../components/ItemsGroup/Button/Buttons";

export function WorkforPet() {
    const [isJobAccepted, setIsJobAccepted] = useState<boolean>(false);

    const handleAcceptJob = () => {
        setIsJobAccepted(true);
    };

    const handleDeclineJob = () => {
        setIsJobAccepted(false);
    };
    return (
        <>
            {/* <VertifyForWork /> */}
            <div className="flex flex-col  mb-4 rounded ">
                <h3 className="text-3xl font-semibold pb-5">งานของคุณ</h3>
                <div className="flex flex-col  md:flex-row items-center justify-between p-10 h-auto rounded-xl bg-gray-100">
                    <div className="flex flex-col gap-2">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            ผู้ใช้งาน :
                        </p>
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            ขอใช้บริการ :
                        </p>
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            ราคาที่ขอใช้บริการ :
                        </p><p className="text-2xl text-gray-400 dark:text-gray-500">
                            พื้นที่ใช้บริการ :
                        </p>
                    </div>
                    {!isJobAccepted && (
                        <div className="flex flex-col text-white gap-4 w-40">
                            <Buttons
                                label="รับงาน"
                                className="p-2 rounded-xl"
                                buttonType="success"
                                onClick={handleAcceptJob}
                            />
                            <Buttons
                                label="ไม่รับงาน"
                                className="p-2 rounded-xl"
                                buttonType="danger"
                                onClick={handleDeclineJob}
                            />
                        </div>
                    )}
                    {isJobAccepted && (
                        <div className="text-lg">โปรดรอแอดมินตรวจสอบ</div>
                    )}
                    {isJobAccepted && (
                        <div className="text-lg flex flex-col justify-center items-center gap-3">
                            <h3>เริ่มงานได้!</h3>
                            <p className="text-red-500">***อัพโหลดรูปภาพการดำเนินงานของคุณเมื่อเสร็จสิ้นแล้วเพื่อรับเงิน***</p>
                            <UploadFile />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
