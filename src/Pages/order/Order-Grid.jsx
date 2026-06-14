import { OrderDetailGrid } from './Order-Details-Grid.jsx';
export function OrderGrid({orders ,loadCart}){
 return(
  <div className="orders-grid">
          {orders.length > 0 && orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <OrderDetailGrid order={order} loadCart={loadCart}/>
              </div>
            )
          })}
      </div>
 ); 
}