import React from 'react';
import styled from 'styled-components';

const media = {
    sp: '@media(max-width: 650px)'
  }

const Area = styled.textarea`
    color: #8a8a8a;
    width: 100%;
    height: 10em;
    padding: 1em;
    border: 1px solid #ccc;
    border-radius: 15px;
    background-clip: padding-box;
    background-color: #fff;
    font-size: 105%;
    letter-spacing: .8px;
    margin: 1em 0 0 0;
    ${media.sp} {
      width: 100%;
      padding: 0;
   }
`;

const Form = styled.div`
  p{
    text-align:left;
    padding:0;
    font-weight:bold;
}
`;

const TextArea = (props) => {
 return(
<Form>
<p className="product__label">{props.label}</p>
    <Area id="textarea" autocomplete={"off"} name="textarea" cols="40" rows="4" maxlength="20" onChange={props.onChange} value={props.value} label={props.label} />
</Form>
 )
}

export default TextArea;