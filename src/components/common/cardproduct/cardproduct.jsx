import '@/assets/css/cards/cardproduct.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import { addToCart , updateQte } from '@/plugins/store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
export default function CardProduct({ item }) {
    const dispatch = useDispatch();
    const cart_prd_ids = useSelector((state) => state.cart.cart_prd_ids);

    function addToFavorite() {
        console.log("clicked")
    }

    function addToCard() {
        dispatch(addToCart(item))
    }
    const updateQty = (id, delta) => {
        console.log('cart_prd_ids  ', delta)
        dispatch(updateQte({ id, qte: delta }))
    }
    return (

        <div className="col-6 col-md-4 col-lg-3 card main-card-product" >


            <div className="img-produit ">
                <div className="like-btn" onClick={addToFavorite}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className="discount-chip">
                    <span className=" badge rounded-pill bg-danger">
                        {item.tax_rate}%
                    </span>
                </div>
                {
                    item.is_organic ? <span className="ship-organic ">
                        <span className="leaf-icon">🌿</span>
                        Organic
                    </span> : ''
                }

                {
                    cart_prd_ids[item.id] ? <div className="qty-control add-to-card-qte ">
                        <button onClick={() => updateQty(item.id, Math.max(1, cart_prd_ids[item.id] - 1))} aria-label="decrease">−</button>
                        <span>{cart_prd_ids[item.id] || 0}</span>
                        <button onClick={() => updateQty(item.id, Math.max(1, cart_prd_ids[item.id] + 1))} aria-label="increase">+</button>
                    </div> : <div onClick={addToCard} className="add-to-card">
                        <FontAwesomeIcon style={{ color: 'white' }} icon={faPlus} />
                    </div>
                }

                <img src={item.image} className="card-img-top" alt={item.title} />
            </div>
            <div className="px-2 pt-3">
                {Array.from({ length: 5 }, (_, i) => {
                    return (
                        (i < item.rating_count ? <FontAwesomeIcon key={i} icon={faStar} className="text-warning" /> : <FontAwesomeIcon key={i} icon={faStar} className="text-secondary" />)
                    )
                })}
                <span className="ps-2">{item.rating_count}</span>
            </div>
            <div className="title  p-2 ">
                <h6 className="card-title">{item.name}</h6>
            </div>


            <div className="product-card">
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    <div className="price-sale"><span>{item.cost_price}</span> <span>MAD</span> </div>
                    <div className="price-original"><span >{item.base_price}</span> <span>MAD</span></div>
                </div>

                <hr className="dropdown-divider" />

                <p className="stock-warning">This product is about to run out</p>

                <div className="stock-bar-track">
                    <div className="stock-bar-fill"></div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="available-label">available only:</span>
                    <span className="available-count">{item.sold_count}</span>
                </div>
            </div>

        </div>
    )
}