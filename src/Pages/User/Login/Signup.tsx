import { Link } from "react-router-dom";
import InputForm from "../../../components/ItemsGroup/InputForm";
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import { useState } from "react";
import axios from "axios";

type SignupProps = {};

const Signup = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const createUsers = async () => {
    try {
      const { data, status } = await axios.post<SignupProps>(
        'http://localhost:3000/signup',
        {
          users_email: email,
          users_password: password,
          users_firstname: firstname,
          users_lastname: lastname,
          users_phone: phone,
          users_address: address

        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      console.log(JSON.stringify(data, null, 4));
      console.log(status);

      setEmail('');
      setPassword('');
      setFirstname('');
      setLastname('');
      setPhone('');
      setAddress('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
      } else {
        console.log('unexpected error: ', error);
      }
    }
  };

  return (
    <>
      <div className="brightness-50 absolute z-10">
        <img
          className="object-cover h-screen w-screen"
          src="/src/assets/image/cat-login.jpg"
          alt=""
        />
      </div>
      <div className="absolute z-20  flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="src/assets/image/Logo.png"
            alt=""
          />
          <h2 className="text-white">Pawcare</h2>
        </Link>
        <div className="w-full max-w-[700px] rounded-lg shadow md:mt-0 xl:p-0 bg-[#584E4E]">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="flex justify-center text-xl font-bold  md:text-2xl text-white">
              ลงทะเบียน
            </h1>
            <form action="">
              <div className="grid md:grid-cols-2 gap-2 mb-6">
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
                <InputForm
                  id="fname"
                  label="ชื่อ"
                  name="fname"
                  placeholder="ชื่อ"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                <InputForm
                  id="lname"
                  label="นามสกุล"
                  name="lname"
                  placeholder="นามสกุล"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <InputForm
                  id="phone"
                  label="เบอร์โทรศัพท์"
                  name="phone"
                  placeholder="เบอร์โทรศัพท์"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <InputForm
                  id="address"
                  label="ที่อยู่"
                  name="address"
                  placeholder="ที่อยู่"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex text-white pb-5">
                <InputForm
                  type="checkbox"
                  className="mx-2 cursor-pointer mt-[6px]"
                />
                <Link
                  to="/condition"
                  className="underline text-gray-400 hover:text-white"
                >
                  ฉันได้อ่านและยอมรับเงื่อนไขการใช้งานของ PAWCARE
                </Link>
              </div>
              <div className="flex justify-center">
                <Buttons
                  label="ลงทะเบียน"
                  className="w-1/3 text-white p-2 rounded-full mb-3"
                  buttonType="secondary"
                  onClick={createUsers}
                />
              </div>
            </form>
            <p className="flex w-full text-sm font-light text-gray-400">
              <Link
                to="/login"
                className="font-medium hover:text-white underline "
              >
                กลับไปหน้าเข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
