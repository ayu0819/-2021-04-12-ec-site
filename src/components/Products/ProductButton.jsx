import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  display: flex;
  align-items:center;
  justify-content:center;
  border-radius: 0.5em;
  color: #fff;
  padding:0.8em 0;
  font-size: 15.5px;
  margin-bottom:1em;
  transition: all ease-out .3s;
  :hover{
    transition: all ease-out .3s;
  }
  label{
      padding-left:0.5em;
  }
`;

const ProductButton = (props) => {

 return(
    <Button onClick={() => props.addProduct()} className={props.color} onclick="location.href={props.path}">
      {props.icon}<label>{props.label}</label>
    </Button>
 )
}

export default ProductButton;
