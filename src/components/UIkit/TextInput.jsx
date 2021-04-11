import React from 'react';
import styled from 'styled-components';

const media = {
  sp: '@media(max-width: 650px)'
}

const Form = styled.div`
    p {
        text-align:left;
        padding:0;
        font-weight:bold;
    }
    ${media.sp} {
      width: 100%;
      margin: 1em auto 0;
   }
`;

const Input = styled.input`
    color: #8a8a8a;
    display: block;
    width: 90%;
    height: 44px;
    padding: 5px 5%;
    border: 1px solid #ccc;
    border-radius: 27px;
    background-clip: padding-box;
    background-color: #fff;
    font-size: 105%;
    letter-spacing: .8px;
    margin: 1em 0 2.5em 0;

`;

const TextInput = (props) => {
 return(
<Form>
<p>{props.label}</p>
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
</Form>
 )
}

export default TextInput;