import type { MenuProps } from 'antd';
import { Dropdown, Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'universal-cookie';


export const MyDropdown = () => {
    const { setAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = () => {
        const cookies = new Cookies();
        cookies.remove('token');
        cookies.remove('userId');
        setAuthenticated(false);
        navigate('/');
        
    };

    const items: MenuProps['items'] = [
        {
            key: 'myaccount',
            label: (
                <Link to="/my-account" className='px-10'>
                    ตั้งค่าบัญชี
                </Link>
            ),
        },
        {
            key: 'notifications',
            label: (
                <Link to="/notifications" className='px-10'>
                    การแจ้งเตือน
                </Link>
            ),
        },
        {
            key: 'signout',
            label: (
                <div className='px-10' onClick={handleSignOut}>
                    ออกจากระบบ
                </div>
            ),
        },
    ];
    
    return (
        <>
            <Space direction="vertical">
                <Space wrap>
                    <Dropdown menu={{ items }} placement="top"  arrow={{ pointAtCenter: true }} >
                        <div className="bg-white flex items-center justify-center h-11 w-11 rounded-full cursor-pointer ">
                            <Avatar size={44} icon={<UserOutlined />} />
                        </div>
                    </Dropdown>
                </Space>
            </Space>
        </>
    )
}
