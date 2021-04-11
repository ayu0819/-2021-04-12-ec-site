import React, {useCallback} from 'react';
import {push} from 'connected-react-router';
import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import {PrimaryButton} from '../../components//UIkit';

const media = {
    sp: '@media(max-width: 650px)'
  }

const Card = styled.div`
 background-color: #f6f6f6;
 border-radius: 0.5em;
 width: 100%;
 padding: 1.5em 0;
 margin: 2em 0;
 img {
     max-width: 9em;
     width: 100%;
     border-radius: 0.5em;
 }
`;

const SideArea = styled.div`
 display: flex;
 justify-content: space-around;
 align-items: center;
 padding: 0 1em;
 p,h4 {
  padding:0;
 }
 div {
    
 }
`;

const TextArea = styled.div`
 padding-left: 1.5em;
`;

const PcIcon = styled.div`
    ${media.sp} {
     display:none;
   }
`;

const Icon = styled.div`
display:none;
    ${media.sp} {
     display:block;
   }
`;

const OrderedProducts = (props) => {
    const dispatch = useDispatch();
    const products = props.products;
    const goToProductDetail = useCallback((id) => {
        dispatch(push('/product/' +id))
    }, [])

 return(
   <div>
       {products.map(product => (
         <>
           <Card key={product.id}>
               
               <SideArea>
               <figure>
                   <img src={product.images[0].path} alt="ordered product"/>
              </figure>     
                   <TextArea>
                       <h4>{product.name}</h4>
                       <p>{"サイズ" + product.size}</p>
                       <p><strong>{"¥" + product.price.toLocaleString()}</strong></p>
                   </TextArea> 
                   <PcIcon>
               <PrimaryButton 
      style={'primary__red'} onClick={() => goToProductDetail(product.id)} label={'商品の詳細を見る'}
     />
               </PcIcon>
                 </SideArea>
<Icon>
<PrimaryButton 
      style={'primary__red'} onClick={() => goToProductDetail(product.id)} label={'商品の詳細を見る'}
     />
</Icon>
                 
           </Card>
         </>
       ))}
   </div>
 )
}

export default OrderedProducts;
