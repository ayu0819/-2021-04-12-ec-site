import React from 'react';
import styled from 'styled-components';
import {push} from 'connected-react-router';
import {useDispatch} from 'react-redux';
import logo from '../../assets/img/logo.png';

const media = {
    sp: '@media(max-width: 650px)'
}

const NavBar = styled.header`
width: 100%;
background-color: #fff;
display:flex;
justify-content:center;
align-items: center;
img{
    margin-right:2.5em;
    padding: 1em 0 0.5em 0;
    ${media.sp} {
        margin-right: 0;
   }
}
`;

const Size = styled.div`
padding: 1em;
width: 1000px;
display:flex;
justify-content:center;
 img {
     cursor: pointer;
     ${media.sp} {
        width: 12em;
   }
 }
`;

const Nav = () => {
    const dispatch = useDispatch();
 return(
     <NavBar>
        <Size>
    <img onClick={() => dispatch(push('/'))} src={logo} alt="siteTitle" width="250"/>
    </Size>
     </NavBar>
 )
}

export default Nav;