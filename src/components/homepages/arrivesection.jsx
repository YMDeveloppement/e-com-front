import { useEffect, useState } from 'react'
import CardProduct from '@/components/common/cardproduct/cardproduct'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import '@/assets/css/homepage/arrivesection.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ArriveSection({ data_categories }) {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (!data_categories) return;
        setCategories(data_categories.categories)
        setProducts(data_categories.home_categories_products)
    }, [data_categories])

    useEffect(() => {
        (products ? Object.values(products) : []).map((ele, index) => console.log(index))
    })
    
    return (
        <>
            {
                (data_categories.categories ? Object.values(data_categories.categories) : []).map((ele, idx) => {
                    return (
                        
                        <div className="swip-catg-prd mx-auto" key={idx}>
                            
                            <h5 className='title-catg'>{ele.name} : </h5>
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                spaceBetween={10}
                                slidesPerView={'auto'}
                                navigation={true}
                            >
                                {(products ? Object.values(products[ele.slug]) : []).map((item, index) => {
                                    return (
                                        <SwiperSlide key={`${idx}-${index}`} >
                                            <CardProduct className="border-card" key={`${idx}-${index}`} item={item} />
                                        </SwiperSlide>

                                    )
                                }
                                )}

                            </Swiper>

                        </div>
                    )
                })
            }

            
        </>
    )
}