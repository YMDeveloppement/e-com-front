import { useSelector } from "react-redux";
import { useRef, useState , useEffect } from 'react'
import '@/assets/css/home.scss'
import MainSection from '@/components/MainSection'
import PromoBanar from '@/components/common/navbar/promo_banar'
import TopNav from '@/components/common/navbar/top_nav'
import BottomNav from '@/components/common/navbar/bottomNav'
import MainNav from '@/components/common/navbar/main_nav'
import FooterSection from '@/components/homepages/footersection'
import AdventagesSection from '@/components/homepages/adventagesection'
import WeeklyProduct from '@/components/homepages/weeklyproduct'
import ArriveSection from '@/components/homepages/arrivesection'
import EditorsPick from '@/components/homepages/editorspick'
import getHomeData from '@/services/homeService.js'

export default function Home() {
    const { user, token } = useSelector((state) => state.auth)
    const [ slidersData, setSliderData ] = useState([])

    useEffect(()=> {
        getHomeData().then((res)=>{
            let dataSlider = res.data_catg_slider
            setSliderData(dataSlider)
            console.log('dataSlider' , dataSlider)
        })
    } , [])

    return (
        <div className="content-home">
            <MainSection />
            <AdventagesSection />
            <WeeklyProduct />
            <ArriveSection data_categories={slidersData}/>

            <div className="image-pub1" style={{height:"100px" , maxWidth:" 1300px"}}>
                <img style={{height:"100%" , maxWidth:"100%"}} src="./src/assets/imgs/pub/img-pubsection1.png" alt="" />
            </div>

            <EditorsPick />
            <div style={{height:'100px'}}></div>
        </div>
    );

}