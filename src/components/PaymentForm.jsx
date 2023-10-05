import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useState } from "react";
import styled from "styled-components";
const Form = styled.form`
display: flex;
flex-direction:column;
align-items: center;
gap:20px;
width: 40%;
min-height: 50%;
padding: 20px;
border-radius:10px;
background-color: #fff;
`;
const Button = styled.button`
background-color:#000;
width: 200px;
height: 35px;
font-size:20px;
cursor: pointer;
color:#fff;
`;

const PaymentForm = () => {
  const elements = useElements();
  const stripe = useStripe();
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!stripe || !elements){
      return;
    }
    setIsProcessing(true);

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams:{
        return_url:`${window.location.origin}/success`
      }
    })

    if(error){
      setMessage(error.message)
    }else{
      setIsProcessing(false)
    }

  }
  return (
    <Form onSubmit={handleSubmit}>
    <PaymentElement />
    <Button disabled={isProcessing} type="submit">{isProcessing ? "Processing" : "Pay Now"}</Button>
    </Form>
  )
}

export default PaymentForm
