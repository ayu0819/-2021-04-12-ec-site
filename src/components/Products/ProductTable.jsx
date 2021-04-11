import React from 'react';
import styled from 'styled-components';

const Table = styled.div`
 display:flex;
 align-items: center;
 text-align:center;
`;

const Head = styled.div`
 display:flex;
 align-items: center;
  p{
      padding-left:0.5em;
  }
`;

const ProductTable = (props) => {

 return(
   <Table>
       <Head>
       {props.icon}
       <p><strong>{props.name}</strong></p>
       </Head>
   </Table>
 )
}

export default ProductTable;
