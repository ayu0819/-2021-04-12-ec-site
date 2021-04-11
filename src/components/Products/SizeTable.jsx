import React from 'react';
import styled from 'styled-components';
import * as FaIcons from "react-icons/fa";

const Table = styled.div`
 text-align: center;
`;

const Flex = styled.div`
 display:flex;
 align-items: center;
 background-color: #f6f6f6;
 border-radius: 0.5em;
 justify-content: space-between;
 padding: 1.5em 2em;
 margin-bottom: 1em;
`;

const Item = styled.div`
 display: flex;
 align-items: center;
 margin-left: 1.5em;
`;

const CartIcon = styled.div`
 font-size: 1.2em;
  background-color: #ea352d;
  transition: all ease-out .3s;
  text-align: center;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  position: relative;
  cursor: pointer;
  :hover {
    background: #aa2e28;
    transition: all ease-out .3s;
  }
`;

const ItemSide = styled.div`
 display: flex;
`;

const SizeTable = (props) => {
    const sizes = props.sizes
 return(
    
     <Table>
     {sizes.length > 0 && (
         sizes.map(size => (
             <Flex key={size.size}>
                <ItemSide>
                <Item>
                       {size.size}
                   </Item>
                   <Item>
                     <p> <span>在庫</span> {size.quantity + '個'}</p>
                   </Item>
                   </ItemSide>
                   <Item>
                               {size.quantity > 0 ? (
                                 <CartIcon>
                                     {/* addProduct関数 では選択されたサイズを入れたいから、mapいてれーとした size.size を引数にもち、引数に渡される*/}
                                 <FaIcons.FaShoppingCart className="cartIcon-size" onClick={() => props.addProduct(size.size)} />
                                 </CartIcon>
                               ) : (
                                   <div>売り切れです。</div>
                               )}
                   </Item>
             </Flex>
         )))
     }
   </Table>
 )
}

export default SizeTable;


