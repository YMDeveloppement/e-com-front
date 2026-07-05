import axiosIns from '@/plugins/axiosIns.js'
import axios from 'axios'
import React, { use, useState, useEffect } from 'react'
import Categories from '@/components/common/categories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import { asynCartWithDB } from '@/plugins/store/thunks/cartThunk.js'
export default function MainSection() {
    const dispatch = useDispatch()
    let [arr_products, setArr_products] = useState([])
    let [img_products, setImg_products] = useState(["/src/assets/imgs/img_product/pro1.jpg", "/src/assets/imgs/img_product/pro2.jpg", "/src/assets/imgs/img_product/pro3.jpg"])

    useEffect(() => {
        axios.get('https://api.escuelajs.co/api/v1/products')
            .then(res => {
                setArr_products(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    function getMe() {
        // dispatch(asynCartWithDB())
        axiosIns.get('/me').then((res) => {
        })

    }

    return (
        <div className="px-4 ">
            <div className="row align-items-start">
                <div className="col-md-3 col-lg-3  p-0 mb-1">
                    <Categories />
                </div>
                <div className="section-slider col-md-9 col-lg-9  p-0">
                    
                    <div className='mainslider m-3'>
                        <div className="mainTitle">
                            <h1 className=''>Welcome to E-ShopStore </h1>
                            <h6 className='second-title'><em>Fresh and Organic Products for Your Healthy Lifestyle</em></h6>
                            <button type="button" onClick={getMe} className=" btn-mainsection btn btn-primary">Shop Now <FontAwesomeIcon icon={faCartArrowDown} /></button>

                        </div>
                        <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">

                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" ></button>
                                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1" className="active"></button>
                                <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
                            </div>
                            <div className="carousel-inner">
                                {img_products.slice(0, 3).map((item, index) => {
                                    return (
                                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                            <img src={item} className="d-block w-100" alt={`img${index + 1}`} />
                                        </div>
                                    )
                                })}
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon"></span>
                            </button>

                            <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
                                <span className="carousel-control-next-icon"></span>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}