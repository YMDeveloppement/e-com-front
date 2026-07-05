import { } from 'react';
import { useEffect, useState } from "react";
import '@/assets/css/filterproducts.scss'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
function Stars({ count }) {
    return (
        <span className="stars">
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className={`star ${i <= count ? "filled" : "empty"}`}>★</span>
            ))}
        </span>
    );
}

export default function FilterProducts({ filterData, onRefresh }) {
    const [MIN, setMIN] = useState(1)
    const [MAX, setMAX] = useState(2000)
    const initBrands = ["Universal", "Usams", "Voxlink", "WIRELESS CHARGER", "WSKEN", "Anker", "Belkin", "Ugreen"]
    const [brands, setBrands] = useState(initBrands);
    const [discounts, setDiscounts] = useState([50, 40, 30, 20, 10]);

    const [relateCategories, setRelateCategories] = useState(14);
    const [priceMin, setPriceMin] = useState(MIN);
    const [priceMax, setPriceMax] = useState(MAX);
    const [discount, setDiscount] = useState(null);
    const [brandSearch, setBrandSearch] = useState("");
    const [rating, setRating] = useState(null);

    const fnLeft = (priceMin, MAX, MIN) => ((priceMin - MIN) / (MAX - MIN)) * 100;
    const fnRight = (priceMax, MAX, MIN) => ((priceMax - MIN) / (MAX - MIN)) * 100;

    const [fillLeft, setFillLeft] = useState(fnLeft(priceMin, MAX, MIN));
    const [fillRight, setFillRight] = useState(fnRight(priceMax, MAX, MIN));
    console.log([
        fillLeft,
        fillRight
    ])

    // const filteredBrands = []
    const filteredBrands = brands !== undefined && brands !== null ? brands.filter(b =>
        b !== undefined && b !== null ? b.toLowerCase().includes(brandSearch.toLowerCase()) : ""
    ) : "";

    const toggleBrand = (b) =>
        setBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);


    useEffect(() => {
        let filter_max = [null, undefined].includes(filterData.maxPrice) ? MAX : parseInt(filterData.maxPrice)
        let filter_min = [null, undefined].includes(filterData.minPrice) ? MIN : parseInt(filterData.minPrice)
        let filter_dicount = discount == null || [null, undefined].includes(filterData.discount) ? 10 : parseInt(filterData.discount)
        let filter_brandSearch = [null, undefined].includes(filterData.brandSearch) ? "" : filterData.brandSearch
        let filter_rating = [null, undefined].includes(filterData.rating) ? 2 : filterData.rating
        let filter_brands = [null, undefined].includes(filterData.brands) ? initBrands : Object.values(filterData.brands)

        let _max = MAX < filter_max ? filter_max : MAX
        let _min = MIN < filter_min ? filter_min : MIN

        setMAX(_max)
        setMIN(_min)

        setFillLeft(fnLeft(filter_max, _max, _min))
        setFillRight(fnRight(filter_min, _max, _min))
        console.log([
            fnLeft(filter_max, _max, _min),
            fnRight(filter_min, _max, _min)
        ])
        console.log(filterData)

        console.log(
            (filter_min),
            (filter_max),
            filter_dicount,
            filter_rating,
            filter_brandSearch,
            filter_brands
        )
        setPriceMin((filter_min));
        setPriceMax((filter_max));
        setDiscount(filter_dicount);
        setBrandSearch(filter_brandSearch);
        setRating(filter_rating);
        setBrands(filter_brands);




    }, [filterData])



    // useEffect(() => {
    //     localStorage.setItem('filter', JSON.stringify({
    //         'priceMin': priceMin,
    //         'priceMax': priceMax,
    //         'discount': discount,
    //         'brandSearch': brandSearch,
    //         'rating': rating,
    //     }))
    // })

    const filterProduct = () => {
        let ftr = {

            'min_price': priceMin,
            'max_price': priceMax,
            'discount': discount,
            'brand': brandSearch,
            'rate': rating,
        }
        onRefresh(ftr)
        localStorage.setItem('filter', JSON.stringify(ftr))

    }

    return (
        <div className="filter-cart">
            <div className="filter-panel">
                <div className='d-flex align-items-center justify-content-between'>
                    <h5>Apply Filter</h5>
                    <button className="small-btn-search" onClick={filterProduct}>
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                </div>
                <div className='relate_categories'>
                    <h6>Categorie</h6>
                    <div>
                        <ul >
                            {filterData.subCategory?.map((cat) => (
                                <li key={cat.id}><Link to={`/category/${cat.id}`} >{cat.name}</Link> </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* PRICE */}
                <div className="section">
                    <div className="price-header">
                        <span>Prix (DHS)</span>
                        <span className="price-ok">OK</span>
                    </div>

                    <div className="range-wrap">
                        <div className="range-track">
                            {/* <div className="range-fill" style={{ left: `${fillLeft}%`, right: `${100 - fillRight}%` }} /> */}
                            <div className="range-fill" style={{ left: `${fillLeft}%`, right: `${100 - fillRight}%` }} />
                        </div>
                        <input type="range" min={MIN} max={MAX < priceMax ? priceMax : MAX}
                            value={priceMin}
                            onChange={e => { const v = +e.target.value; if (v < priceMin) setPriceMin(v); }} />
                        <input type="range" min={MIN} max={MAX < priceMax ? priceMax : MAX}
                            value={priceMax}
                            onChange={e => { const v = +e.target.value; if (v > priceMax) setPriceMax(v); }} />
                    </div>

                    <div className="price-inputs">
                        <input type="number" value={priceMin}
                            onChange={e => { const v = +e.target.value; if (v >= MIN && v < priceMax) setPriceMin(v); }} />
                        <span className="sep">-</span>
                        <input type="number" value={priceMax}
                            onChange={e => { const v = +e.target.value; if (v <= MAX && v > priceMin) setPriceMax(v); }} />
                    </div>
                </div>

                <hr className="divider" />

                {/* REMISE */}
                <div className="section">
                    <div className="section-title">Remise (%)</div>
                    <ul className="radio-list">
                        {discounts.map(d => (
                            <li key={d} className="radio-item" onClick={() => setDiscount(discount === d ? null : d)}>
                                <input type="radio" readOnly checked={discount === d} />
                                <span className="custom-radio" />
                                <span className="label-text">{d}% et plus</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <hr className="divider" />

                {/* MARQUE */}
                <div className="section">
                    <div className="section-title">Marque</div>
                    <div className="search-wrap">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Chercher"
                            value={brandSearch}
                            onChange={e => setBrandSearch(e.target.value)}
                        />
                    </div>
                    <div className="brand-scroll">
                        <ul className="check-list">
                            {filteredBrands.map(b => (
                                <li key={b} className="check-item" onClick={() => toggleBrand(b)}>
                                    <input type="checkbox" readOnly checked={brands.includes(b)} />
                                    <span className="custom-check">
                                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                            <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="label-text">{b}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="divider" />

                {/* ÉVALUATION */}
                <div className="section">
                    <div className="section-title">Évaluation clients</div>
                    <ul className="radio-list">
                        {[5, 4, 3, 2, 1].map(r => (
                            <li key={r} className="radio-item" onClick={() => setRating(rating === r ? null : r)}>
                                <input type="radio" readOnly checked={rating === r} />
                                <span className="custom-radio" />
                                <Stars count={r} />
                                <span className="et-plus">et plus</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='d-flex align-items-center justify-content-center'>
                    <button className="small-btn-search" onClick={filterProduct} >
                        <FontAwesomeIcon icon={faFilter} />
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>
    )

}