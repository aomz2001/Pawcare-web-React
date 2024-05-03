import type { MenuProps } from 'antd';
import { Dropdown, Space, Avatar, Badge } from 'antd';
import { BellOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'universal-cookie';
import './Dropdown.style.css'
import httpClient from '../../utils/httpClient';

interface UserData {
    users: any;
    users_id: number;
    users_email: string;
    users_firstname: string;
    users_lastname: string;
    users_phone: string;
    users_address: string;
}

export const MyDropdown = () => {
    const { setAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
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

    const handleSignOut = () => {
        
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('role');
        setAuthenticated(false);
        navigate('/');
        window.location.reload()
    };

    const items: MenuProps['items'] = [
        {
            key: 'myaccount',
            label: (
                <Link to="/my-account">
                    <div className="flex gap-2">
                        <SettingOutlined />
                        <div className="">ตั้งค่าบัญชี</div>
                    </div>
                </Link>
            ),
        },
        {
            key: 'notifications',
            label: (
                <Link to="/notifications">
                    <div className="flex gap-2 items-center">
                        <Badge >
                            <BellOutlined />
                        </Badge>
                        <div className="">การแจ้งเตือน</div>
                    </div>
                </Link>
            ),
        },
        {
            key: 'signout',
            label: (
                <div onClick={handleSignOut}>
                    <div className="flex gap-2 items-center">
                        <LogoutOutlined />
                        <div className="">ออกจากระบบ</div>
                    </div>
                </div>
            ),
        },
    ];

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersFilename = userData?.users[0]?.users_profile;
                const apiUrl = `http://localhost:3000/public/api/get-provider-profile?filename=${usersFilename}`;
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

    return (
        <>
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} >
                        <div className="bg-white flex items-center justify-center h-11 w-11 rounded-full cursor-pointer shadow-md">
                            {imageProfile ? (
                                <img src={imageProfile} className="rounded-full object-cover" style={{ width: 44, height: 44, backgroundColor: '#D5D3D4' }} />
                            ) : (
                                <Avatar size={44} style={{ backgroundColor: '#D5D3D4' }} icon={<UserOutlined />} />
                            )}
                        </div>
                    </Dropdown>
                </Space>
            </Space>
        </>
    )
}
