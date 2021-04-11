import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    cursor: pointer;
    background-color: #ea352d;
    border-radius: 0.5em;
    width: 500px;
    position: fixed;
    bottom: 2em;
    left: 2em;
    z-index: 9999;
    p {
        color: #fff;
        }
`;
      
const ProductEdit = (props) => {
    
 return(
  <Card>
    <p>商品情報を修正</p>
  </Card>
 )
}

export default ProductEdit;
