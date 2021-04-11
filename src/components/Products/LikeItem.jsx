import React from 'react';
import styled from 'styled-components';
import * as AiIcons from "react-icons/ai";
import {useSelector} from "react-redux";
import {getUserId} from '../../reducks/users/selectors';
import {db} from '../../firebase/index';

const media = {
  sp: '@media(max-width: 650px)'
}

const ProductCard = styled.div`
position: relative;
      border: 1px solid #ccc;
      width: 100%;
      border-radius:0.5em;
      max-width:35em;
      margin: 1.5em auto 0;
      background-color: #fff;
      transition: all ease-out .3s;
     cursor: pointer;
   :hover {
       background-color: #f5f5f5;
       transition: all ease-out .3s; 
   }
   img {
       width: 100%;
       height: 100%;
       max-width: 200px;
       max-height: 200px;
       object-fit: cover;
       border-radius: 0.5em 0 0 0.5em;
   }
   h3 {
       font-size:1em;
       font-weight:bold;
       padding: 0;
   }
`;

const TextArea = styled.div`
 width:15em;
 margin: 0 1em;
 P {
   padding: 0;
 }
`;

const Item = styled.div`
 display: flex;
      align-items: center;
      figure{
        height: 100%;
        width: 100%;
        max-height: 200px;
        max-width: 200px;
      }
`;

const Icon = styled.div`
   ${media.sp} {
     display: none;
   }
`;

const PcIcon = styled.div`
display: none;
${media.sp} {
  margin-top: 0.3em;
     display: block;
     font-size: 2.1em;
    cursor: pointer;
    transition: all ease-out .3s;
   }
`;

const LikeItem = (props) => {
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const image = props.product.images[0].path;
    const name = props.product.name;
    const price = props.product.price.toLocaleString();
  const removeLikeFromCart = (id) => {
    return db.collection('users').doc(uid)
             .collection('like').doc(id)
             .delete()
};

 return(
     <ProductCard>
      <Item>
        <figure>
      <img src={image} alt="商品画像" />
      </figure>
         <TextArea>
             <h3>{name}</h3>
             <p>{"￥" + price}</p>
             <PcIcon>
         <AiIcons.AiFillDelete onClick={() => removeLikeFromCart(props.product.likeId)}  />
         </PcIcon>
         </TextArea>
         <Icon>
         <AiIcons.AiFillDelete className="product-delete-icon" onClick={() => removeLikeFromCart(props.product.likeId)}  />
         </Icon>
      </Item>
   </ProductCard>
 )
}

export default LikeItem;
