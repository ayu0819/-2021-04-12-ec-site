import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background-color: rgb(234, 53, 45);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    display: block;
    font-size: 14px;
    padding: 8px 10px;
    margin-left:1em;
    transition: all ease-out .3s;

    :hover {
    background-color: rgb(129, 33, 28);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    display: block;
    font-size: 14px;
    padding: 8px 10px;
    margin-left:1em;
    transition: all ease-out .3s;
    }
`;

const AccountButton = (props) => {
 return(
<a href={props.path}>
<Button>
  {props.text}
</Button>
</a>
 )
}

export default AccountButton