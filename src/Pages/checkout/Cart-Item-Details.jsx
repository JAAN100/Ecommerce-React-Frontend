import { DeliveryOptions } from "./Delivery-Options";
import { formatMoney } from "../../util/money";
import { useState } from "react";
import api from "../../api";
import dayjs from "dayjs";
export function CartItemDetails({ cartItem, deliveryOption, loadCart, selectDeliveryOption }) {
  const deleteCartItem = async () => {
    await api.delete(`/api/cart-items/${cartItem.productId}`)
    await loadCart();
  }
  const [updated, setUpdate] = useState(false);
  const [quantity, setQuantity] = useState([cartItem.quantity]);
  const updateCartQuantity = async () => {
    if (updated) {
      await api.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: quantity
      })
      await loadCart();
    }
  }
  const checkUpdates = async () => {
    await updateCartQuantity();
    setUpdate(!updated);
  }

  const updateQuantity = (event) => {
    setQuantity(Number(event.target.value));
  }
  const checkKeyPress = (event)=>{
    if(event.key === 'Enter'){
      checkUpdates();
    }else if(event.key === 'Escape'){
      setQuantity(cartItem.quantity);
      setUpdate(!updated);
    }
  }
  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date: {dayjs(selectDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image"
          src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">
            {cartItem.product.name}
          </div>
          <div className="product-price">
            {formatMoney(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity: {
                updated ?
                  (<input className="update-quantity" type="text" value={quantity} onChange={updateQuantity} onKeyDown={checkKeyPress}/>) :
                  (<span className="quantity-label">{quantity}</span>)}
            </span>
            <span className="update-quantity-link link-primary" onClick={checkUpdates}>
              Update
            </span>
            <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
              Delete
            </span>
          </div>
        </div>
        <DeliveryOptions deliveryOption={deliveryOption} cartItem={cartItem} loadCart={loadCart} />
      </div>
    </div>
  );
}