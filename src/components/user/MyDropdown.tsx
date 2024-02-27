import type { MenuProps } from 'antd';
import { Dropdown, Space, Avatar, Badge } from 'antd';
import { BellOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'universal-cookie';
import './Dropdown.style.css'


export const MyDropdown = () => {
    const { setAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        const cookies = new Cookies();
        cookies.remove('token');
        cookies.remove('userId');
        cookies.remove('role');
        setAuthenticated(false);
        navigate('/');
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

    return (
        <>
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown menu={{ items }} placement="bottomRight" arrow={{ pointAtCenter: true }} >
                        <div className="bg-white flex items-center justify-center h-11 w-11 rounded-full cursor-pointer shadow-md">
                            <Avatar size={44} icon={<UserOutlined />} />
                        </div>
                    </Dropdown>
                </Space>
            </Space>
        </>
    )
}
