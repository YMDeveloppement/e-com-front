import React, { useState, useRef } from "react";
import "@/assets/css/adventagesection.css"

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import beards from '@/assets/imgs/categories_img/beards.png'
import beverage from '@/assets/imgs/categories_img/beverage.png'
import biscuits_snacks from '@/assets/imgs/categories_img/biscuits_snacks.png'
import breaksfast from '@/assets/imgs/categories_img/breaksfast.png'
import frozen from '@/assets/imgs/categories_img/frozen.png'
import grocery from '@/assets/imgs/categories_img/grocery.png'
import pregnancy from '@/assets/imgs/categories_img/pregnancy.png'
import vegetable from '@/assets/imgs/categories_img/vegetable.png'
import stock from  "@/assets/imgs/adventage-img/en-stock.png"
import delivery from  "@/assets/imgs/adventage-img/logistics-delivery.png"
import securise from  "@/assets/imgs/adventage-img/paiement-securise.png"
import superieure from  "@/assets/imgs/adventage-img/qualite-superieure.png"


export default function AdventagesSection() {

    let [arr_advantages, setArr_advantages] = useState([
        stock,
        delivery,
        securise,
        superieure
    ])
    let [arr_volets, setArr_volets] = useState([beards, beverage, biscuits_snacks, breaksfast, frozen, grocery, pregnancy, vegetable, grocery])
    const [volets, setVolets] = useState([
        { id: 1, title: "Fruits & Vegetables" , path_img:beards },
        { id: 2, title: "Baby & Pregnancy" , path_img:beverage },
        { id: 3, title: "Beverages" , path_img:biscuits_snacks },
        { id: 4, title: "Meats & Seafood" , path_img:breaksfast },
        { id: 5, title: "Biscuits & Snacks" , path_img:frozen },
        { id: 6, title: "Breads & Bakery" , path_img:grocery },
        { id: 7, title: "Breakfast & Dairy" , path_img:pregnancy },
        { id: 8, title: "Frozen Foods" , path_img:vegetable },
        { id: 9, title: "Grocery & Staples" , path_img:grocery },
    ]);
    return (

        <>
            <div className="adventage-section row py-4 border-top border-bottom">
                {arr_advantages.map((item, index) => {
                    return (
                        <div className="col-12 col-sm-6 col-md-4  col-lg-3  d-flex align-items-center gap-3 mb-4" key={index}>
                            <div className="mt-3">
                                <img className="icon-advent" src={item} alt="Free Shipping" />
                            </div>
                            <div>
                                <h6 className="p-0 m-0">Payment only online</h6>
                                <p className="p-0 m-0">On all orders over $100</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="swip-container mx-auto" style={{}}>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={5}
                    navigation={false}
                >

                    {volets.map((item, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="slider-content d-flex align-items-center card border-0">
                                    <div className="imageContaine">
                                        <img src={item.path_img}  alt="..." />
                                    </div>
                                    <div>
                                        <h6 className="pt-2 m-0">{item.title}</h6>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    }
                    )}

                </Swiper>

            </div>
        </>
    )


}