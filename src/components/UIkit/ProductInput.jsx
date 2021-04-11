import React from 'react';
import styled from 'styled-components';

const FlexItem = styled.div`
margin: 1em 0;

label{
    font-weight:bold;
    margin: 1em 0;
    font-size:1em;
    width: 6.5em;
}
`;

const Input = styled.input`
    color: #8a8a8a;
    display: block;
    width: 25em;
    height: 44px;
    padding: 0.3em 1.5em;
    border: 1px solid #ccc;
    border-radius: 27px;
    background-clip: padding-box;
    background-color: #fff;
    font-family: 'HelveticaNeue','Arial', sans-serif;
    font-size: 105%;
    letter-spacing: .8px;
    margin: 0 1em 0 0 ;
`;

const ProductInput = (props) => {
 return(
    <FlexItem>
<label className="product__label">{props.label}</label>
  <Input
  placeholder={props.placeholder}
  type={props.type}
  name={props.name}
  id={props.id}
  className={props.class}
  required={props.required}
  autocomplete={props.complete}
  onChange={props.onChange}
  value={props.value}
  />
    </FlexItem>
 )
}

export default ProductInput;