import { Link } from 'react-router-dom'
import { MyDropdown } from './MyDropdown'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { HashLink } from 'react-router-hash-link';
import Buttons from '../ItemsGroup/Button/Buttons';

const items: MenuProps['items'] = [
    {
        label: <HashLink to="/#findmentor">ค้นหาพี่เลี้ยง</HashLink>,
        key: '0',
    },
    {
        label: <HashLink to="/#services">บริการ</HashLink>,
        key: '1',
    },
    {
        label: <Link to='/provider/signup-provider'>สมัครเป็นผู้ให้บริการ</Link>,
        key: '3',
    },
    {
        label: <HashLink to="/#aboutus">เกี่ยวกับเรา</HashLink>,
        key: '4',
    },
];

const Header = () => {
    return (
        <>
            <nav className="border-gray-200 bg-[#8A8178] fixed w-full z-20">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-[30px] ">
                    <HashLink to="/#Home" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="src/assets/image/Logo.png" className="h-28 absolute z-40 mt-24" alt="" />
                    </HashLink>
                    <div className="items-center justify-between hidden w-full min-[900px]:flex md:w-auto min-[900px]:order-1" id="navbar-cta">
                        <ul className="flex flex-col font-medium p-4 min-[900px]:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 min-[900px]:space-x-8 rtl:space-x-reverse min-[900px]:flex-row min-[900px]:mt-0 min-[900px]:border-0 py-2 px-3 text-lg text-white min-[900px]:bg-transparent cursor-pointer ">
                            <li>
                                <HashLink to="/#findmentor" className='hover:text-[#FCB245]' >ค้นหาพี่เลี้ยง</HashLink>
                            </li>
                            <li>
                                <HashLink to="/#services" className='hover:text-[#FCB245]'>บริการ</HashLink>
                            </li>
                            <li>
                                <Link to="/provider/signup-provider" className='hover:text-[#FCB245]'>สมัครเป็นผู้ให้บริการ</Link>
                            </li>
                            <li>
                                <HashLink to="/#aboutus" className='hover:text-[#FCB245]'>เกี่ยวกับเรา</HashLink>
                            </li>
                        </ul>
                    </div>
                    <div className="flex min-[900px]:order-2 space-x-3 min-[900px]:space-x-0 rtl:space-x-reverse">
                        <Link to='/login'>
                            <Buttons 
                                label='เข้าสู่ระบบ' 
                                className='rounded-xl px-4 py-3' 
                                buttonType='primary' 
                                onClick={()=>{}} 
                            />
                        </Link>
                        <MyDropdown />
                        <button className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg min-[900px]:hidden hover:bg-[#a89e94]">
                            <Dropdown menu={{ items }} arrow={{ pointAtCenter: true }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header


