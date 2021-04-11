import React from 'react';
import styled from 'styled-components';

const media = {
  sp: '@media(max-width: 650px)'
}

const FlexItem = styled.div`
p{
  text-align:left;
        padding:0;
        font-weight:bold;
}
`;

const Select = styled.select`
    color: #8a8a8a;
    display: block;
    width: 100%;
    height: 44px;
    padding: 5px 5%;
    border: 1px solid #ccc;
    border-radius: 27px;
    background-clip: padding-box;
    background-color: #fff;
    font-family: 'HelveticaNeue','Arial', sans-serif;
    font-size: 105%;
    letter-spacing: .8px;
    margin: 1em 0 2.5em 0;
    ${media.sp} {
      width: 100%;
   }
`;

const SelectBox = (props) => {
 return(
    <FlexItem>
       <p className="product__label">{props.label}</p>
        <Select value={props.value} id={props.id} name={props.name} onChange={(event) => props.select(event.target.value)}>
            {props.options.map((option) => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </Select>
   </FlexItem>
 )
}

export default SelectBox;