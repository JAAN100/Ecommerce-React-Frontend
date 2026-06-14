import { Link } from 'react-router'
import Header from '../Components/Header.jsx';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import api from '../api.js';
import './CSS Pages/Tracking.css';
function Tracking({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchAppData = async () => {
      const response = await api.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }
    fetchAppData();
  }, [orderId]);
  if (!order) {
    return;
  }
  const orderProduct = order.products.find((orderProduct) => orderProduct.productId === productId);

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;
  let shippingBarPercent = ((timePassedMs / totalDeliveryTimeMs) * 100);
  if (shippingBarPercent > 100) {
    shippingBarPercent = 100;
  }
  let isPrepaering = false , isShipping = false , isDelivered = false;
  if (shippingBarPercent < 33) {
    isPrepaering = true;
  } else if (shippingBarPercent >= 33 && shippingBarPercent < 100) {
    isShipping = true;
  } else if (shippingBarPercent === 100) {
    isDelivered = true;
  }
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM DD')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPrepaering && "current-status"}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipping && "current-status"}`}>
                Shipped
            </div>
            <div className={`progress-label ${isDelivered && "current-status"}`}>
              {shippingBarPercent >= 100 ? "Delivered on" : "Arriving on"}
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${shippingBarPercent}%` }}></div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Tracking;