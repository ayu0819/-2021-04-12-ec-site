import React from 'react';
import {Main,NewProduct,Advertising,PopularCategory,Campaign} from '../components/Home';

const Home = () => {
 return(
     <div>
      <Main />
      <PopularCategory />
      <NewProduct />
      <Campaign />
      <Advertising />
     </div>
 )
}

export default Home;