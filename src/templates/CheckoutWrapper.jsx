import React from 'react';
import {PaymentEdit} from '../components/Payment';

import {Elements} from '@stripe/react-stripe-js';
// 末に /pure をつける
import {loadStripe} from '@stripe/stripe-js/pure';
import styled from 'styled-components';
  
const Contents = styled.div`
margin: 0 auto;
`;

// loadStripe は 自分のAPIキー
const stripePromise = loadStripe('pk_test_51I0JReEqGiSkmz2ni0xMlool4Ky9GL2DvmFPqVjx49f4rmvXoSYbql4HQ5zryKfnsomEs91gzP535269vzbQ1imI00RIirtdrc');

const CheckoutWrapper = () => {
  
 return(
    <div className="common__item">
    <div className="common__center">
      {/* Make sure to call `loadStripe` outside of a component’s render to avoid
      recreating the `Stripe` object on every render.
      Elements で props に APIキー を渡す (Elements でラップしないと使えない) */}
      <Contents>
    <Elements stripe={stripePromise}>
    <PaymentEdit />
    </Elements>
    </Contents>
    </div>
    </div>
 )
}

export default CheckoutWrapper;







