import { Link } from "react-router-dom"

export const Search = () => {
    return (
        <>
            <div className="bg-[#FFF8EA]">
                <div className="container">
                <div className="container pt-20 pb-20 flex flex-col items-center">
                    <div className="border-b-2 border-stone-200 w-full mb-10">
                        <div className="pb-2 flex gap-x-2 pl-10">
                            <div className="bg-stone-200 p-2 rounded-3xl">บริการที่แนะนำสำหรับคุณ</div>
                        </div>
                    </div>
                    <Link to='/provider-profile' className="text-lg h-auto bg-[#2D2D2D] w-4/5 mb-5 rounded-3xl pl-12 pt-6 pb-6 flex justify-between hover:bg-[#4f4f4f] " >
                        <div className="md:flex ">
                            <div className="h-44 bg-white w-44 flex items-center justify-center rounded-full">profile</div>
                            <div className="pl-9 gap-2 flex flex-col  pt-3 ">
                                <h3 className="text-[#F0C163]">ชื่อผู้ให้บริการ : </h3>
                                <p className="text-white">บริการ : </p>
                                <p className="text-white">อำเภอ : </p>
                                <p className="text-white">สัตว์เลี้ยง : </p>
                                <p className="text-white">คะแนน : </p>
                            </div>
                        </div>
                        <div className="text-[#F0C163] pr-12 flex items-center">THB ? /บริการ</div>
                    </Link>
                    <div className="h-[200px] bg-[#2D2D2D] w-4/5 rounded-3xl"></div>
                </div>
                <Link to='/' className="flex justify-end pr-28 pb-12 underline" >กลับไปหน้าก่อนหน้านี้</Link>
                </div>
            </div>
        </>
    )
}
