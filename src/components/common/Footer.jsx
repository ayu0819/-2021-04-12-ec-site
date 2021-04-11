import React from 'react';
import styled from 'styled-components';

const FooterBar = styled.footer`
    background-color: rgb(34, 34, 34);
    display:flex;
    justify-content:left;
    p {
        color: #fff;
    }
`;

const Footer = () => {

 return(
    <FooterBar>
        <div className="common__size">
         <p>Game shop</p>
        </div>
    </FooterBar>
 )
}

export default Footer;
