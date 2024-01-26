import { Link, useNavigate } from "react-router-dom"
import InputForm from "../../../components/ItemsGroup/InputForm"
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

interface SignInProps {
  status: string;
  token?: string;
  message?: string;
  provider_id?: number;
}

const Signin = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuthenProvider } = useContext(AuthContext);
  const navigate = useNavigate();

  const LoginProvider = async () => {
    try {
      const { data } = await axios.post<SignInProps>(
        'http://localhost:3000/login-provider',
        { provider_email: email, provider_password: password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(JSON.stringify(data, null, 4));
      // console.log(status);
      if (data.status === "ok" && data.token) {
        alert("Sign in Success");
        localStorage.setItem('providerId', String(data.provider_id));
        localStorage.setItem('token', data.token);
        setAuthenProvider(true)
        navigate('/provider')
      } else {
        alert("Sign in Failed");
      }
      setEmail('')
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
            <form className="flex flex-col space-y-4 md:space-y-6" action="#">
              <InputForm
                id="example"
                label="อีเมล"
                name="email"
                placeholder="xxx@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputForm
                id="example"
                label="รหัสผ่าน"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex w-full justify-end">
                <Link to="/" className="text-sm font-medium text-gray-400 hover:underline ">ลืมรหัสผ่าน?</Link>
              </div>
              <div className="flex justify-center">
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
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin