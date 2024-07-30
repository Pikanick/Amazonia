// import logo from './logo.svg';
import React, {useEffect} from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';


function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...
  // }, [])
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser);

      if(authUser) {
        // the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',  // if the user is logged in, set the user to the authUser that is passed in. this will keep the user logged in even if the page is refreshed.
          user: authUser
        })

      } else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })
  }, [])

  return (
    // BEM: Block Element Modifier
    <Router>
      <div className="app">
      <ConditionalHeader />
        <Routes>
          <Route path="/checkout" element={<Checkout />}>
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
          {/* This is the default route */}
          <Route path="/" element={<Home />} >
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

function ConditionalHeader() {
  const location= useLocation();

  if (location.pathname === "/login") {
    return null;
  } else {
    return <Header />;
  }
}

export default App;
