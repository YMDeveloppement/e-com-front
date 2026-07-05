import { useState } from 'react'
import CardArrival from '../common/cardproduct/cardarrival'
export default function EditorsPick() {
    const [volets, setVolets] = useState([
        { id: 1, title: "Fruits & Vegetables", path_img: "./src/assets/imgs/categories_img/beards.png", rates: 4.5, is_organic: true, discount: 25, price: 1.49, old_price: 1.99, stock: 120 , timer:'2026-04-12' },
        { id: 2, title: "Baby & Pregnancy", path_img: "./src/assets/imgs/categories_img/beverage.png", rates: 5, is_organic: true, discount: 10, price: 8.99, old_price: 9.99, stock: 45 },
        { id: 3, title: "Beverages", path_img: "./src/assets/imgs/categories_img/biscuits_snacks.png", rates: 3.5, is_organic: false, discount: 30, price: 2.09, old_price: 2.99, stock: 200 , timer:'2026-04-12' },
        { id: 4, title: "Meats & Seafood", path_img: "./src/assets/imgs/categories_img/breaksfast.png", rates: 4, is_organic: false, discount: 15, price: 12.74, old_price: 14.99, stock: 30 },
        { id: 5, title: "Biscuits & Snacks", path_img: "./src/assets/imgs/categories_img/frozen.png", rates: 3, is_organic: false, discount: 40, price: 1.79, old_price: 2.99, stock: 175 },
        { id: 6, title: "Breads & Bakery", path_img: "./src/assets/imgs/categories_img/grocery.png", rates: 4.5, is_organic: true, discount: 20, price: 2.39, old_price: 2.99, stock: 60 },
        { id: 7, title: "Breakfast & Dairy", path_img: "./src/assets/imgs/categories_img/pregnancy.png", rates: 4, is_organic: true, discount: 35, price: 3.24, old_price: 4.99, stock: 88 , timer:'2026-04-12' },
        { id: 8, title: "Frozen Foods", path_img: "./src/assets/imgs/categories_img/vegetable.png", rates: 3.5, is_organic: false, discount: 50, price: 2.49, old_price: 4.99, stock: 15 },
        { id: 9, title: "Grocery & Staples", path_img: "./src/assets/imgs/categories_img/grocery.png", rates: 4, is_organic: false, discount: 5, price: 5.69, old_price: 5.99, stock: 300 , timer:'2026-04-12' },
    ]);

    return (
        <>
            <div className="d-none mt-5 arrive-section">
                <div className="ps-4 sectionTitle d-flex align-items-center justify-content-start gap-4 mb-4">
                    <h4 className='p-0 m-0 '>New Arrivals</h4>
                    <p className='p-0 m-0 mt-1'>Check out our latest products</p>
                </div>
                <div className="row g-1 p-3">
                    {volets.map((item) => {
                        return (
                            <div className="d-flex align-items-center justify-content-center col-12  col-sm-6 col-md-6 col-lg-4" key={item.id}>
                                <CardArrival item={item} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}