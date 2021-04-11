import React,{useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CartItem} from "../components/Products";
import styled from 'styled-components';
import {TextDetail,PrimaryButton} from '../components/UIkit';
import{getProductsInCart} from '../reducks//users/selectors';
import {orderProduct} from '../reducks/products/operations';


const media = {
  sp: '@media(max-width: 650px)'
}

const Flex = styled.div`
    display:flex;
    justify-content:center;
    flex-wrap : wrap;
    hr {
      margin: 0.5em 0;
    }
`;

const CartDetail = styled.div`
    margin: 0 2.5em;
    text-align:left;
    background-color: #f5f5f5;
    border-radius:0.5em;
    padding:2em 2.5em;
    display: inline-block;
    ${media.sp} {
    margin: 2em 0 0 0;
    width: 100%;
   }

`;


const OrderConfirm = () => {
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    // selector から情報を持ってくる
    const productsInCart = getProductsInCart(selector);

    // ----------------------    
    // 商品の合計金額を求める関数
    //  useMemo は計算・再計算時 に使う 
    // .reduceで使う sum(初期値0) は前回の計算結果を受け取る
    // ----------------------
  const subTotal = useMemo(() => {
    return productsInCart.reduce((sum, product) => sum += product.price, 0)
  }, [productsInCart]);

    // ----------------------    
    // 送料を求める関数
    // ----------------------
    const shippingFee = (subTotal >= 10000) ? 0:210;

    // ----------------------    
    // 税を求める関数
    // ----------------------
    　const tax = subTotal * 0.1;

    // ----------------------    
    // 合計金額を求める関数
    // ----------------------
    const total = subTotal + shippingFee + tax;

    // ----------------------    
    // orderProduct関数(operation) ボタンで呼び出す
    // ----------------------
    const order = useCallback(() => {
        dispatch(orderProduct(productsInCart,total))
    },[productsInCart,total])

    console.log(order)


 return(
    <div className="common__item">
       <div className="common__center">
           <h2>注文の確認</h2>
            <Flex>
             <div>
             {productsInCart.length > 0 && (
                  productsInCart.map(product => <CartItem key={product.id} product={product} /> )
              )}
             </div>
             <CartDetail>
              <TextDetail label={"商品合計"} value={"￥" + subTotal.toLocaleString()} />
              <TextDetail label={"消費税"} value={"￥" + tax} />
              <TextDetail label={"送料"} value={"￥" + shippingFee.toLocaleString()} />
              <hr />
              <TextDetail label={"合計(税込)"} value={"￥" + total.toLocaleString()} />
             </CartDetail>
            </Flex>
            <PrimaryButton 
      style={'primary__red'} onClick={() => dispatch(order)} label={'注文する'}
     />
    </div>
    </div>
 )
}

export default OrderConfirm;