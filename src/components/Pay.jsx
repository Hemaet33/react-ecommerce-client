import styled from "styled-components"
import { useEffect, useState } from "react";
import axios from 'axios'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js'
import PaymentForm from "./PaymentForm";
import { useParams } from "react-router-dom";


const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100vw;
height: 100vh;
background:linear-gradient(rgba(0,0,0,.7),rgba(0,0,0,.7)), url("https://images.unsplash.com/photo-1470082719408-b2843ab5c9ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1633&q=80") center;
background-size: cover;
`;


//4242424242424242
const Pay = () => {
  const amount = useParams().amount;
  const [clientSecret, setClientSecret] = useState("");

  const STRIPE_KEY = "pk_test_51Nsp56DACU61b2bjn3O3Ya7vMgRZPUZZCcQmqHRS5btGdKLPvOEVMB1aq3tEQDPxom32wcCcAFBAbQAp7nWrLZm400cYNGQpkL";

  const stripePromise = loadStripe(STRIPE_KEY)

  useEffect(()=>{
    const checkRequest = async()=>{
      try {
        const res = await axios.post("https://react-ecommerce-api-bwel.onrender.com/api/checkout/payment",{
        name:"hemayet",
        amount:amount * 100
      })
      setClientSecret(res.data)
      } catch (error) {
        console.log(error);
      }
    }
     checkRequest(); 
  },[amount]);




  return (
    <Container>
    {clientSecret &&
      <Elements stripe={stripePromise} options={{clientSecret}}>
        <PaymentForm />
    </Elements>
    }
     
    </Container>
  )
}

export default Pay
