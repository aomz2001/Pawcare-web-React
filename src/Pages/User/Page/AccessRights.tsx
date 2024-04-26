import { Link } from "react-router-dom"
import Buttons from "../../../components/ItemsGroup/Button/Buttons"

const AccessRights = () => {
    return (
        <>
            <section className="bg-[#2D2D2D] h-screen">
                <div className="container w-full h-full">
                    <div className="text-white w-full h-full">
                        <div className="flex flex-col justify-center items-center w-full h-full gap-y-5">
                            <img src="src/assets/image/Logo.png" className="h-28" alt="" />
                            <div className="text-4xl">ขออภัย</div>
                            <div className="text-4xl">คุณไม่ได้รับสิทธิ์ในการเข้าถึงหน้านี้</div>
                            <Link to='/' className="bg">
                                <Buttons
                                    label={"กลับไปยังหน้าหลัก"}
                                    buttonType="secondary"
                                    className="text-white mt-5 w-60 p-2 rounded-full text-lg"
                                    onClick={() => { }}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AccessRights