import Buttons from "../../../components/ItemsGroup/Button/Buttons"

export const AdminWork = () => {
    return (
        <>
            <div className="text-3xl font-semibold pb-10">งานของคุณ</div>
            <div className=" h-48 mb-4 rounded text-lg">
                <div className="grid grid-cols-1 gap-8 border-2 p-10 xl:grid-cols-2">
                    <div className="flex-row justify-between items-center gap-3 xl:border-r-2 border-r-0 lg:flex md:border-b-2 md:pb-5 xl:pb-0 xl:border-b-0">
                        <div className="">
                            <h3>ผู้ใช้บริการ : </h3>
                            <p>ใช้บริการ : </p>
                            <p>สถานะการชำระเงิน : </p>
                        </div>
                        <div className="flex flex-col gap-3 mr-8">
                            <Buttons
                                label="อนุญาตให้เริ่มงาน"
                                color="#3498DB"
                                className="p-2 rounded-xl hover:bg-[#5DADE2]"
                                onClick={() => { }}
                            />
                        </div>
                    </div>
                    <div className="flex-row lg:flex justify-between items-center gap-3 ">
                        <div className="">
                            <h3>ผู้ให้บริการ : </h3>
                            <p>ให้บริการ : </p>
                            <p>สถานะงาน : </p>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Buttons
                                label="อนุญาตให้เริ่มงาน"
                                buttonType="success"
                                className="p-2 rounded-xl"
                                onClick={() => { }}
                            />
                            <Buttons
                                label="ตรวจสอบงาน / จ่ายเงินให้ผู้ให้บริการ"
                                buttonType="edit"
                                className="p-2 rounded-xl"
                                onClick={() => { }}
                            />
                            <Buttons
                                label="ยกเลิกการจ้างงาน"
                                buttonType="danger"
                                className="p-2 rounded-xl"
                                onClick={() => { }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
