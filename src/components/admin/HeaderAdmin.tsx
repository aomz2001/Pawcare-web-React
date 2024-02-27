import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import Cookies from "universal-cookie";
import { Modal } from "antd";
import Buttons from "../ItemsGroup/Button/Buttons";

export const HeaderAdmin = () => {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(true);
  const handleCloes = () => setIsModalOpen(false);
  const [openNavbar, setOpenNavbar] = useState(false);
  const handleToggleNavbar = () => setOpenNavbar(!openNavbar);
  const handleCloseNavbar = () => setOpenNavbar(false);

  const handleSignOut = () => {
    const cookies = new Cookies();
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('role');
    setAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      <header className="border-gray-200 bg-[#8e3434] fixed w-full z-20 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-start p-5">
          <div className="flex">
            <button
              className="inline-flex items-center justify-center p-2 mr-4 w-10 h-10 text-sm text-white rounded-lg min-[768px]:hidden "
              onClick={handleToggleNavbar}
            >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
            <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="src/assets/image/Logo.png" className="h-10 " alt="" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Pawcare Admin</span>
            </Link>
          </div>
        </div>
        {openNavbar && (
          <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-[#996767]">
            <ul className="space-y-2 font-medium ">
              <li>
                <Link
                  to="/for-admin-only/system-information"
                  className="flex items-center p-2 text-white rounded-lg  hover:bg-[#d28e8e] "
                  onClick={handleCloseNavbar}
                >
                  <svg className="w-5 h-5 text-[#584E4E]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ms-3">ข้อมูลระบบ</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/for-admin-only/work-admin"
                  className="flex items-center p-2 text-white rounded-lg  hover:bg-[#d28e8e]"
                  onClick={handleCloseNavbar}
                >
                  <svg className="w-5 h-5 text-[#584E4E]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">งานของคุณ</span>
                </Link>
              </li>
              <li>
                <div
                  className="flex items-center p-2 text-white rounded-lg  hover:bg-[#d28e8e]"
                  onClick={handleOpen}
                >
                  <svg className="w-5 h-5 text-[#584E4E] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                    <path stroke="currentColor" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">ออกจากระบบ</span>
                </div>
              </li>
            </ul>
          </div>
        )}
      </header>
      <Modal
        title="ออกจากระบบ"
        open={isModalOpen}
        footer={false}
        className="font-kanit">
        <div className="flex flex-col gap-2 mb-4">
          <div className="w-full flex justify-end items-center gap-3 ">
            <Buttons
              label="ยกเลิก"
              color="#996767"
              className=" mt-6 w-1/4 p-2 rounded-full border border-[#822f2f] hover:bg-[#f8d8d8]"
              onClick={handleCloes}
            />
            <Buttons
              label="ตกลง"
              color="#822f2f"
              className="mt-6 w-1/4 p-2 rounded-full hover:bg-[#b34242]"
              onClick={handleSignOut}
            />
          </div>
        </div>
      </Modal>
    </>
  )
}
