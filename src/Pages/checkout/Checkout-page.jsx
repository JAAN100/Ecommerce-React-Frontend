import CheckoutHeader from './CheckoutHeader';
import api from '../../api';
import { useEffect, useState } from 'react';
import { OrderSummary } from './Order-Summary';
import { PaymentSummary } from './Payment-Summary';
import './CheckoutPage.css'
function CheckoutPage({ cart, loadCart }) {
  const [deliveryOption, setDeliveryOption] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    const fetchCartData = async () => {
      let response = await api.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOption(response.data);
    }
    fetchCartData();
  }, []);
  useEffect(() => {
    const fetchCartData = async () => {
      let response = await api.get('/api/payment-summary');
      setPaymentSummary(response.data);
    }
    fetchCartData();
  },[cart])
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />

      <title>Checkout</title>

      <CheckoutHeader cart={cart} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOption={deliveryOption} loadCart={loadCart} />
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;