import { formatMoney } from "../../util/money";

import api from "../../api";
import dayjs from "dayjs";
export function DeliveryOptions({deliveryOption , cartItem , loadCart}) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {deliveryOption.map((delivery) => {
        let priceShipping = 'FREE SHIPPING';
        if (delivery.priceCents > 0) {
          priceShipping = `${formatMoney(delivery.priceCents)} - Shipping`;
        }
        const updateDeliveryOption = async()=>{
          await api.put(`/api/cart-items/${cartItem.productId}` ,{
            deliveryOptionId: delivery.id,
          });
          await loadCart();
        }
        return (
          <div key={delivery.id} className="delivery-option" onClick={updateDeliveryOption}>
            <input type="radio" 
              checked={delivery.id === cartItem.deliveryOptionId}
              onChange={()=>{}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.id}`} />
            <div>
              <div className="delivery-option-date">
                {dayjs(delivery.estimatedDeliveryTimeMs).format('dddd , MMMM D')}
              </div>
              <div className="delivery-option-price">
                {priceShipping}
              </div>
            </div>
          </div>);
      })}
    </div>
  );
}