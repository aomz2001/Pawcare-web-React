import { Link } from "react-router-dom"

export const Payment = () => {
    return (
        <>
            <div className="bg-[#FFF8EA]">
                <div className="container p-24">
                    <h2 className="text-3xl mb-10 md:mb-16">เลือกวิธีการชำระเงิน</h2>
                    <div className="w-full flex flex-col gap-5 justify-between items-center lg:flex-row">
                        <div className="flex flex-col gap-5">
                            <div className="bg-white text-xl p-8 cursor-pointer shadow-md hover:bg-slate-50">
                                โอนผ่านบัญชีธนาคาร
                            </div>
                            <div className="bg-white text-xl p-8 cursor-pointer shadow-md hover:bg-slate-50">
                                QR Payment
                            </div>
                        </div>
                        <div className="bg-red-500 flex flex-col">
                            <h3 className="bg-[#D9D9D9] px-40 py-6 text-xl shadow-md">รายละเอียดการชำระเงิน</h3>
                            <div className=" bg-white p-10 text-lg shadow-md flex flex-col gap-5">
                                <div className="flex justify-between">
                                    <div>บริการของคุณ </div>
                                    <div>บาท</div>
                                </div>
                                <div className="flex justify-between">
                                    <div>ค่ารับ-ส่ง </div>
                                    <div>บาท</div>
                                </div>
                                <div className="flex justify-between border-t-2 pt-5">
                                    <div>รวมราคาค่าบริการทั้งหมด </div>
                                    <div>บาท</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-16 underline">
                    <Link to='/notifications' className="" >กลับไปหน้าก่อนหน้านี้</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
