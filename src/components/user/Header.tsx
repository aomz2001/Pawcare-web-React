import { Link } from 'react-router-dom'
import { MyDropdown } from './MyDropdown'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { HashLink } from 'react-router-hash-link';
import Buttons from '../ItemsGroup/Button/Buttons';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
    const { authenticated, authenProvider, role } = useContext(AuthContext);
    const items: MenuProps['items'] = [
        {
            label: <HashLink smooth to="/#findmentor">ค้นหาพี่เลี้ยง</HashLink>,
            key: '0',
        },
        {
            label: <HashLink smooth to="/#services">บริการ</HashLink>,
            key: '1',
        },
        {
            label: <>
                <Link to={authenProvider ? '/provider' : '/provider/signup-provider'}>
                    {authenProvider ? 'ไปยังหน้าผู้ให้บริการ' : 'สมัครเป็นผู้ให้บริการ'}
                </Link>
            </>,
            key: '2',
        },
        {
            label: <HashLink smooth to="/#aboutus">เกี่ยวกับเรา</HashLink>,
            key: '3',
        },
        {
            label: <>
                {
                    role && (
                        <li>
                            <Link to='/for-admin-only' className='bg-left-bottom bg-gradient-to-r from-white to-[#815B5B] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out'>
                                ไปยังหน้าแอดมิน
                            </Link>
                        </li>
                    )
                }
            </>,
            key: '4',
        },
    ];
    return (
        <>
            <nav className="border-gray-200 bg-[#8A8178] fixed w-full z-20 shadow-md">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-[30px] ">
                    <HashLink smooth to="/#Home" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="/assets/image/Logo.png" className="h-28 absolute z-40 mt-24" alt="" />
                    </HashLink>
                    <div className="items-center justify-between hidden w-full min-[900px]:flex md:w-auto min-[900px]:order-1" id="navbar-cta">
                        <ul className="flex flex-col font-medium p-4 min-[900px]:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 min-[900px]:space-x-8 rtl:space-x-reverse min-[900px]:flex-row min-[900px]:mt-0 min-[900px]:border-0 py-2 px-3 text-lg text-white min-[900px]:bg-transparent cursor-pointer ">
                            <li className='group transition-all duration-100 ease-in-out'>
                                <HashLink smooth to="/#findmentor" className=' bg-left-bottom bg-gradient-to-r from-white to-[#815B5B] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out' >ค้นหาพี่เลี้ยง</HashLink>
                            </li>
                            <li className='group transition-all duration-100 ease-in-out'>
                                <HashLink smooth to="/#services" className='bg-left-bottom bg-gradient-to-r from-white to-[#815B5B] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out'>บริการ</HashLink>
                            </li>
                            <li className='group transition-all duration-100 ease-in-out'>
                            <Link to={authenProvider ? '/provider' : '/provider/signup-provider'} className='bg-left-bottom bg-gradient-to-r from-white to-[#815B5B] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out'>
                                {authenProvider ? 'ไปยังหน้าผู้ให้บริการ' : 'สมัครเป็นผู้ให้บริการ'}
                            </Link>
                            </li>
                            <li className='group transition-all duration-100 ease-in-out'>
                                <HashLink smooth to="/#aboutus" className='bg-left-bottom bg-gradient-to-r from-white to-[#815B5B] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out'>เกี่ยวกับเรา</HashLink>
                            </li>
                            {
                                role && (
                                    <li className='group transition-all duration-100 ease-in-out'>
                                        <Link to='/for-admin-only' className='bg-left-bottom bg-gradient-to-r from-white to-[#815B5B] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300 ease-out'>
                                            ไปยังหน้าแอดมิน
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="flex min-[900px]:order-2 space-x-3 min-[900px]:space-x-0 rtl:space-x-reverse">
                        {authenticated ? (
                            <>
                                <MyDropdown />
                                <button className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg min-[900px]:hidden hover:bg-[#a89e94] shadow-md">
                                    <Dropdown menu={{ items }} arrow={{ pointAtCenter: true }}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </button>
                            </>
                        ) : (
                            <Link to='/login'>
                                <Buttons
                                    label='เข้าสู่ระบบ'
                                    className='text-white rounded-xl px-4 py-3 shadow-md'
                                    buttonType='primary'
                                    onClick={() => { }}
                                />
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header


