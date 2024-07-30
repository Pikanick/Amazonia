import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; // This is a performance monitoring tool. Can be used to log performance metrics or send them to an analytics endpoint.
import { StateProvider } from './StateProvider'; // This is a custom hook that allows us to use the React Context API. used to wrap the app and provide a global state.
import * as ServiceWorker from './serviceWorker'; // This is a service worker that is used to cache the app and make it available offline.
import reducer, { initialState } from './reducer'; // This is a reducer function that determines how the state changes in response to actions. It is used to update the state of the app.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // StrictMode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants.
  <React.StrictMode> 
    <StateProvider initialState={initialState} reducer={reducer}>
    <App /> {/* This is the main component that renders the app.*/}
    </StateProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals(); // This function can be used to measure the performance of your app. By default, it does nothing, but you can pass a function to log results or send them to an analytics endpoint.
// ServiceWorker.unregister(); // This function is used to unregister a service worker. A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction.
// Service workers are a key part of Progressive Web Apps (PWAs), providing functionalities like offline support, background sync, and push notifications.