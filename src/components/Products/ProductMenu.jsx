import React,{useState} from 'react';
import styled from 'styled-components';
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";
import {deleteProduct} from '../../reducks/products/operations';

const DropMenu = styled.ul`
text-align: left;
    padding-left:1.5em;
    z-index:999;
    position: absolute;
    top:-3em;
    left: 1.5em;
    width:10em;
    right:-7.5em;
    cursor: pointer;
    background-color: transparent;
    li {
        font-size:14.5px;
        padding:0.6em 0.9em;
        background-color:#fff;
        transition: all ease-out .3s;
        cursor: pointer;
    }
    li a {
        color: #747474;
    }
`;

const ProductMenu = (props) => {
    const dispatch = useDispatch();
    const [click,setClick] = useState(false);
    const handleClick = () => setClick(!click)

   return(
    <>
    <DropMenu onClick={handleClick} className={click ? 'dropdown__menu' : 'dropdown__menu'}>
      <ul>
          <li onClick={() => dispatch(push('/product/edit/'+props.id))} >編集する</li>
          <li onClick={() => dispatch(deleteProduct(props.id)) }>削除する</li>
      </ul>
    </DropMenu>
   </> 
   )
}

export default ProductMenu;
