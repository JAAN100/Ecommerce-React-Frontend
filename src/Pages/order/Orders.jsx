import Header from '../../Components/Header.jsx';
import api from '../../api.js';
import { useEffect, useState } from 'react';
import { OrderGrid } from './Order-Grid.jsx';
import '../CSS Pages/Orders.css'
function Orders({ cart , loadCart}) {
  const [orders, setOrders] = useState([]);
  const getOrderDetails = async() => {
      const response = await api.get('/api/orders?expand=products');
      setOrders(response.data);
    }
  useEffect(() => {
    getOrderDetails();
  }, [])
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <title>Orders</title>
      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrderGrid orders={orders} loadCart={loadCart}/>
      </div>
    </>
  );
}
export default Orders;