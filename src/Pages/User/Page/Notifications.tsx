import { Link } from "react-router-dom"
import Buttons from "../../../components/ItemsGroup/Button/Buttons"

export const Notifications = () => {
    return (
        <>
            <div className="bg-[#FFF8EA]">
                <div className="container ">
                    <div className="sm:p-20 p-10 pt-14">
                        <h2 className="text-3xl border-b-2 border-stone-200 w-full pb-2 mb-5 flex justify-center">การแจ้งเตือนของคุณ</h2>
                        <div className="flex flex-col justify-center items-center">
                            <div className="bg-stone-200 w-full max-w-3xl h-auto rounded-3xl mb-2 p-8 flex flex-col sm:flex-row sm:justify-between sm:items-center ">
                                <div className="flex flex-col gap-2 pb-5 sm:pb-0">
                                    <div >ผู้ให้บริการ : </div>
                                    <div >บริการ : </div>
                                    <div >พื้นที่ให้บริการ : </div>
                                    <div >ราคา : บาท</div>
                                </div>
                                <div className="flex flex-col">
                                    <Link to='/payment' >
                                        <Buttons
                                            label="ชำระเงิน"
                                            className="p-2 mb-3 rounded-xl w-full "
                                            buttonType="success"
                                            onClick={() => { }}
                                        ></Buttons>
                                    </Link>
                                    <Buttons
                                        label="ยกเลิก"
                                        className="p-2 rounded-xl"
                                        buttonType="danger"
                                        onClick={() => { }}
                                    />
                                </div>
                            </div>
                            <div className="bg-stone-200 w-full max-w-3xl h-44 rounded-3xl mb-2 p-8 flex justify-between items-center ">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
