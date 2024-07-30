import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal'
import checkoutad from 'C:/Users/pikan/Downloads/Amazon Clone/amazon-clone/src/img/checkoutad.jpg';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';


function Checkout() {
  const [{basket, user}, dispatch] = useStateValue();

  return (
    <div className="checkout">
        <div className="checkout__left">
            <img className="checkout__ad" 
                 src={checkoutad} 
                 alt="ad" />
            <div>
                <h3> Hello, {user?.email}</h3> {/* Optional chaining: user?.email is used to prevent the error "Cannot read property 'email' of null" from being thrown. */}
                <h2 className="checkout__title">Your Shopping Basket</h2>
                {basket.map(item => (
                    <CheckoutProduct 
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
            </div>
        </div>
        <div className="checkout__right">
            <Subtotal />
            <h3>The subtotal will go here</h3>
        </div>
    </div>
    
  )
}

export default Checkout