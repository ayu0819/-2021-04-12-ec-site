import React from 'react';
import styled from 'styled-components';
import {push} from "connected-react-router"
import {useDispatch} from "react-redux";

const Button = styled.button`
    background-color: rgb(234, 53, 45);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    display: block;
    width: 70%;
    font-size: 14px;
    margin: 0 auto;
    padding: 15px 10px;
    transition: all ease-out .3s;
    :hover {
        background-color: rgb(129, 33, 28);
border-radius: 4px;
color: rgb(255, 255, 255);
display: block;
width: 70%;
font-size: 14px;
margin: 0 auto;
padding: 15px 10px;
transition: all ease-out .3s;
    }
`;

    const UserEditButton = (props) => {
        const dispatch = useDispatch()
        return (
        <>
           <Button onClick={() => dispatch(push('/user/edit/'+props.id))}>
              編集する
           </Button>
        </>
        )
}

export default UserEditButton;