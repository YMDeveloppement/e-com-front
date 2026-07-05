import React, { useState, useEffect } from "react";
// ✅ Correct — brand icons live here
import { faCcMastercard, faCcVisa, faPaypal } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faHeart, faBasketShopping, faCircleInfo, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useCheckout } from '@/pages/context/checkoutContext';

const addresses = [
    {
        id: 1,
        label: "HOME ADDRESS",
        name: "Kiara Corkery",
        address: "912 Park Ave, Ketchikan, Alaska 99901, USA",
        phone: "(907) 826-3317",
    },
    {
        id: 2,
        label: "OFFICE ADDRESS",
        name: "Jarrett Rempel",
        address: "2566 Hc 1, Glennallen, Alaska 99588, USA",
        phone: "(907) 225-9273",
    },
];


const cards = [
    {
        id: 1,
        alias: "masterCard",
        type: "MasterCard",
        number: "9873 6548 9871 0123",
        holder: "Ophelia Steuber",
        valid: "32",
        bg: "warning",
        icon: faCcMastercard
    },
    {
        id: 2,
        alias: "cartVisa",
        type: "Visa",
        number: "9873 6548 9871 0123",
        holder: "Bethany Nienow",
        valid: "28",
        bg: "dark",
        icon: faCcVisa
    },
    {
        id: 3,
        alias: "paypal",
        type: "Paypal",
        number: "yassine.mesbahi@paypal.py",
        holder: "Yassine Mes",
        valid: "Yes",
        bg: "primary",
        icon: faPaypal
    },
];

export default function CheckoutPage({ typeDelevery }) {
    const [selectedAddress, setSelectedAddress] = useState(1);
    const [shippingMethod, setShippingMethod] = useState(typeDelevery[0].alias);
    const [cart, setCart] = useState('masterCard');
    const [methodDelevery] = useState(typeDelevery);

    const { cartInfo, setCartInfo, adressDelevery, setAdressDelevery, cartSelected, setCartSelected, setModeDelevery, modeDelevery } = useCheckout();

    useEffect(() => {
        setCartInfo({ 'number': 414748654354, Name: "CIH", code_confirm: 342, date_expired: "2026-03-12" })
    }, [selectedAddress])
    useEffect(() => {
        setAdressDelevery(selectedAddress)
    }, [selectedAddress])

    useEffect(() => {
        setModeDelevery(shippingMethod)
    }, [shippingMethod])

    useEffect(() => {
        setCartSelected(cart)
    }, [cart])

    return (
        <div className="" style={{ background: 'transparent', borderRadius: "20px", boxShadow: "0 4px 30px rgba(60,80,180,0.09)" }}>
            {/* Shipping Information */}
            <div className="card-header-bar-reverse">
                <h5>
                    <FontAwesomeIcon icon={faCircleInfo} className="me-2" />
                    Shipping Information
                </h5>
            </div>
            <div className="py-4 card shadow-sm border-0 mb-4">

                <div className="card-body">
                    <h6 className="fw-bold mb-3">Choose Address</h6>
                    <div className="row g-3">
                        {addresses.map((address) => (
                            <div className="col-md-4" key={address.id}>
                                <div
                                    className={`card h-100 position-relative ${selectedAddress === address.address
                                        ? "border-primary border-2"
                                        : ""
                                        }`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setSelectedAddress(address.address)}
                                >
                                    {selectedAddress === address.id && (
                                        <FontAwesomeIcon className="text-primary position-absolute"
                                            style={{
                                                top: 12,
                                                right: 12,
                                                fontSize: 18,
                                            }} />


                                    )}

                                    <div className="card-body">
                                        <small className="text-secondary fw-bold">
                                            {address.label}
                                        </small>

                                        <h6 className="mt-3 fw-bold">{address.name}</h6>

                                        <p className="text-muted mb-1">{address.address}</p>

                                        <p className="text-muted">Mo. {address.phone}</p>
                                    </div>

                                    <div className="card-footer bg-white">
                                        <button className="btn btn-sm btn-link text-dark text-decoration-none">
                                            <FontAwesomeIcon icon={faList} className="me-1" />
                                            Edit
                                        </button>

                                        <button className="btn btn-sm btn-link text-danger text-decoration-none">
                                            <FontAwesomeIcon icon={faList} className="me-1" />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add Address */}
                        <div className="col-md-4">
                            <div
                                className="card h-100 d-flex justify-content-center align-items-center"
                                style={{
                                    minHeight: "180px",
                                    cursor: "pointer",
                                }}
                            >
                                <div className="text-center">
                                    <FontAwesomeIcon size={28} icon={faList} className="text-primary mb-3" />

                                    <h6 className="text-primary">ADD Address</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Method */}
                    <h6 className="fw-bold mt-4 mb-3">Shipping Method</h6>

                    <div className="row g-3">

                        {
                            methodDelevery.map((method) => {
                                return (<div className="col-md-6" key={method.alias} >
                                    <div
                                        className={`card p-3 position-relative ${method.alias === shippingMethod
                                            ? "border-primary border-2"
                                            : ""
                                            }`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => setShippingMethod(method.alias)}
                                    >
                                        {shippingMethod === method.alias && (
                                            <FontAwesomeIcon icon={faCircleCheck}
                                                className="text-primary position-absolute"
                                                style={{ top: 10, right: 10 }}
                                            />

                                        )}

                                        <div className="d-flex align-items-center">
                                            <div className="bg-light p-3 rounded me-3">
                                                <FontAwesomeIcon icon={faList} />

                                            </div>

                                            <div className="flex-grow-1">
                                                <h5 className="mb-1">{method.name}</h5>
                                                <small className="text-muted">
                                                    {method.description}
                                                </small>
                                            </div>

                                            <h3 className="fw-bold mb-0">${method.cost.toFixed(2)}</h3>
                                        </div>
                                    </div>
                                </div>)

                            })
                        }


                    </div>
                </div>
            </div>

            {/* Payment Information */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 className="fw-bold">Payment Information</h4>

                        <button className="btn btn-info text-white" >
                            <FontAwesomeIcon icon={faList} className="me-1" />
                            Add Card
                        </button>
                    </div>

                    <div className="row g-3">
                        {cards.map((card) => (
                            <div className={`col-md-4 `} key={card.id}>
                                <div
                                    onClick={() => setCart(card.alias)}
                                    className={` text-white bg-${card.bg}  ${cart === card.alias ? "border-cart-selected" : ""}`}
                                    style={{
                                        height: "180px",
                                        borderRadius: "15px",
                                    }}
                                >
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div className="d-flex justify-content-between">
                                            <FontAwesomeIcon icon={card.icon} />
                                            <span className="fw-bold">{card.type}</span>
                                        </div>

                                        <h5 className="fw-bold">{card.number}</h5>

                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <small>Card Holder</small>
                                                <div>{card.holder}</div>
                                            </div>

                                            <div>
                                                <small>Valid</small>
                                                <div>{card.valid}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-end mt-4">
                        <button className="btn btn-info px-5">
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}