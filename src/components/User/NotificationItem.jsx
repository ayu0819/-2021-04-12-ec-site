import React from 'react';
import styled from 'styled-components';
import * as AiIcons from "react-icons/ai";
import {IconContext} from 'react-icons';

const BackStyle = styled.div`
 background-color: #efefef;
 width: 100%;
 border-radius: 0.5em;
 padding: 0.5em;
 text-align:center;
 display: flex;
 justify-content:center;
 align-items: center;
 margin-bottom: 1em;
 p {
     padding:0 0 0 0.5em;
     font-size:13.5px;
 }
`;

const CartList = (props) => {
 return(
    <IconContext.Provider value={{color: '#363636'}}>
   <BackStyle>
    <AiIcons.AiFillNotification />
    <p>{props.day}</p>
    <p>{props.text}</p>
   </BackStyle>
   </IconContext.Provider>
 )
}

export default CartList;