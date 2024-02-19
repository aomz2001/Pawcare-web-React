import { Link, useNavigate } from "react-router-dom"
import InputForm from "../../../components/ItemsGroup/InputForm";
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import axios from "axios";
import { useState } from "react";
import httpClient from "../../../utils/httpClient";
import { Alert, Space } from "antd";

type SignupProps = {};

export const SignupProvider = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [checkbox, setCheckbox] = useState<boolean>(false);
    const [showWarning, setShowWarning] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showFail, setShowFail] = useState<boolean>(false);
    const navigate = useNavigate();

    const createProvider = async () => {
        if (!email || !password || !firstname || !lastname || !phone || !address || !checkbox) {
            setShowWarning(true);
            setShowFail(false);
            return;
        }
        else {
            try {
                const { data, status } = await httpClient.post<SignupProps>(
                    'public/signup-provider',
                    {
                        provider_email: email,
                        provider_password: password,
                        provider_firstname: firstname,
                        provider_lastname: lastname,
                        provider_phone: phone,
                        provider_address: address
                    },
                );

                console.log(JSON.stringify(data, null, 4));
                console.log(status);
                setShowWarning(false);
                setShowFail(false);
                setShowSuccess(true);
                setTimeout(() => {
                    navigate('/provider/login-provider');
                }, 300);
                setEmail('');
                setPassword('');
                setFirstname('');
                setLastname('');
                setPhone('');
                setAddress('');
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log('error message: ', error.message);
                    setShowFail(true);
                    setShowWarning(false);
                } else {
                    console.log('unexpected error: ', error);
                }
            }
        }
    };

    return (
        <>
            <div className="brightness-50 absolute z-10">
                <img className="object-cover h-screen w-screen" src="/src/assets/image/login-provider.jpg" alt="" />
            </div>
            <div className="absolute z-20  flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold ">
                    <h2 className='text-white'>Pawcare</h2>
                </Link>
                <div className="w-full max-w-[700px]  rounded-lg shadow  md:mt-0 xl:p-0 bg-[#584E4E] ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="flex justify-center text-xl font-bold md:text-2xl text-white">
                            ลงทะเบียนผู้ให้บริการ
                        </h1>
                        <div>
                            <div className="grid md:grid-cols-2 gap-2 mb-6">
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
                                <InputForm
                                    id="fname"
                                    label="ชื่อ"
                                    name="fname"
                                    placeholder="ชื่อ"
                                    labelClassName="text-white"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                />
                                <InputForm
                                    id="lname"
                                    label="นามสกุล"
                                    name="lname"
                                    placeholder="นามสกุล"
                                    labelClassName="text-white"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                />
                                <InputForm
                                    id="phone"
                                    label="เบอร์โทรศัพท์"
                                    name="phone"
                                    placeholder="เบอร์โทรศัพท์"
                                    labelClassName="text-white"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <InputForm
                                    id="address"
                                    label="ที่อยู่"
                                    name="address"
                                    placeholder="ที่อยู่ (**โปรดกรอกที่อยู่อย่างละเอียด**)"
                                    labelClassName="text-white"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="flex text-white">
                                <InputForm
                                    type="checkbox"
                                    className="mx-2 cursor-pointer mt-[6px]"
                                    checked={checkbox}
                                    onChange={() => setCheckbox(!checkbox)}
                                />
                                <Link
                                    to='/condition'
                                    className="underline text-gray-400 hover:text-white pb-4"
                                    target="_blank"
                                >
                                    ฉันได้อ่านและยอมรับเงื่อนไขการใช้งานของ PAWCARE
                                </Link>
                            </div>
                            <div className="pb-5">
                                {showSuccess && (
                                    <Space direction="vertical" style={{ width: '100%' }}>
                                        <Alert
                                            message="ลงทะเบียนสำเร็จ"
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
                                            message="อีเมลนี้มีผู้ใช้งานแล้ว"
                                            type="error"
                                            showIcon
                                            closable
                                            onClose={() => setShowFail(false)}
                                            className="font-kanit"
                                        />
                                    </Space>
                                )}
                            </div>
                            <div className="flex justify-center">
                                <Buttons
                                    label="ลงทะเบียน"
                                    className="w-1/3 text-white p-2 rounded-full mb-3"
                                    buttonType="secondary"
                                    onClick={createProvider}
                                />
                            </div>
                        </div>
                        <p className="flex w-full text-sm font-light text-gray-400">
                            <Link to="/provider/login-provider" className="font-medium hover:text-white underline ">ไปยังหน้าเข้าสู่ระบบ</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
