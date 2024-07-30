import React, {createContext, useContext, useReducer} from 'react'  // imports the createContext, useContext, and useReducer hooks from React.

// Prepares the data layer
export const StateContext = createContext(); // creates the StateContext object.  Context provides a way to pass data through the component tree 
// without having to pass props down manually at every level.


// Wrap our app and provide the Data layer
export const StateProvider = ({reducer, initialState, children}) => ( // creates the StateProvider object.
    // uses the useReducer hook to pass the reducer and initialState to the StateContext.Provider object.  
    <StateContext.Provider value={useReducer(reducer, initialState)}> 
        {children}
    </StateContext.Provider>
);

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext); //allows components to access the context value. 
// It uses the useContext hook to consume the StateContext, making it easier to access the state and dispatch function in functional components.

// reducer: A function that determines how the state changes in response to actions.
// initialState: The initial state value of the context
// children: The child components that will have access to the state provided by this context.