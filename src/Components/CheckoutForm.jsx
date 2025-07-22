import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import './checkoutForm.css'
import { use, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";



const CheckoutForm = ({applicationFees}) => {
  const user=use(AuthContext)
  const stripe = useStripe();
  const elements = useElements();
  const [cardError,setCardError]=useState(null)
  const [clientSecret,setClientSecret]=useState('')
  
  useEffect(()=>{
    const getClientSecret= async ()=> {
      console.log(applicationFees);
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`,{amount: applicationFees})
        setClientSecret(data?.clientsecret)
        console.log("Received client secret:", data?.clientsecret);
    }
    getClientSecret()
    
  },[applicationFees])
  console.log('client secret',clientSecret);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log('[error]', error);
      setCardError(error.message)
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setCardError()
    }
    const result= stripe
  .confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
      billing_details: {
        name: user?.displayName,
        email: user?.email
      },
    },
  })
  if(result?.error){
    setCardError(result?.error?.message)
    return
  }
  console.log(result);
  if(result?.paymentIntent?.status=='succeeded'){
    Swal.fire({
                                    title: "Payment done successfully!",
                                    icon: "success",
                                    draggable: true
                    });
  }
  
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {cardError && <p className="text-red-400">{cardError}</p>}
      <button className="bg-blue-400 text-white w-30" type="submit" disabled={!stripe}>
        {`Pay ${applicationFees} taka`}
      </button>
    </form>
  );
};

export default CheckoutForm
