export const initialState = {
    basket: [],
    user: null
};

// Selector
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price + amount, 0);

// The reducer listens for any changes in the data layer. It listens for actions such as adding or removing items from the basket.

// Calculate the total price of the items in the basket
// reduce method takes the initial state, and applies the provided function to each element in the array.
// amount is an accumulator that adds the price of each item in the basket to the total amount. initial value of amount is 0.
// getBasketTotal(basket) is the fucntion name that takes the basket as an argument, and returns the total price of the items in the basket.
// The basket is an array of objects, each object has a price property.
// The reduce() method reduces the array to a single value. The reduce() method executes a provided function for each value of the array (from left-to-right).
// The reduce() method returns a single value which is the function's accumulated result.

const reducer = (state, action) => {
    console.log(action);

    switch(action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state, // return the current state. This is the state before the action is performed. ... is the spread operator which copies the state into the new object. 
                basket: [...state.basket, action.item] // creates a new array basket = previous basket + item to be added to the basket. This new array is assigned to the basket property.
            };
        case 'REMOVE_FROM_BASKET':
            const index = state.basket.findIndex(  // findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test.
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];  // creates a new array newBasket and copies the state.basket into it. This approach is used to avoid directly modifying the state. akak immutability.
            if (index >= 0) { // if the index is greater than or equal to 0, remove the item from the basket.
                newBasket.splice(index, 1); // splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
            } else {
                console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                )
            }
            return {
                ...state, // Copy the existing state properties using the spread operator
                basket: newBasket // Update the basket with the modified array

                // In JavaScript, when you are constructing an object inside a return statement, 
                // you use the colon (:) to assign values to object properties, not the assignment operator (=). 
                // The assignment operator is used for assigning values to variables, not for setting properties in an object literal.
            }
            case 'EMPTY_BASKET':
                return {
                    ...state, // Copy the existing state properties using the spread operator
                    basket: []  // empty the basket by setting it to an empty array
                }            

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
            
        default:
            return state;
    }
}

export default reducer;