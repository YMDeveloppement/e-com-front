import React, { useState, useRef } from "react";
import "@/assets/css/adventagesection.css"

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function AdventagesSection() {

    let [arr_advantages, setArr_advantages] = useState(["./src/assets/imgs/adventage-img/en-stock.png", "./src/assets/imgs/adventage-img/logistics-delivery.png", "./src/assets/imgs/adventage-img/paiement-securise.png", "./src/assets/imgs/adventage-img/qualite-superieure.png"])
    let [arr_volets, setArr_volets] = useState([, "./src/assets/imgs/categories_img/beards.png", "./src/assets/imgs/categories_img/beverage.png", "./src/assets/imgs/categories_img/biscuits_snacks.png", "./src/assets/imgs/categories_img/breaksfast.png", "./src/assets/imgs/categories_img/frozen.png", "./src/assets/imgs/categories_img/grocery.png", "./src/assets/imgs/categories_img/pregnancy.png", "./src/assets/imgs/categories_img/vegetable.png"])
    const [volets, setVolets] = useState([
        { id: 1, title: "Fruits & Vegetables" , path_img:"./src/assets/imgs/categories_img/beards.png" },
        { id: 2, title: "Baby & Pregnancy" , path_img:"./src/assets/imgs/categories_img/beverage.png" },
        { id: 3, title: "Beverages" , path_img:"./src/assets/imgs/categories_img/biscuits_snacks.png" },
        { id: 4, title: "Meats & Seafood" , path_img:"./src/assets/imgs/categories_img/breaksfast.png" },
        { id: 5, title: "Biscuits & Snacks" , path_img:"./src/assets/imgs/categories_img/frozen.png" },
        { id: 6, title: "Breads & Bakery" , path_img:"./src/assets/imgs/categories_img/grocery.png" },
        { id: 7, title: "Breakfast & Dairy" , path_img:"./src/assets/imgs/categories_img/pregnancy.png" },
        { id: 8, title: "Frozen Foods" , path_img:"./src/assets/imgs/categories_img/vegetable.png" },
        { id: 9, title: "Grocery & Staples" , path_img:"./src/assets/imgs/categories_img/grocery.png" },
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