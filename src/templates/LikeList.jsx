import React,{useCallback} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getProductsInLike } from '../reducks/users/selectors';
import {LikeItem} from '../components/Products';
import styled from 'styled-components';
import {PrimaryButton} from '../components/UIkit';
import {push} from 'connected-react-router';
import image from '../assets/img/cart-img.jpg';

const Items = styled.div`
 padding-top: 1em;
`;

const Image = styled.img`
 width: 100%;
 max-width: 15em;
`;

const ButtonArea = styled.div`
padding-top: 2em;
`;

const Text = styled.p`
 font-weight: bold;
 color: #ea352d;
 padding: 3em 0 2em 0;
`;

const LikeList = () => {
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    const productsInLike = getProductsInLike(selector);
    
        const goToHome = useCallback(() => {
          dispatch(push('/'));
         }, []);

 return(
  <div className="common__item">
  <div className="common__center">
          <h2>あなたのお気に入り商品</h2>
        <Items>
            {productsInLike.length > 0 ? (
  productsInLike.map(product => <LikeItem key={product.likeId} product={product} /> )
) : (
    <>
     <Text>商品がありません</Text>
    <Image src={image} alt="image"/>
    </>
)}
        </Items>

<ButtonArea>
<PrimaryButton 
      style={'primary__red-solid'} onClick={() => dispatch(goToHome)} label={'ホームに戻る'}
     />
</ButtonArea>
      </div>
   </div>
 )
}

export default LikeList;



