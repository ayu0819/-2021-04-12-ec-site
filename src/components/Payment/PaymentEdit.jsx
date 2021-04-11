import React,{useCallback,useState,useEffect, useMemo} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {push} from 'connected-react-router';
import {useDispatch, useSelector} from 'react-redux';
import { registerCard,retrievePaymentMethod } from '../../reducks/payments/operations';
import {PrimaryButton, TextDetail} from '../../components/UIkit';
import { getPaymentMethodId,getCustomerId } from '../../reducks/users/selectors';
import styled from 'styled-components';

const MainText = styled.h3`
 padding: 2em 0;
 font-size: 1.2em;
 font-weight: bold;
`;


const ButtonArea = styled.div`
padding-top: 2em;
`;

const PaymentEdit = () => {
   const dispatch = useDispatch();
   // Stripe定数
   const stripe = useStripe();
   // elements定数は checkOutWrapper.jsxのもつパブリックkey情報をもつコンポ年とタグから情報を持つ
   const elements = useElements();
   const selector = useSelector((state) => state);

   const customerId = getCustomerId(selector);
   const paymentMethodId = getPaymentMethodId(selector);

   const [card,setCard] = useState({});

   const register = useCallback(() => {
      dispatch(registerCard(stripe,elements,customerId))
      console.log('押されました')
   },[stripe,elements,customerId])

   const goBackToMyPage = useCallback(() => {
      dispatch(push('/'))
   },[])

   useEffect(()=> {
     (async() => {
       const cardData = await retrievePaymentMethod(paymentMethodId)
       // 処理が成功していたら
       if (cardData) {
          setCard(cardData)
       }
     })()
   }, [paymentMethodId])

   const cardNumber = useMemo(() => {
     if(card.last4) {
        return "**** **** ****" + card.last4
     } else {
        return "未登録"
     }
   }, [card])

   
 return(
    <div className="common__item">
       <div className="common__center">
          <h2>クレジットカード情報の登録・編集</h2>
          <MainText>現在登録されていカード情報</MainText>
          <TextDetail label={card.brand} value={cardNumber} />
          <hr />
          <MainText>新しく登録・変更する</MainText>
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

<ButtonArea>
<PrimaryButton 
      style={'primary__red'} onClick={register} 
      label={'カードを登録・編集する'}
     />

<PrimaryButton 
      style={'primary__red-solid'} onClick={() => dispatch(goBackToMyPage)} 
      label={'マイページに戻る'}
     />
     </ButtonArea>

    </div>
    </div>
 )
}

export default PaymentEdit;






