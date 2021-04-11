import React from 'react';
import styled from 'styled-components';
import {push} from "connected-react-router"
import {useDispatch} from "react-redux";

const media = {
   sp: '@media(max-width: 650px)'
 }
 
const Button = styled.button`
 background-color: #fff;
 border: solid 2px #efefef;
 margin-bottom:0.8em;
 transition: all ease-out .3s;
 padding:1em;
 cursor: pointer;
 width: 100%;
 font-size: 1em;

 ${media.sp} {
    margin: 0.8em auto 0;
   }

 :hover {
    background-color: #efefef;
    transition: all ease-out .3s;
 }
`;

    const UserButton = (props) => {
        const dispatch = useDispatch()
        return (
        <div>
           <Button onClick={() => dispatch(push('/user/info/'+props.id))}>
              ユーザー情報
           </Button>
        </div>
        )
}

export default UserButton;