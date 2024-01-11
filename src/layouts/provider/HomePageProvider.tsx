import { Outlet } from "react-router-dom"
import HeaderProvider from "../../components/provider/HeaderProvider"
import Navbar from "../../components/provider/Navbar"

const HomePageProvider = () => {
    return (
        <>
            <HeaderProvider />
            <Navbar />
            <div className=" pt-[80px] ">
                <div className="p-4 sm:ml-64">
                    <div className="p-10 h-auto mb-4 ">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePageProvider