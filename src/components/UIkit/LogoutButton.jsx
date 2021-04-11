import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {signOut} from "../../reducks/users/operations";

const media = {
    sp: '@media(max-width: 650px)'
  }

const Button = styled.button`
    width: 100%;
        background-color: #ea352d;
        padding: 1em;
        font-size: 1em;
        color:#fff;
        transition: all ease-out .3s;

        ${media.sp} {
    margin: 0.8em auto 0;
   }
        
        :hover {
            transition: all ease-out .3s;
            background-color: rgb(129, 33, 28);
        }
`;

const LogoutButton = (props) => {
    const dispatch = useDispatch();
 return(
<Button onClick={() => dispatch(signOut())}>
    ログアウトする
</Button> 
 )
}

export default LogoutButton;