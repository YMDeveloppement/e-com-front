// context/CartContext.jsx
import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const [cartSelected, setCartSelected] = useState(null);
  const [productsSelected, setProductsSelected] = useState();
  const [adressDelevery, setAdressDelevery] = useState();
  const [modeDelevery, setModeDelevery] = useState();
  const [cartInfo, setCartInfo] = useState();
    
  return (
    <CheckoutContext.Provider value={{  cartInfo , setCartInfo, setModeDelevery, modeDelevery  , cartSelected, setCartSelected, adressDelevery, setAdressDelevery, productsSelected, setProductsSelected }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export const useCheckout = () => useContext(CheckoutContext);