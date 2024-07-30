import React from 'react'
import './Product.css'
import lean from 'C:/Users/pikan/Downloads/Amazon Clone/amazon-clone/src/img/lean_startup.jpg';
import { useStateValue } from './StateProvider';

function Product({id, title, image, price, rating}) {
    const [{basket}, dispatch] = useStateValue();

    // console.log('this is the basket >>>', basket); // for debugging purposes

    const addToBasket = () => {
        // Add item to basket
        // dispatch the item into the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    }

  return  (
    <div className="product">
        <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
            <small>$</small> {/* small font text */}
            <strong>{price}</strong> {/* bolded text */}
        </p>
        <div className="product__rating">
        {Array(rating).fill().map((_, i) => (  
            // Array() method creates an array with the specified number of elements. (rating)
            // fill() method fills the elements of an array with a static value which is 
            // needed to use the map() method. Map() method creates a new array populated with a star at each key in the new array.
            <p key={i}>⭐</p>
          ))}
        </div>
    </div>
    <img src= {image} alt={title} />
    <button onClick={addToBasket}>Add to Basket</button>
  </div>
  );
}

export default Product