import { useState, useEffect } from "react";
import {
    faTag,
    faTruck,
    faReceipt,
    faLeaf,
    faGift,
    faShoppingCart,
    faArrowLeft,
    faCheck,
    faClock,
    faToggleOn,
    faToggleOff,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCheckout } from '@/pages/context/checkoutContext';
import axiosIns from '@/plugins/axiosIns'
import AlertCompo from "@/components/common/alerts/alterComponent";
import { Link, NavLink } from 'react-router-dom';

const DISCOUNT_CODE = "STEEX30";
const TAX_RATE = 0.18;

export default function CheckoutOrderSummary({ products, deliveryCost }) {

    const [openModel, setOpenModel] = useState(false);
    const [modelSuccess, setModelSuccess] = useState({
        type: "success",
        title: "Success!",
        message: "You're all set! Your account is ready.",
        buttonText: "Click me to be closed",
        onClick: () => console.log('succsss')
    });

    const [ecoFriendly, setEcoFriendly] = useState(true);
    const [carePackage, setCarePackage] = useState(false);
    const [timer] = useState("5:00");
    const [DISCOUNT_RATE] = useState(deliveryCost ? parseFloat(deliveryCost) : 0);
    const [SHIPPING] = useState(deliveryCost ? parseFloat(deliveryCost) : 0);
    const subtotal = products.reduce((sum, p) => sum + (p.price * p.qty), 0);
    const [discount] = useState(0);
    const extras = (ecoFriendly ? 25 : 0) + (carePackage ? 10 : 0);
    const taxBase = 0;
    const tax = 0;

    const total = +(subtotal - discount + SHIPPING + tax + extras).toFixed(2);
    const { cartInfo, setCartInfo, productsSelected, setProductsSelected, adressDelevery, setAdressDelevery, cartSelected, setCartSelected, setModeDelevery, modeDelevery } = useCheckout();

    useEffect(() => {
        setProductsSelected(products);
    }, [products])

    const handleConfirmOrder = async () => {

        let data = {
            'products': productsSelected,
            'adresse': adressDelevery,
            'mode_payement': cartSelected,
            'cart_data': cartInfo,
            'mode_delevery': modeDelevery,
        }

        try {
            let res = await axiosIns.post('/valide_payement', data)
            console.log("resreseres", res)
            setModelSuccess({
                type: "success",
                title: "Success!",
                message: "You're all set! Your account is ready.",
                buttonText: "Click me to be closed",
                onClick: () => console.log('succsss')
            })
            

        } catch ({response}) {
            console.log('error' , response)
            setModelSuccess({
                type: "error",
                title: "Error !",
                message: response.data.message ? response.data.message : "Error at Action ! Your should retry",
                buttonText: "Click me to be closed",
                onClick: () => setOpenModel(false)
            })
        } finally{  
            
            setOpenModel(true)
            setTimeout(() => {
                setOpenModel(false)
            }, 2500)
        }


    }


    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');

        * { box-sizing: border-box; }

        body, .checkout-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
        //   background: #f0f4ff;
          min-height: 100vh;
        }

        .checkout-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 30px rgba(60,80,180,0.09);
          overflow: hidden;
        }

        .card-header-bar {
    background: linear-gradient(135deg,
            #6366f1,
            #8b5cf6);          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-header-bar h5 {
          color: #fff;
          font-weight: 800;
          font-size: 1.18rem;
          margin: 0;
          letter-spacing: .01em;
        }

        .timer-badge {
          background: rgba(255,255,255,0.18);
          border: 1.5px solid rgba(255,255,255,0.4);
          color: #fff;
          border-radius: 30px;
          padding: 4px 14px;
          font-size: .82rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          backdrop-filter: blur(6px);
        }

        .timer-dot {
          width: 7px;
          height: 7px;
          background: #4eff91;
          border-radius: 50%;
          animation: pulse-dot 1.2s infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: .5; transform: scale(.7); }
        }

        .table-head-row th {
          background: #f7f9ff;
          color: #8492b4;
          font-size: .75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .07em;
          padding: 10px 16px;
          border-bottom: 1.5px solid #e8edf7;
        }

        .product-row td {
          padding: 14px 16px;
          vertical-align: middle;
          border-bottom: 1px solid #f0f4ff;
        }

        .product-row:last-child td { border-bottom: none; }

        .product-img {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          object-fit: cover;
          border: 2px solid #e8edf7;
          box-shadow: 0 2px 8px rgba(60,80,180,0.08);
        }

        .product-name {
          font-weight: 700;
          color: #1a2340;
          font-size: .93rem;
          line-height: 1.3;
        }

        .product-meta {
          font-size: .78rem;
          color: #8492b4;
          font-weight: 500;
          margin-top: 2px;
        }

        .product-price {
          font-weight: 800;
          color: #1a2340;
          font-size: .97rem;
          white-space: nowrap;
        }

        .divider { border-color: #e8edf7; margin: 0; }

        .summary-section {
          padding: 18px 24px 8px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 7px 0;
          font-size: .9rem;
        }

        .summary-row .label {
          color: #5a6a8a;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .summary-row .label .icon {
          color: #a0aec8;
          font-size: .8rem;
        }

        .summary-row .value { font-weight: 700; color: #1a2340; }
        .summary-row .discount { color: #e53e6a; font-weight: 700; }

        .discount-badge {
          background: #fff0f4;
          color: #e53e6a;
          border: 1px solid #fcd0da;
          border-radius: 6px;
          font-size: .7rem;
          font-weight: 700;
          padding: 2px 8px;
          margin-left: 6px;
          letter-spacing: .04em;
        }

        .total-row {
          border-top: 2px dashed #d4daf0;
          margin-top: 8px;
          padding-top: 14px;
        }

        .total-row .label {
          font-size: 1rem;
          font-weight: 800;
          color: #1a2340;
        }

        .total-row .value {
          font-size: 1.25rem;
          font-weight: 800;
          color: #1a2980;
        }

        .services-section {
          padding: 4px 24px 20px;
        }

        .services-title {
          font-weight: 800;
          color: #1a2340;
          font-size: .95rem;
          padding: 10px 0 12px;
          border-top: 1.5px solid #e8edf7;
          margin-top: 4px;
        }

        .service-card {
          border: 1.5px solid #e8edf7;
          border-radius: 14px;
          padding: 14px 16px;
          margin-bottom: 10px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          transition: border-color .2s, box-shadow .2s;
        }

        .service-card.active {
          border-color: #26d0ce;
          box-shadow: 0 0 0 3px rgba(38,208,206,0.1);
          background: #f6fffe;
        }

        .service-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .service-icon-wrap.eco { background: #e6fff5; color: #0ebd7d; }
        .service-icon-wrap.care { background: #fff3e6; color: #f78c2e; }

        .service-name {
          font-weight: 700;
          color: #1a2340;
          font-size: .9rem;
          line-height: 1.2;
        }

        .service-desc {
          font-size: .77rem;
          color: #8492b4;
          margin-top: 3px;
          line-height: 1.5;
        }

        .service-price {
          font-weight: 800;
          color: #1a2340;
          font-size: .92rem;
          white-space: nowrap;
          margin-right: 10px;
        }

        .toggle-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          font-size: 1.7rem;
          line-height: 1;
          transition: opacity .15s;
        }

        .toggle-btn:hover { opacity: .8; }
        .toggle-on { color: #26d0ce; }
        .toggle-off { color: #c8d0e0; }

        .footer-btns {
          padding: 8px 24px 24px;
          display: flex;
          gap: 10px;
        }

        .btn-confirm {
          flex: 1;
    background: linear-gradient(135deg,
            #6366f1,
            #8b5cf6);          color: #fff;
          font-weight: 800;
          font-size: .93rem;
          border: none;
          border-radius: 12px;
          padding: 13px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 18px rgba(26,41,128,0.18);
          transition: transform .15s, box-shadow .15s;
          cursor: pointer;
        }

        .btn-confirm:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(26,41,128,0.28);
        }

        .btn-continue {
          flex: 1;
          background: #f0f4ff;
          color: #1a2980;
          font-weight: 800;
          font-size: .93rem;
          border: 1.5px solid #d4daf0;
          border-radius: 12px;
          padding: 13px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background .15s, border-color .15s;
          cursor: pointer;
        }

        .btn-continue:hover {
          background: #e4eaff;
          border-color: #b0bcdf;
        }
      `}</style>

            <div
                className="checkout-root d-flex align-items-start justify-content-center p-3"
                style={{ minHeight: "100vh", minWidth: "440px" }}
            >
                <div>
                    <AlertCompo modalInfo={modelSuccess} openIt={openModel} />
                </div>

                <div className="checkout-card w-100" style={{ maxWidth: 460 }}>

                    {/* Header */}
                    <div className="card-header-bar">
                        <h5>
                            <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                            Order Summary
                        </h5>   
                        <div className="timer-badge">
                            <div className="timer-dot" />
                            <FontAwesomeIcon icon={faClock} />
                            Valid Time: {timer}
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="table-responsive">
                        <table className="table mb-0">
                            <thead>
                                <tr className="table-head-row">
                                    <th>Product</th>
                                    <th>Product Info</th>
                                    <th className="text-end">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.id} className="product-row">
                                        <td style={{ width: 72 }}>
                                            <img src={p.image} alt={p.name} className="product-img" />
                                        </td>
                                        <td>
                                            <div className="product-name">{p.name}</div>
                                            <div className="product-meta">
                                                ${parseFloat(p.price).toFixed(2)} × 0{p.qty}
                                            </div>
                                        </td>
                                        <td className="text-end">
                                            <span className="product-price">
                                                ${(parseFloat(p.price) * p.qty).toFixed(2)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <hr className="divider" />

                    {/* Price Summary */}
                    <div className="summary-section">
                        <div className="summary-row">
                            <span className="label">
                                <FontAwesomeIcon icon={faReceipt} className="icon" />
                                Sub Total
                            </span>
                            <span className="value">${subtotal.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span className="label">
                                <FontAwesomeIcon icon={faTag} className="icon" />
                                Discount
                                <span className="discount-badge">{DISCOUNT_CODE}</span>
                            </span>
                            <span className="discount">- ${discount.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span className="label">
                                <FontAwesomeIcon icon={faTruck} className="icon" />
                                Shipping Charge
                            </span>
                            <span className="value">${SHIPPING.toFixed(2)}</span>
                        </div>

                        <div className="summary-row">
                            <span className="label">
                                <FontAwesomeIcon icon={faReceipt} className="icon" />
                                Estimated Tax (0%)
                            </span>
                            <span className="value">${tax.toFixed(2)}</span>
                        </div>

                        <div className="summary-row total-row">
                            <span className="label" style={{ fontWeight: 800, color: "#1a2340" }}>
                                Total (USD)
                            </span>
                            <span className="value" style={{ color: "#1a2980", fontSize: "1.25rem" }}>
                                ${total.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Additional Services */}
                    <div className="services-section">
                        <div className="services-title">Additional Service</div>

                        {/* Eco Friendly */}
                        <div className={`service-card ${ecoFriendly ? "active" : ""}`}>
                            <div className="service-icon-wrap eco">
                                <FontAwesomeIcon icon={faLeaf} />
                            </div>
                            <div className="flex-grow-1">
                                <div className="service-name">Environment Friendly</div>
                                <div className="service-desc">
                                    The primary goal of eco-warriors is creating a better world
                                    for future generations.
                                </div>
                            </div>
                            <div className="d-flex align-items-center flex-shrink-0">
                                <span className="service-price">$25</span>
                                <button
                                    className="toggle-btn"
                                    onClick={() => setEcoFriendly((v) => !v)}
                                    aria-label="Toggle eco-friendly"
                                >
                                    <FontAwesomeIcon
                                        icon={ecoFriendly ? faToggleOn : faToggleOff}
                                        className={ecoFriendly ? "toggle-on" : "toggle-off"}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Care Package */}
                        <div className={`service-card ${carePackage ? "active" : ""}`}>
                            <div className="service-icon-wrap care">
                                <FontAwesomeIcon icon={faGift} />
                            </div>
                            <div className="flex-grow-1">
                                <div className="service-name">Care + Package</div>
                                <div className="service-desc">
                                    Care packages are sent to acknowledge life transitions, from
                                    joyous occasions, such as engagements.
                                </div>
                            </div>
                            <div className="d-flex align-items-center flex-shrink-0">
                                <span className="service-price">$10</span>
                                <button
                                    className="toggle-btn"
                                    onClick={() => setCarePackage((v) => !v)}
                                    aria-label="Toggle care package"
                                >
                                    <FontAwesomeIcon
                                        icon={carePackage ? faToggleOn : faToggleOff}
                                        className={carePackage ? "toggle-on" : "toggle-off"}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="footer-btns">
                        <button className="btn-confirm" onClick={handleConfirmOrder}>
                            <FontAwesomeIcon icon={faCheck} />
                            Confirm Order
                        </button>
                        <Link to="/cart">
                            <button className="btn-continue">
                                <FontAwesomeIcon icon={faArrowLeft} />
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}