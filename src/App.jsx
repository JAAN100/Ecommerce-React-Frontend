import axios from 'axios';
import api from './api.js';
import HomePage from './Pages/home/Home.jsx';
import CheckoutPage from './Pages/checkout/Checkout-page.jsx';
import Orders from "./Pages/order/Orders.jsx";
import Tracking from './Pages/Tracking.jsx';
import NotFound from './Pages/404Page.jsx';
import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react';

import './App.css';
function App() {
  window.axios = axios
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart((response.data));
  }
  useEffect(() => {
    loadCart();
  }, [])
  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path='checkout' element={<CheckoutPage cart={cart} loadCart={loadCart}/>} />
      <Route path='orders' element={<Orders cart={cart} loadCart={loadCart}/>} />
      <Route path='tracking/:orderId/:productId' element={<Tracking cart={cart} />} />
      <Route path="*" element={<NotFound cart={cart}/>} />
    </Routes>
  )
}

export default App
