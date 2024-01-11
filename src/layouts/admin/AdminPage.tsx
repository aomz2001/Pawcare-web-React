import { Outlet } from "react-router-dom"
import { HeaderAdmin } from "../../components/admin/HeaderAdmin"
import { NavbarAdmin } from "../../components/admin/NavbarAdmin"

export const AdminPage = () => {
    return (
        <>
            <HeaderAdmin />
            <NavbarAdmin />
            <div className=" pt-[80px]  ">
                <div className="p-4 md:ml-64">
                    <div className="p-10 h-auto mb-4 ">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
