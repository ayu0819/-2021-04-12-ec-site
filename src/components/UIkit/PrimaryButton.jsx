import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  
  background-color: #ddd;
  margin: 1.5em auto 0;
  padding: 1.1em 3em;
  transition: all ease-out .3s;
  width: 100%;
  max-width: 20em;
    label{
      font-size: 1.2em;
      cursor:pointer;
    }
    :hover{
    transition: all ease-out .3s;
    }
`;

const PrimaryButton = (props) => {
 return(
    <Button className={props.style} onClick={() => props.onClick()}>
      <label>{props.label}</label>
    </Button>
 )
}

export default PrimaryButton;