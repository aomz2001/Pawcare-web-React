import { Link } from 'react-router-dom'
import Buttons from '../../../../components/ItemsGroup/Button/Buttons'

const LoginProvider = () => {
    return (
        <>
            <div id='loginmentor' className="bg-[#8A8178] h-[121px] "></div>
            <section className="bg-[#FFF8EA] h-[580px]">
                <div className="container flex">
                    <div className="py-20 sm:py-[135px] max-w-[798px]">
                        <h2 className='text-5xl pb-6'>ร่วมเป็นผู้ให้บริการไปกับเรา</h2>
                        <p className='text-2xl pb-12'>คุณสามารถร่วมธุรกิจไปกับเราได้หากคุณต้องการที่จะเป็นผู้ให้บริการ ไม่ว่าจะเป็น บริการฝากเลี้ยง บริการพาสุนัขเดินเล่น บริการซื้อขาย และอื่นๆ </p>
                        <Link to='/provider/signup-provider'>
                            <Buttons
                                label='สมัครเป็นผู้ให้บริการ'
                                buttonType='primary'
                                className='max-w-24 p-2 rounded-full'
                                onClick={() => { }}
                            />
                        </Link>
                    </div>
                    <div className="pt-[80px] max-[1290px]:hidden">
                        <div className="absolute pt-[150px]">
                            <img src='/src/assets/image/provider2.png' className='h-[219px]' alt='' />
                        </div>
                        <div className="pl-[120px] ">
                            <img src='/src/assets/image/provider1.png' className='h-[328px]' alt='' />
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-[#8A8178] h-[121px]"></div>
        </>
    )
}

export default LoginProvider