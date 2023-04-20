import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  
  productDetailsReducer,
  productReducer,
  newReviewReducer,
  productsReducer,
 
} from "./reducers/productReducer"
import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
    
  } from "./reducers/userReducer";
  import { cartReducer } from "./reducers/cartReducer";
import { 
  newOrderReducer ,
  myOrdersReducer,
  orderDetailsReducer,
} from "./reducers/orderReducer";
const reducer = combineReducers({
    products:productsReducer,
    product: productReducer,
    productDetails:productDetailsReducer,
    newReview: newReviewReducer,


    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails: orderDetailsReducer,


    
    cart: cartReducer,


    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
 
 
  
 
  
})
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];
const store = createStore(
    
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)),
    );
    
  
  export default store;