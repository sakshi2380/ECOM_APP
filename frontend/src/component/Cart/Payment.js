import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";

import { useAlert } from "react-alert";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";


import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";

import { loadUser } from "../../actions/userAction";
import store from "../../store";
import { getLocalStorage } from "../../auth/helper";


const Payment = () => {
  const stripeApiKey = "pk_test_51Mw0YdSC9csYlBSxe39Uhg8TPw9azOIpiHUJFO0RNrEUwZ5E57aZBLEgLKMDVMwwMC33ynLhhITwnBK7EVqC4Eil00N1P1tYgB"
  const loadStripeAPIKey = loadStripe(stripeApiKey)
  
  return(
    <Elements stripe={loadStripeAPIKey}>
      <PaymentForm/>
    </Elements>
  )
}

const PaymentForm = ()=>{
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  
  const payBtn = useRef(null);
  const navigate = useNavigate();
  
//   const token = getLocalStorage('token')
// console.log(token);
  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:4000/api/payment/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

     
      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      }else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          


const token = JSON.parse(localStorage.getItem('token'))
console.log(token);
          dispatch(createOrder(order,token));

          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }

    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message); 
    }
  }
  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    
  }, [dispatch, error, alert]);
  
  return (
    // <Elements stripe={loadStripe(stripeApiKey)}>
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
    // </Elements>
  )
}

export default Payment