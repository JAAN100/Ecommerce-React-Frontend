import { Fragment } from 'react';
import { CartItemDetails } from './Cart-Item-Details';
export function OrderSummary({ cart, deliveryOption , loadCart}) {
  return (
    <div className="order-summary">
      {deliveryOption.length > 0 && cart.map((cartItem) => {
        const selectDeliveryOption = deliveryOption.find((deliveryOptions) => {
          return deliveryOptions.id === cartItem.deliveryOptionId;
        })
        return (
          <Fragment key={cartItem.productId}>
            <CartItemDetails  cartItem={cartItem} deliveryOption={deliveryOption} loadCart={loadCart} selectDeliveryOption={selectDeliveryOption}/>
          </Fragment>
        );
      })}
    </div>
  );
}