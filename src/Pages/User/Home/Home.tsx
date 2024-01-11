import AboutUs from "./AboutUsGroup/AboutUs"
import FindMentor from "./FindMentorGroup/FindMentor"
import GuideBook from "./GuideBookGroup/GuideBook"
import Hero from "./Hero/Hero"
import LoginProvider from "./LoginProviderGroup/LoginProvider"
import ServicePage from "./ServiceGroup/ServicePage"

const Home = () => {
    return (
        <>
            <Hero />
            <FindMentor />
            <GuideBook />
            <ServicePage />
            <LoginProvider />
            <AboutUs />
        </>
    )
}

export default Home