import { Link, useNavigate } from "react-router-dom"
import InputForm from "../../../components/ItemsGroup/InputForm"
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import httpClient from "../../../utils/httpClient";
import { Alert, Space } from "antd";

interface SignInProps {
  status: string;
  token?: string;
  message?: string;
  provider_id?: number;
}

const SigninProvider = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [showFail, setShowFail] = useState<boolean>(false);
  const { setAuthenProvider } = useContext(AuthContext);
  const navigate = useNavigate();

  const LoginProvider = async () => {
    try {
      if (!email || !password) {
        setShowFail(false);
        setShowWarning(true);
        return
    }
      const { data } = await httpClient.post<SignInProps>(
        'public/login-provider',
        { provider_email: email, provider_password: password },
      );
      if (data.status === "ok" && data.token) {
        setShowWarning(false);
        setShowFail(false);
        setShowSuccess(true);
        localStorage.setItem('providerId', String(data.provider_id));
        localStorage.setItem('token', data.token);
        setAuthenProvider(true)
        setTimeout(() => {
          navigate('/provider')
      }, 300);
      } else {
        setShowFail(true);
        setShowWarning(false);
      }
      setPassword('')
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="brightness-50 absolute z-10">
        <img className="object-cover h-screen w-screen" src="/src/assets/image/login-provider.jpg" alt="" />
      </div>
      <div className="absolute z-20  flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
          <h2 className='text-white'>Pawcare</h2>
        </Link>
        <div className="w-full  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-[#584E4E] ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="flex justify-center text-xl font-bold md:text-2xl text-white">
              เข้าสู่ระบบผู้ให้บริการ
            </h1>
            <div className="flex flex-col space-y-4 md:space-y-6">
              <InputForm
                label="อีเมล"
                name="email"
                placeholder="xxx@email.com"
                labelClassName="text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputForm
                label="รหัสผ่าน"
                type="password"
                placeholder="••••••••"
                labelClassName="text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showSuccess && (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="เข้าสู่ระบบสำเร็จ"
                    type="success"
                    showIcon
                    className="font-kanit"
                  />
                </Space>
              )}
              {showWarning && (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="โปรดกรอกข้อมูลให้ครบ !!"
                    type="warning"
                    showIcon
                    closable
                    onClose={() => setShowWarning(false)}
                    className="font-kanit"
                  />
                </Space>
              )}
              {showFail && (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Alert
                    message="เข้าสู่ระบบล้มเหลว"
                    type="error"
                    showIcon
                    closable
                    onClose={() => setShowFail(false)}
                    className="font-kanit"
                  />
                </Space>
              )}
              <div className="flex justify-center pt-3">
                <Buttons
                  label="ลงทะเบียน"
                  className="w-1/3 text-white p-2 rounded-full mb-6"
                  buttonType="secondary"
                  onClick={LoginProvider}
                />
              </div>
              <p className="text-sm font-light text-gray-400">
                ยังไม่มีบัญชี? <Link to="/provider/signup-provider" className="font-medium text-white hover:underline ">ลงทะเบียน</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SigninProvider