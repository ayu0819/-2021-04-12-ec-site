import React from 'react';
import styled from 'styled-components';
import {useDispatch} from "react-redux";
import {push} from 'connected-react-router';

const media = {
  sp: '@media(max-width: 650px)'
}

const Items = styled.div`
margin: 1.5em;
text-align: center;
    i {
     position:absolute;
     left: 0;
  right: 0;
  margin: auto;
  top: 0.3em;

    }
    p {
      padding-top: 0.5em;
      width: 5em;
      font-weight: bold;
    }
    ${media.sp} {
      margin: 0.7em 0.8em;
   }
`;

const Icon = styled.div`
cursor: pointer;
   position: relative;
font-size: 3em;
padding: 0;
background-color: #ea352d;
border-radius: 50%;
padding: 0.4em;
color: #ffffff;
text-align: center;
transition: all ease-out .3s;
      width: 1em;
      height: 1em;
:hover {
  transition: all ease-out .3s;
    background-color: #aa2e28;
}
${media.sp} {
  font-size: 2.5em;
  width: 1em;
      height: 1em;
   }
`;

const CategoryChip = (props) => {
  const dispatch = useDispatch();

 return(
<Items onClick={() => dispatch(push(props.path))}>
<Icon>
<i>{props.icon}</i>
</Icon>
    <p>{props.name}</p>
</Items>
 )
}

export default CategoryChip;