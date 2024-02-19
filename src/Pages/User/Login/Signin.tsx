import { Link } from "react-router-dom"
import InputForm from "../../../components/ItemsGroup/InputForm"
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import { useContext, useState } from "react";
import Cookies from "universal-cookie";
import { AuthContext } from "../../../context/AuthContext";
import httpClient from "../../../utils/httpClient";
import { Alert, Space } from "antd";

interface SignInProps {
    status: string;
    token?: string;
    message?: string;
    usersId?: number;
    isAdmin?: number;
}

const Signin = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [showFail, setShowFail] = useState<boolean>(false);
    const cookies = new Cookies();
    const { setAuthenticated } = useContext(AuthContext);

    const LoginUsers = async () => {
        try {
            if (!email || !password) {
                setShowFail(false);
                setShowWarning(true);
                return
            }
            const { data } = await httpClient.post<SignInProps>(
                'public/login',
                { users_email: email, users_password: password },
            );

            if (data.status === "ok" && data.token) {
                setShowWarning(false);
                setShowFail(false);
                setShowSuccess(true);
                const encodedRole = btoa(String(data.isAdmin));
                cookies.set('userId', data.usersId)
                cookies.set('token', data.token)
                cookies.set('role', encodedRole)
                setAuthenticated(true)
                window.location.href = '/';
            } else {
                setShowFail(true);
                setShowWarning(false);
            }
            setEmail('');
            setPassword('');
            console.log('data', data);
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
                                labelClassName="text-white"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <InputForm
                                id="password"
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
                                    label="เข้าสู่ระบบ"
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

export default Signin;