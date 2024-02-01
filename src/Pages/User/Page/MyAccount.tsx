import React, { useEffect, useState } from "react";
import { Modal } from 'antd';
import InputForm from "../../../components/ItemsGroup/InputForm";
import Buttons from "../../../components/ItemsGroup/Button/Buttons";
import Cookies from "universal-cookie";
import axios from "axios";

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
    const [previewImage, setPreviewImage] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editEmail, setEditEmail] = useState("");
    const [editFirstname, setEditFirstname] = useState("");
    const [editLastname, setEditLastname] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editAddress, setEditAddress] = useState("");

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

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage('');
        }
    };

    const fetchUserData = async () => {
        try {
            const token = cookies.get('token');
            if (!token) {
                console.error("Token not found");
                return;
            }

            const { data } = await axios.get<UserData>('http://localhost:3000/users-data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

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
            window.location.href ='/my-account'
            const { data } = await axios.put<UserData>(
                `http://localhost:3000/users-data/${userData.users?.[0]?.users_id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
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
                const { status } = await axios.delete(
                    `http://localhost:3000/users-data/${users_id}`
                );
                cookies.remove('token');
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
    
    return (
        <>
            <div className="bg-[#FFF8EA]">
                <div className="container h-auto flex justify-center">
                    <div className="w-[700px] h-auto bg-white my-24 rounded-3xl">
                        <div className="p-12">
                            <h3 className="text-lg">โปรไฟล์ของคุณ</h3>
                            <div>
                                {/* <div className="h-auto flex justify-center items-center mb-16">
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={previewImage || '#'} alt="" className="bg-slate-200 h-40 w-40 rounded-full mb-5" />
                                        <input type="file" id="upload" name="upload" accept="image/*" className="w-[100px]" onChange={handleImageChange} />
                                    </div>
                                </div> */}
                                <div className="flex flex-col gap-10 text-lg pl-16 my-16">
                                    <p>อีเมล : {userData.users[0]?.users_email}</p>
                                    <p>ชื่อ : {userData.users[0]?.users_firstname}</p>
                                    <p>นามสกุล : {userData.users[0]?.users_lastname}</p>
                                    <p>เบอร์โทรศัพท์ : {userData.users[0]?.users_phone}</p>
                                    <p>ที่อยู่ : {userData.users[0]?.users_address}</p>
                                </div>
                            </div>
                            <div className="flex justify-center gap-3">
                                <Buttons
                                    label="แก้ไขข้อมูล"
                                    buttonType="edit"
                                    className="w-28 p-2 rounded-xl"
                                    onClick={handleEditClick}
                                />
                                <Buttons
                                    label="ลบบัญชี"
                                    buttonType="danger"
                                    className="w-28 p-2 rounded-xl"
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
                            label="ใช่"
                            buttonType="success"
                            className="mt-5 w-1/4 p-2 rounded-full"
                            onClick={handleSaveEdit}
                        />
                        <Buttons
                            label="ไม่ใช่"
                            buttonType="danger"
                            className="mt-5 w-1/4 p-2 rounded-full"
                            onClick={() => setOpenEdit(false)}
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
                            label="ใช่"
                            buttonType="success"
                            className="mt-5 w-1/4 p-2 rounded-full"
                            onClick={() => {
                                handleDelete(userData.users[0]?.users_id);
                                setOpenDelete(false);
                            }}
                        />
                        <Buttons
                            label="ไม่ใช่"
                            buttonType="danger"
                            className="mt-5 w-1/4 p-2 rounded-full"
                            onClick={() => setOpenDelete(false)}
                        />
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default MyAccount;
