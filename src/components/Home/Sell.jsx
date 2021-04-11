import React from 'react';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import * as AiIcons from "react-icons/ai";
import {IconContext} from 'react-icons';

const Contents = styled.div`
padding: 1.5em 0.7em 0.7em 0.7em;
    p {
      color: #fff;
      font-weight: bold;
      font-size:1.6em;
      padding-bottom:0.8em;
      line-height: 0;
    }
`;

const Button = styled.button`

width:160px;
height:160px;
outline:0;
position: fixed;
 bottom: 1.5em;
 right:2em;
 background-color: #ea352d;
 z-index: 99;
 box-shadow: 0px 3px 15px rgb(0 0 0 / 20%);
 border-radius: 50%;
 transition: all ease-out .3s;
 cursor: pointer;
 text-align: center;
 justify-content: center;
 
 :hover {
    transition: all ease-out .3s;
    background-color: #aa2e28;
 }
`;

const Sell = () => {
 const dispatch = useDispatch();

 return(
 
     <Button onClick={() => dispatch(push('/product/edit'))}>
        <Contents>
        <IconContext.Provider value={{color: '#fff'}}>
       <p>出品</p>
       <AiIcons.AiFillCamera className="sell-Icon" />
       </IconContext.Provider>  
          </Contents>
     </Button>
 )
}

export default Sell;
