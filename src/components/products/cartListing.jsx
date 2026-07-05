import { useEffect, useState } from "react";
import '@/assets/css/pages/cartPage.scss'
import { useSelector, useDispatch } from "react-redux";
import { asynCartWithDB, asyncClearCart } from "@/plugins/store/thunks/cartThunk"
import { addToCart, removeFromCart, updateQte } from "@/plugins/store/slices/cartSlice"
import axiosIns from '@/plugins/axiosIns.js'
import { useNavigate } from "react-router-dom";

const paymentIcons = [
  { name: "PayPal", color: "#003087", bg: "#f0f4ff" },
  { name: "Stripe", color: "#635bff", bg: "#f5f4ff" },
  { name: "Apple Pay", color: "#1c1c1e", bg: "#f5f5f7" },
  { name: "WebMoney", color: "#0057a8", bg: "#eef4ff" },
];

export default function Cart() {
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [items, setItems] = useState(cartitems);

  const calculateSubtotal = () => {
    const sub = items.reduce((acc, i) => acc + parseFloat(i.price) * i.qty, 0);
    setSubtotal(sub);
  }
  const navigate = useNavigate();

  const checkAuth = async () => {
   let user =null; 
   try {
      user = await axiosIns.get('me');
      if (user) {
        navigate('/checkout' , {state : {total : total, subtotal : subtotal, deliveryCost : deliveryCost, selectedItems : items.filter(i => selected.includes(i.id)) , from :'/cart'}})
      } else {
        navigate('/auth/login') 
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      navigate('/auth/login')
    }
    console.log('user => ', user)
  }
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [selected, setSelected] = useState([]);
  const [delivery, setDelivery] = useState("free");
  const [removing, setRemoving] = useState(null);


  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    setSelected(selected.length === items.length ? [] : items.map((i) => i.id));
  };

  const removeItem = (id) => {
    console.log('delete item', id)
    dispatch(removeFromCart(id));
    setRemoving(id);
    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
      setSelected((prev) => prev.filter((i) => i !== id));
      setRemoving(null);
    }, 350);
  };

  const removeSelected = () => {

    console.log('delete items', selected)
    selected.forEach((id) => {
      setRemoving(id);
      dispatch(removeFromCart(id));

    });
    setTimeout(() => {
      setItems((prev) => prev.filter((i) => !selected.includes(i.id)));
      setSelected([]);
      setRemoving(null);
    }, 350);
  };

  const updateQty = (id, delta) => {
    console.log('update item', id, delta)
    let newItems = items.map((item) => {
      if (item.id === id) {
        dispatch(updateQte({ id: id, qte: Math.max(1, item.qty + delta) }))
        return { ...item, qty: Math.max(1, item.qty + delta) }
      } else {
        return item
      }
    })
    console.log('new items => ', newItems)
    setItems(newItems);
  };



  useEffect(() => {

    const sub = items.reduce((acc, i) => acc + parseFloat(i.price) * i.qty, 0);
    setSubtotal(sub);
    const deliveryCost = setdeliveryCost(delivery);
    setTotal((sub + deliveryCost))

  }, [cartitems, delivery])


  const setdeliveryCost = (delivery) => {
    const cost = delivery === "express" ? 9.99 : delivery === "priority" ? 19.99 : 0;
    console.log('delivery cost => ', cost)
    setDelivery(delivery)

    return cost;
  }

  const deliveryCost = delivery === "express" ? 9.99 : delivery === "priority" ? 19.99 : 0;

  return (
    <div className="cart-page">
      <header className="cart-header">
        <h1>
          Your <span>Cart</span>
        </h1>
        <p className="cart-count">{items.length} items</p>
      </header>

      <div className="cart-layout">
        <section className="cart-list-section">
          <div className="cart-list-header">
            <label className="check-all">
              <input
                type="checkbox"
                checked={selected.length === items.length && items.length > 0}
                onChange={toggleAll}
              />
              <span>Select All</span>
            </label>
            {selected.length > 0 && (
              <button className="remove-selected-btn" onClick={removeSelected}>
                Remove Selected ({selected.length})
              </button>
            )}
            <div className="col-labels">
              <span>Quantity</span>
              <span>Price</span>
              <span>Total</span>
            </div>
          </div>

          <ul className="cart-list">
            {items.map((item) => (
              <li
                key={item.id}
                className={[
                  "cart-item",
                  selected.includes(item.id) ? "selected" : "",
                  removing === item.id ? "removing" : "",
                ].join(" ")}
              >
                <label className="item-check">
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => toggleSelect(item.id)}
                  />
                  <span className="checkmark" />
                </label>

                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-code">{item.code}</p>
                </div>

                <div className="qty-control">
                  <button onClick={() => updateQty(item.id, -1)} aria-label="decrease">−</button>
                  <span>{String(item.qty).padStart(2, "0")}</span>
                  <button onClick={() => updateQty(item.id, +1)} aria-label="increase">+</button>
                </div>

                <p className="item-price">{parseFloat(item.price).toFixed(2)} <small>MAD</small></p>
                <p className="item-total">{(parseFloat(item.price) * item.qty).toFixed(2)} <small>MAD</small></p>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </li>
            ))}

            {items.length === 0 && (
              <li className="cart-empty">
                <span>🛒</span>
                <p>Your cart is empty</p>
              </li>
            )}
          </ul>
        </section>

        {/* Right: Payment Card */}
        <aside className="cart-summary">
          <div className="summary-card">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Subtotal ({items.length} items)</span>
              <strong>{subtotal.toFixed(2)} <small>MAD</small></strong>
            </div>

            <div className="summary-row delivery-row">
              <span>Delivery</span>
              <div className="delivery-select-wrap">
                <select
                  value={delivery}
                  onChange={(e) => setdeliveryCost(e.target.value)}
                >
                  <option value="free">Standard (Free)</option>
                  <option value="express">Express — 9.99 MAD </option>
                  <option value="priority">Priority — 19.99 MAD </option>
                </select>
                <svg className="chevron" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 8l5 5 5-5" strokeWidth="1.5" stroke="currentColor" fill="none" />
                </svg>
              </div>
            </div>

            {deliveryCost > 0 && (
              <div className="summary-row delivery-cost">
                <span>Delivery cost</span>
                <span>{deliveryCost.toFixed(2)} <small>MAD</small></span>
              </div>
            )}

            <div className="summary-divider" />

            <div className="summary-row total-row">
              <span>Total</span>
              <strong>{total.toFixed(2)} <small>MAD</small></strong>
            </div>

            <button className="checkout-btn" disabled={items.length === 0} onClick={checkAuth}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Proceed to Checkout
            </button>

            <div className="discount-row">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M7 7h.01M3 5a2 2 0 012-2h2.586a1 1 0 01.707.293l7.414 7.414a2 2 0 010 2.828l-2.586 2.586a2 2 0 01-2.828 0L3.293 8.707A1 1 0 013 8V5z" />
              </svg>
              <span>Got a discount code? Add in next step</span>
            </div>

            <div className="payment-methods">
              <p className="payment-label">We Accept</p>
              <div className="payment-icons">
                {paymentIcons.map((p) => (
                  <span
                    key={p.name}
                    className="payment-badge"
                    style={{ background: p.bg, color: p.color }}
                    title={p.name}
                  >
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}