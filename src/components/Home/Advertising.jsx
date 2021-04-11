import React from 'react';
import styled from 'styled-components';
import footer from '../../assets/img/site-bottom.png';

const AdvertisingImage = styled.div`
  width: 100%;
  height: 0;
  padding-top: calc(180 / 1200 * 100%); 
  background: url(${footer}) center center / cover no-repeat;
`;

const Advertising = () => {

 return(
     <div className="common__area">
         <AdvertisingImage />
     </div>
 )
}

export default Advertising;
