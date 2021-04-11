import React from 'react';
import styled from 'styled-components';

const Items = styled.div`
    display:flex;
    justify-content: space-between;
`;

const MainText = styled.p`
    font-weight:bold;
    padding:0.2em;
`;

const Number = styled.p`
    padding-left:0.5em;
    padding:0.2em;
`;

const TextDetail = (props) => {

 return(
   <Items>
    <MainText>
        {props.label}
    </MainText>
    <Number>
        {props.value}
    </Number>
   </Items>
 )
}

export default TextDetail;