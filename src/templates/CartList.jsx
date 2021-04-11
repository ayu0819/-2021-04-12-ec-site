import React,{useCallback} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getProductsInCart } from '../reducks/users/selectors';
import {CartItem} from '../components/Products';
import styled from 'styled-components';
import {push} from 'connected-react-router';
import {PrimaryButton} from '../components/UIkit';
import image from '../assets/img/cart-img.jpg';

const Items = styled.div`
   padding-top: 1em;
`;

const Button = styled.button`
    margin: 0 auto;
    padding: 1.1em 3em;
    background: #ea352d;
    transition: all ease-out .3s; 
    color: #fff;
    border-radius:2em;
    width:100%;
    max-width: 15em;
    margin-bottom:1em; 
    label{
      font-size: 1.2em;
    }
    :hover{
    padding: 1.1em 3em;
    background: #aa2e28;
    color: #fff;
    transition: all ease-out .3s;
    border-radius:2em;
    label{
      font-size: 1.2em; 
    }
    }
`;

const Image = styled.img`
 width: 100%;
 max-width: 15em;
`;

const Text = styled.p`
 font-weight: bold;
 color: #ea352d;
 padding: 3em 0 2em 0;
`;

const CartList = () => {
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    const productsInCart = getProductsInCart(selector); 

    const goToOder = useCallback(() => {
      dispatch(push('/order/confirm'));
     }, []);

     const goToHome = useCallback(() => {
      dispatch(push('/'));
     }, []);
   

 return(
   <div className="common__item">
      <div className="common__center">
          <h2>ショッピングカート</h2>
        <Items>
{productsInCart.length > 0 ? (
  productsInCart.map(product => <CartItem key={product.cartId} product={product}  /> )
) : (
  <>
   <Text>商品がありません</Text>
  <Image src={image} alt="image"/>
  </>
)}
        </Items>

        <PrimaryButton 
      style={'primary__red'} onClick={() => dispatch(goToOder)} label={'レジへ進む'}
     />


<PrimaryButton 
      style={'primary__red-solid'} onClick={() => dispatch(goToHome)} label={'ホームに戻る'}
     />
  

      </div>
   </div>
 )
}

export default CartList;
