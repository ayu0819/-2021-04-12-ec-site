import React from 'react';
import styled from 'styled-components';

const Main = styled.p`
    font-size:3em;
    font-weight: bold;
    color: #747474;
`;

const Error = () => {

 return(
    <div className="common__center">
    <div className="common__page">
      <Main>404 not found</Main>
      <p>申し訳ございません。こちらのページは存在しないか削除されています。</p>
    </div>
  </div>
 )
}

export default Error;