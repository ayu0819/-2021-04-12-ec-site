import React from 'react';
import styled from 'styled-components';
import top from '../../assets/img/site-top.jpg';
import topMb from '../../assets/img/site-top-mb.jpg';

const media = {
  sp: '@media(max-width: 650px)'
}

const MainImage = styled.div`
  width: 100%;
  height: 0;
  padding-top: calc(400 / 1200 * 100%); 
  background: url(${top}) center center / cover no-repeat;
  ${media.sp} {
    padding-top: calc(600 / 700 * 100%); 
    background: url(${topMb}) center center / cover no-repeat;
   }
`;

const Home = () => {
 return(
     <MainImage />
    
 )
}

export default Home;
