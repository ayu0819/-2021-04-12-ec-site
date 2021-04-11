import React from 'react';
import styled from 'styled-components';
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";

const media = {
   sp: '@media(max-width: 650px)'
 }

const Menu = styled.div`
 background-color: #fff;
 border: solid 2px #efefef;
 margin-bottom:0.8em;
 transition: all ease-out .3s;
 padding:1em;
 cursor: pointer;

 ${media.sp} {
    margin: 0.8em auto 0;
   }

 :hover {
    background-color: #efefef;
    transition: all ease-out .3s;
 }
`;

const UserMenu = (props) => {
   const dispatch = useDispatch();
 return(
  <div>
  <Menu onClick={() => dispatch(push(props.link))}>
     {props.text}
  </Menu>
  </div>
 )
}

export default UserMenu;