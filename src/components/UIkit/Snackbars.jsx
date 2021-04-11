import React from 'react';
import {IconContext} from 'react-icons';
import styled from 'styled-components';

const Body = styled.div`
 width:100%;
 margin: 0 auto 3em auto ;
 display:flex;
 justify-content: center;
 border-radius: 0.5em;
 align-items:center;
 p {
     padding:0.3em 0 0 0.5em;
     color: #fff;
 }
`;

const Snackbars = (props) => {
 return(
    <IconContext.Provider value={{color: '#fff'}}>
   <Body className={props.color}>
      {props.icon}
       <p>{props.text}</p>
   </Body>
   </IconContext.Provider>
 )
}

export default Snackbars;