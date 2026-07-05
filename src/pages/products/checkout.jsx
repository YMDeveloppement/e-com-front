import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CheckoutLside from '@/components/checkout/checkoutLside.jsx';
import CheckoutRside from '@/components/checkout/checkoutRside.jsx';
import '@/assets/css/pages/checkout.scss';
import { CheckoutProvider } from '@/pages/context/checkoutContext';

export default function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const typeDelevery = [
        { alias: 'free', name: 'Standard Delivery', 'description': 'Expected Delivery 3 to 5 Days', cost: 5.99 },
        { alias: 'express', name: 'Express Delivery', 'description': 'Delivery within 24hrs.', cost: 9.99 },
        { alias: 'overnight', name: 'Overnight Delivery', 'description': 'Delivered by the next day', cost: 19.99 }
    ]


    const user = useSelector(state => state.auth.user);
    const { total, subtotal, deliveryCost, selectedItems } = location.state || {};
    const [products, setProducts] = useState(selectedItems || []);
    
    // products selected 

    // users after login 

    // //stepers 
    // get from backend 
    //     - montant total  
    // afficher les produits selected
    // confirm order
    // choose payment method
    // entre card data 
    // with confirmation of mode develivery
    // RETURN ORDER BILL


    return (
        <div className="checkout-page container ">
            {/* <h1>Checkout Page</h1> */}
            <CheckoutProvider>

                <div className="checkout-container row ">
                    <div className=" mt-3 checkout-left col-8" style={{ borderRadius: "20px"}} >
                        <CheckoutLside typeDelevery={typeDelevery} />
                    </div>
                    <div className="checkout-right col-4">
                        <CheckoutRside products={products} deliveryCost={deliveryCost} />
                    </div>

                </div>
            </CheckoutProvider>


        </div>
    )




}