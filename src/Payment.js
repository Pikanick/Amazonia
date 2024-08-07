import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const navigate = useNavigate(); 
    //  Hooks provide a way to use state and other React features without writing a class. 
    // They were introduced in React 16.8 to provide a more functional and streamlined approach 
    // to managing state, side effects, context, and more in functional components.

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);  
    const [disabled, setDisabled] = useState(true);  
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {  
        // useEffect is a hook that lets you perform side effects in function components. 
        // It will run with the payment component loads and whenever the basket changes, since its in the dependency [].
        // generate the special stripe secret which allows us to charge a customer
        // new secret is made whenever the basket changes

        const getClientSecret = async () => {  // The async keyword indicates that this function contains 
            // asynchronous operations and will return a Promise.
            // fetch is a function that is used to make HTTP requests in JavaScript.
            // The URL /payments/create?total=${getBasketTotal(basket) * 100} is constructed dynamically.
            try{
            const response = await axios.post(
                // The await keyword pauses the execution of the getClientSecret function until the fetch 
                // promise resolves, which means it waits for the server to respond.
                // method: 'post',  
                // sending data to the server to create or update a resource.
                // url:
                 `/payments/create?total=${getBasketTotal(basket) * 100}`  
                // The total is calculated by multiplying the total value of the basket by 100 to convert it to cents.
                // ? means query parameter in the URL. Notice th backticks `` for string interpolation in JS.
            );
            
            // fetch(`/payments/create?total=${getBasketTotal(basket) * 100}`, {
                // The await keyword pauses the execution of the getClientSecret function until the fetch 
                // promise resolves, which means it waits for the server to respond.
                // method: 'POST',  // sending data to the server to create or update a resource.
            // });
            // const data = await response.json(); 
            // The await keyword pauses the execution of the getClientSecret function until the response.json()
            // The response object represents the response from the server to the fetch request.
            // The await response.json() statement converts the JSON-formatted response into a JavaScript object.

            setClientSecret(response.data.clientSecret);
            console.log('The client secret is: ', response.data.clientSecret);
            } catch (error) {
                console.error("Error fetching client secret:", error);
            }
        };

        getClientSecret();
    }, [basket]);

    console.log('The secret is: ', clientSecret);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user?.email,
                },
            }
        }).then(({paymentIntent}) => {
            // paymentIntent = payment confirmation

            db.collection('users')  // access the users collection in the database
                .doc(user?.uid)  // get the user document with the user id
                .collection('orders')  // access the orders collection in the user document
                .doc(paymentIntent.id)  // get the order document with the paymentIntent id
                .set({  // set the order document with the following properties
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                });
            

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            });
            
            navigate('/orders', { replace: true });
             // replace the current URL with the new one so the user can't go back to the payment page
        });
    };   

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty); // if the event is empty, disable the button
        setError(event.error ? event.error.message : "");  // if there is an error, show the error messagem, otherwise show nothing
    }



  return (
    <div className='payment'> 
        <div className='payment__container'>
            <h1>
                Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
            </h1>

            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment__address'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Los Angeles, CA</p>
                </div>
            </div>
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Review items and delivery</h3>
                </div>
                <div className='payment__items'>
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
            <div className='payment__section'>
                <div className='payment__title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment__details'>
                    {/* Stripe magic will go */}
                    
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />  {/*CardElement is a pre-built component from Stripe that gives us a nice looking input field to enter the card details */}
                        <div className='payment__priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <>
                                        <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                        {/* if there is an error, show the error message:  */}
                        {error && <div>{error}</div>}   
                        
                    </form>


                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment