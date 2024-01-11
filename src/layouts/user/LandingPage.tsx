import { Outlet } from 'react-router'
import Header from '../../components/user/Header'
import Footer from '../../components/user/Footer'

const LandingPage = () => {
    return (
        <>
            <Header />
            <div id='Home' className="pt-[104px]">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default LandingPage