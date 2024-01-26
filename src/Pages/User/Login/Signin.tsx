import { Link, useNavigate } from "react-router-dom"
import InputForm from "../../../components/ItemsGroup/InputForm"
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import { useContext, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { AuthContext } from "../../../context/AuthContext";

interface SignInProps {
    status: string;
    token?: string;
    message?: string;
    users_id?: number;
}

const Signin = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const cookies = new Cookies();
    const { setAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const LoginUsers = async () => {
        try {
            const { data } = await axios.post<SignInProps>(
                'http://localhost:3000/login',
                { users_email: email, users_password: password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (data.status === "ok" && data.token ) {
                alert("Sign in Success");
                cookies.set('userId', data.users_id)
                cookies.set('token', data.token);
                setAuthenticated(true)
                navigate('/')
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
                <img className="object-cover h-screen w-screen" src="/src/assets/image/cat-login.jpg" alt="" />
            </div>
            <div className="absolute z-20  flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
                    <img className="w-8 h-8 mr-2" src="src/assets/image/Logo.png" alt="" />
                    <h2 className='text-white'>Pawcare</h2>
                </Link>
                <div className="w-full  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-[#584E4E] ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="flex justify-center text-xl font-bold md:text-2xl text-white">
                            เข้าสู่ระบบ
                        </h1>
                        <div className="flex flex-col space-y-4 md:space-y-6">
                            <InputForm
                                id="email"
                                label="อีเมล"
                                name="email"
                                placeholder="xxx@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputForm
                                id="password"
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
                                    className="px-6 py-2 rounded-full"
                                    onClick={LoginUsers}
                                    buttonType="secondary"
                                />
                            </div>
                            <p className="text-sm font-light text-gray-400">
                                ยังไม่มีบัญชี? <Link to="/signup" className="font-medium text-white hover:underline ">ลงทะเบียน</Link>
                            </p>
                            <p className="text-sm font-light text-gray-400">
                                <Link to="/provider/login-provider" className="font-medium underline hover:no-underline ">เข้าสู่ระบบผู้ให้บริการ</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin