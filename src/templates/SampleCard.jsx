import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    margin: 0 0.8em 1em 0;
    background-color:#fff;
    width: 100%;
    max-width: 16em;
    border-radius:1em;
    border: solid 2px #eaeaea;
    position: relative;
    transition: all ease-out .3s;
    cursor: pointer;
    img {
        border-radius: 0.8em 0.8em 0 0;
        width: 255.7px;
        height: 255.7px;
        object-fit: cover;
    }
    :hover{
        transition: all ease-out .3s;
        background-color: #f5f5f5;;
    }
`;

const SampleCard = (props) => {
   
 return(
  <div>
    <Card>
        {props.firstName}
        {props.lastName}
        {props.email}
    </Card>
  </div> 
 )
}

export default SampleCard;
