import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState  } from "react";
import "@/assets/css/cards/cardarrival.scss"
export default function CardArrival({ item }) {

    function addToFavorite() {
        
    }

    const [volets, setVolets] = useState([
        { id: 1, title: "Fruits & Vegetables", path_img: "./src/assets/imgs/categories_img/beards.png", rates: 4.5, is_organic: true, discount: 25, price: 1.49, old_price: 1.99, stock: 120 },
        { id: 2, title: "Baby & Pregnancy", path_img: "./src/assets/imgs/categories_img/beverage.png", rates: 5, is_organic: true, discount: 10, price: 8.99, old_price: 9.99, stock: 45 },
        { id: 3, title: "Beverages", path_img: "./src/assets/imgs/categories_img/biscuits_snacks.png", rates: 3.5, is_organic: false, discount: 30, price: 2.09, old_price: 2.99, stock: 200 },
        { id: 4, title: "Meats & Seafood", path_img: "./src/assets/imgs/categories_img/breaksfast.png", rates: 4, is_organic: false, discount: 15, price: 12.74, old_price: 14.99, stock: 30 },
        { id: 5, title: "Biscuits & Snacks", path_img: "./src/assets/imgs/categories_img/frozen.png", rates: 3, is_organic: false, discount: 40, price: 1.79, old_price: 2.99, stock: 175 },
        { id: 6, title: "Breads & Bakery", path_img: "./src/assets/imgs/categories_img/grocery.png", rates: 4.5, is_organic: true, discount: 20, price: 2.39, old_price: 2.99, stock: 60 },
        { id: 7, title: "Breakfast & Dairy", path_img: "./src/assets/imgs/categories_img/pregnancy.png", rates: 4, is_organic: true, discount: 35, price: 3.24, old_price: 4.99, stock: 88 },
        { id: 8, title: "Frozen Foods", path_img: "./src/assets/imgs/categories_img/vegetable.png", rates: 3.5, is_organic: false, discount: 50, price: 2.49, old_price: 4.99, stock: 15 },
        { id: 9, title: "Grocery & Staples", path_img: "./src/assets/imgs/categories_img/grocery.png", rates: 4, is_organic: false, discount: 5, price: 5.69, old_price: 5.99, stock: 300 },
    ]);

    return (
        <div className="card card-produit p-2 " >
            <div className='row'>
                <div className="img-produit col-6 ">
                    <div className="like-btn" onClick={addToFavorite}>
                        <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <div className="discount-chip">
                        <span className=" badge rounded-pill bg-danger">
                            99+
                            <span className="visually-hidden">unread messages</span>
                        </span>
                    </div>
                    <span className="ship-organic ">
                        <span className="leaf-icon">🌿</span>
                    </span>
                    <div className="add-to-card">
                        <FontAwesomeIcon style={{ color: '#634C9F', marginRight: "1rem" }} icon={faPlus} /> add</div>
                    <img src={volets[0].path_img} className="card-img-top" alt={item.name} />
                </div>

                <div className='col-6'>
                    <div className="px-2 pt-3">
                        {Array.from({ length: 5 }, (_, i) => {
                            return (
                                (i < item.rating_count ? <FontAwesomeIcon key={i} icon={faStar} className="text-warning" /> : <FontAwesomeIcon key={i} icon={faStar} className="text-secondary" />)
                            )
                        })}
                        <span className="ps-2">{item.rating_count}</span>
                    </div>
                    <div className="title  p-2 ">
                        <h6 className="card-title" style={{ inlineSize: "140px", overflow: "hidden", textWrap: "nowrap" }}>{item.title}</h6>
                    </div>

                    <div className="product-card">
                        <div className='' style={{ display: 'flex', alignItems: 'baseline' }}>
                            <div className="price-new"><span>{item.cost_price} <sub>MAD</sub></span>  </div>
                            <div className="price-old"><span >{item.base_price} <sub>MAD</sub></span> </div>
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
            </div>
            <div className="timer  pt-3 pb-3 d-flex align-items-center justify-space-between gap-2 ">

                {
                    (item.timer) ? (
                        <>
                            <div className='d-flex align-items-center justify-space-between gap-2'>
                                <div className="timer-item">10</div>
                                <div className="timer-item">10</div>
                                <div className="timer-item">10</div>
                                <div>:</div>
                                <div className="timer-item">10</div>
                            </div>
                            <p className=''>Remains until the end of the offer</p>
                        </>
                    ) :
                        <div>
                            <p style={{ lineHeight: '39px' }} className='m-0 w-100   text-center'>Remains until the end of the offer</p>

                        </div>

                }
            </div>

        </div >
    )
}