import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import PromoBanar from '@/components/common/navbar/promo_banar'
import TopNav from '@/components/common/navbar/top_nav'
import BottomNav from '@/components/common/navbar/bottomNav'
import MainNav from '@/components/common/navbar/main_nav'
import FooterSection from '@/components/homepages/footersection'

const PublicRoute = ({ allowedRoles }) => {
    const { user, token } = useSelector((state) => state.auth)
    // if (token) return <Navigate to='/' replace></Navigate>
    return (
        <>
        
            <PromoBanar /> 
            <MainNav />
            <TopNav />
            <Outlet />
            <BottomNav />
            <FooterSection />
        </>
    )

}



export default PublicRoute