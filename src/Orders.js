import React, {useEffect, useState} from 'react'
import './Orders.css'
import { db } from './firebase';
import { useStateValue } from './StateProvider';
import Order from './Order';

function Orders() {
    const [orders, setOrders] = useState([]); 
    const [{basket, user}, dispatch] = useStateValue();


    useEffect(() => {
        // useEffect is a hook that lets you perform side effects in function components. 
        // It will run when the orders component loads and whenever the orders change, since its in the dependency [].
        
        if(user) {
            db.collection('users')
            .doc(user?.uid)
            .collection('orders') // access the orders collection in the user document, as a document in the users collection.
            .orderBy('created', 'desc')  // most recent orders will be displayed first.
            .onSnapshot(snapshot => { // onSnapshot is a listener that listens for changes to the database in real time.
                setOrders(snapshot.docs.map(doc => ({  // for each document in the snapshot, set the orders to the document id and data.
                    id: doc.id,
                    data: doc.data()
                })))
            })
        } else {
            setOrders([])
        }
            
    }, [user])
    
  return (
    <div className='orders'>
        <h1>Your Orders</h1>
        {orders.map(order => (
                <Order order={order} />
        ))}

    </div>
  )
}

export default Orders