import React, { useEffect, useState } from "react";
import { Avatar, Modal } from 'antd';
import InputForm from "../../../components/ItemsGroup/InputForm";
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import Cookies from "universal-cookie";
import axios from "axios";
import httpClient from "../../../utils/httpClient";
import { UserOutlined } from "@ant-design/icons";

interface UserData {
    users: any;
    users_id: number;
    users_email: string;
    users_firstname: string;
    users_lastname: string;
    users_phone: string;
    users_address: string;
}

const MyAccount = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editEmail, setEditEmail] = useState("");
    const [editFirstname, setEditFirstname] = useState("");
    const [editLastname, setEditLastname] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [file, setFile] = useState<File | undefined>(undefined);
    const [imageProfile, setImageProfile] = useState<string | null>(null);

    const [userData, setUserData] = useState<UserData>({
        users: [],
        users_id: 0,
        users_email: "",
        users_firstname: "",
        users_lastname: "",
        users_phone: "",
        users_address: ""
    });

    const cookies = new Cookies();

    const fetchUserData = async () => {
        try {
            const token = cookies.get('token');
            if (!token) {
                console.error("Token not found");
                return;
            }

            const { data } = await httpClient.get<UserData>('user/users-data');

            if (data) {
                setUserData(data);
            } else {
                alert("ไม่พบข้อมูลผู้ใช้ที่เข้าสู่ระบบ");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSaveEdit = async () => {
        try {
            const token = cookies.get('token');
            if (!token) {
                console.error("Token not found");
                return;
            }

            const updatedData = {
                users_email: editEmail || userData.users_email,
                users_firstname: editFirstname || userData.users_firstname,
                users_lastname: editLastname || userData.users_lastname,
                users_phone: editPhone || userData.users_phone,
                users_address: editAddress || userData.users_address,
            };
            window.location.reload()
            const { data } = await httpClient.put<UserData>(
                `user/users-data/${userData.users?.[0]?.users_id}`,
                updatedData,
            );
            setUserData(data);
            setOpenEdit(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEditClick = () => {
        setEditEmail(userData.users[0]?.users_email);
        setEditFirstname(userData.users[0]?.users_firstname);
        setEditLastname(userData.users[0]?.users_lastname);
        setEditPhone(userData.users[0]?.users_phone);
        setEditAddress(userData.users[0]?.users_address);
        setOpenEdit(true);
    };

    const handleDelete = async (users_id: number): Promise<void> => {
        if (userData.users) {
            try {
                const { status } = await httpClient.delete(
                    `user/users-data/${users_id}`
                );
                cookies.remove('token');
                cookies.remove('userId');
                console.log(status);
                const updatedUsers = userData.users.filter((u: UserData) => u.users_id !== users_id);
                setUserData({ ...userData, users: updatedUsers });
                window.location.reload();
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log("error message: ", error.message);
                } else {
                    console.log("unexpected error: ", error);
                }
            }
        }
    };

    const handleUpload = async () => {
        const usersId = cookies.get('userId');
        if (file && usersId !== null) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('usersId', usersId);

                const response = await httpClient.put("user/api/upload-users-profile", formData);
                console.log(response.data);
                alert("อัพโหลดรูปภาพโปร์ไฟล์เสร็จสิ้น");
                window.location.reload()
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            alert("โปรดเลือกรูปภาพของคุณ");
        }
    };
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        setFile(selectedFile || undefined);
    }
    console.log('userData', userData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersFilename = userData?.users[0]?.users_profile;
                const apiUrl = `http://localhost:3000/public/api/get-provider-profile?filename=${usersFilename}`;
                console.log('apiUrl', apiUrl)
                try {
                    setImageProfile(apiUrl)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            } catch (error) {
                console.error("Error fetching payment data:", error);
            }
        };
        fetchData();
    }, [userData]);
    console.log('users_profile', userData?.users[0]?.users_profile)

    return (
        <>
            <div className="bg-[#FFF8EA]">
                <div className="container h-auto flex justify-center">
                    <div className="w-[700px] h-auto bg-white my-24 rounded-3xl">
                        <div className="p-12">
                            <h3 className="text-xl font-bold pl-16 text-[#2f2f2f]">โปรไฟล์ของคุณ</h3>
                            <div className="h-auto flex justify-center items-center mb-16">
                                <div className="flex flex-col justify-center items-center">
                                    {imageProfile ? (
                                        <img src={imageProfile} className="rounded-full object-cover" style={{ width: 150, height: 150, backgroundColor: '#D5D3D4' }} />
                                    ) : (
                                        <Avatar size={150} style={{ backgroundColor: '#D5D3D4' }} icon={<UserOutlined />} />
                                    )}
                                    <input type="file" className="ml-36 py-4 " onChange={handleFile} />
                                    <Buttons
                                        label="อัพโหลดรูปโปร์ไฟล์"
                                        color="#3498DB"
                                        className="text-white w-40 p-2  rounded-full hover:bg-[#5DADE2]"
                                        onClick={handleUpload}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-10 text-lg pl-16 my-16 text-[#2D2D2D]">
                                <p>อีเมล : {userData.users[0]?.users_email}</p>
                                <p>ชื่อ : {userData.users[0]?.users_firstname}</p>
                                <p>นามสกุล : {userData.users[0]?.users_lastname}</p>
                                <p>เบอร์โทรศัพท์ (หมายเลข PromptPay) : {userData.users[0]?.users_phone}</p>
                                <p>ที่อยู่ : {userData.users[0]?.users_address}</p>
                            </div>
                            <div className="flex justify-center gap-3">
                                <Buttons
                                    label="แก้ไขข้อมูล"
                                    buttonType="edit"
                                    className="text-white w-28 p-2 rounded-xl"
                                    onClick={handleEditClick}
                                />
                                <Buttons
                                    label="ลบบัญชี"
                                    buttonType="danger"
                                    className="text-white w-28 p-2 rounded-xl"
                                    onClick={() => setOpenDelete(true)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    title="แก้ไขข้อมูลของคุณ"
                    centered
                    open={openEdit}
                    width={1000}
                    footer={false}
                    onCancel={() => setOpenEdit(false)}
                >
                    <div className="flex flex-col gap-3">
                        <InputForm
                            id="email"
                            label="อีเมล"
                            labelColor="black"
                            placeholder={userData.users[0]?.users_email}
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                        />
                        <InputForm
                            id="fname"
                            label="ชื่อ"
                            labelColor="black"
                            placeholder={userData.users[0]?.users_firstname}
                            value={editFirstname}
                            onChange={(e) => setEditFirstname(e.target.value)}
                        />
                        <InputForm
                            id="lname"
                            label="นามสกุล"
                            labelColor="black"
                            placeholder={userData.users[0]?.users_lastname}
                            value={editLastname}
                            onChange={(e) => setEditLastname(e.target.value)}
                        />
                        <InputForm
                            id="phone"
                            label="เบอร์โทรศัพท์"
                            labelColor="black"
                            placeholder={userData.users[0]?.users_phone}
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                        />
                        <InputForm
                            id="address"
                            label="ที่อยู่"
                            labelColor="black"
                            placeholder={userData.users[0]?.users_address}
                            value={editAddress}
                            onChange={(e) => setEditAddress(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center gap-3">
                        <Buttons
                            label="ไม่ใช่"
                            buttonType="danger"
                            className="text-white mt-5 w-1/4 p-2 rounded-full"
                            onClick={() => setOpenEdit(false)}
                        />
                        <Buttons
                            label="ใช่"
                            buttonType="success"
                            className="text-white mt-5 w-1/4 p-2 rounded-full"
                            onClick={handleSaveEdit}
                        />
                    </div>
                </Modal>
                <Modal
                    title="คุณต้องการลบบัญชีใช่หรือไม่"
                    centered
                    open={openDelete}
                    width={500}
                    footer={false}
                    onCancel={() => setOpenDelete(false)}
                >
                    <div className="flex justify-center gap-3">
                        <Buttons
                            label="ไม่ใช่"
                            buttonType="danger"
                            className="text-white mt-5 w-1/4 p-2 rounded-full"
                            onClick={() => setOpenDelete(false)}
                        />
                        <Buttons
                            label="ใช่"
                            buttonType="success"
                            className="text-white mt-5 w-1/4 p-2 rounded-full"
                            onClick={() => {
                                handleDelete(userData.users[0]?.users_id);
                                setOpenDelete(false);
                            }}
                        />
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default MyAccount;
