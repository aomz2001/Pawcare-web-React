import type { MenuProps } from 'antd';
import { Dropdown, Space, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
    {
        key: 'myaccount',
        label: (
            <a href="/my-account" className='px-10'>
                ตั้งค่าบัญชี
            </a>
        ),
    },
    {
        key: 'notifications',
        label: (
            <a href="/notifications" className='px-10'>
                การแจ้งเตือน
            </a>
        ),
    },
    {
        key: 'signout',
        label: (
            <a href="/" className='px-10'>
                ออกจากระบบ
            </a>
        ),
    },
];


export const MyDropdown = () => {
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
