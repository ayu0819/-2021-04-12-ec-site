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
    font-family: 'HelveticaNeue','Arial', sans-serif;
    font-size: 105%;
    letter-spacing: .8px;
    margin: 1em 0 2.5em 0;
`;

const SignInput = (props) => {
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

export default SignInput;















// import React from 'react';
// import TextField from "@material-ui/core/TextField";

// const TextInput = (props) => {
//  return(

//      <TextField 
//        fullWidth={props.fullWidth}
//        label={props.label}
//        margin={props.margin}
//        multiline={props.multiline}
//        required={props.required}
//        rows={props.rows}
//        value={props.value}
//        type={props.type}
//        onChange={props.onChange}
//      />

//  )
// }

// export default TextInput;