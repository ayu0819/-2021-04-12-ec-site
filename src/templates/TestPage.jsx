import React,{useState,useEffect} from 'react';
// import {SampleCard} from './';
import {useSelector, useDispatch} from "react-redux";
import {ProductCard} from '../components/Products';
import {getProducts} from "../reducks/products/selectors";
import {fetchProducts} from "../reducks/products/operations";
// import {Page} from '../components/UIkit';
import {Page2} from '../components/UIkit';
import styled from 'styled-components';

const Products = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    padding-top:3em;
`;

// const test = [
//     {"id":1,"firstName":"Akiduki","lastName":"Tanezane","email":"Akiduki@gmail.com"},
//     {"id":2,"firstName":"Takahasgi","lastName":"Akitane","email":"Takahashi@gmail.com"},
//     {"id":3,"firstName":"Tikushi","lastName":"Hirokado","email":"Tikushi@gmail.com"},
//     {"id":4,"firstName":"Harada","lastName":"Takatane","email":"Harada@gmail.com"},
//     {"id":5,"firstName":"Tikushi","lastName":"Korekado","email":"Tikushi@gmail.com"},
//     {"id":6,"firstName":"Tatibana","lastName":"Akitoshi","email":"Tatibana@gmail.com"},
//     {"id":7,"firstName":"Ryuzozi","lastName":"Takanobu","email":"Ryuzozi@gmail.com"},
//     {"id":8,"firstName":"Tatibana","lastName":"Muneshige","email":"Tatibana@gmail.com"},
//     {"id":9,"firstName":"Takahashi","lastName":"Ayouun","email":"Takahashi@gmail.com"},
//     {"id":10,"firstName":"Tatibana","lastName":"Dosetsu","email":"Tatibana@gmail.com"},
//     {"id":11,"firstName":"Otomo","lastName":"Yoshimune","email":"Otomo@gmail.com"},
//     {"id":12,"firstName":"Shimadu","lastName":"Takahisa","email":"Shimadu@gmail.com"}
//     ]

// Map する データ
const TestPage = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state);
    const posts = getProducts(selector)
//  const [posts, setPosts] = useState(test);

const query = selector.router.location.search;
const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";

const [showPerPage, setShowPerPage] = useState(8)

 const [pagination, setPagination] = useState({
     start: 0,
     end: showPerPage,
 });

 const onPaginationChange = (start,end) => {
    // console.log(start,end);
    setPagination({start:start,end:end})
};

console.log(posts);

useEffect(() => {
    dispatch(fetchProducts(category));
},[query])

 return(
    <div className="common__item">
    <div className="common__center">
        <h2>商品</h2>
      <Products>
   {posts.slice(pagination.start,pagination.end).map((post) => (
    //    <SampleCard key={post.id} firstName={post.firstName} lastName={post.lastName} email={post.email}  />
       <ProductCard key={post.id} id={post.id} name={post.name} images={post.images} price={post.price} />
   ))}
   {/* <Page showPerPage={showPerPage} 
         onPaginationChange={onPaginationChange} 
         total={posts.length}
         /> */}
         </Products>
          <Page2 showPerPage={showPerPage} 
         onPaginationChange={onPaginationChange} 
         total={posts.length}
         />
  </div> 
  </div> 
)
}

export default TestPage;

// import React from 'react';
// import { useSelector,useDispatch } from 'react-redux';
// import { getProductsInCart } from '../reducks/users/selectors';
// import {CartItem} from '../components/Products';
// import {PrimaryButton} from '../components/UIkit';
// // import styled from 'styled-components';
// import {push} from 'connected-react-router';

// // const Buttons = styled.div`
// //  padding-top: 3em;
// // `;

// // const Items = styled.div`
// //  padding-top: 1em;
// // `;

// const TestPage = () => {
//     const selector = useSelector((state) => state);
//     const dispatch = useDispatch();
//     // selector から getProductsInCart関数 を呼び出す (現在のカートにある情報)
//     const productsInCart = getProductsInCart(selector);

//  return(
//    <div>
     
//           <h2>ショッピングカート</h2>
 
//             {/* カート情報 productsInCart関数 を コンポネート で.map する */}
//             {productsInCart.length > 0 && (
//                 productsInCart.map(product => <CartItem key={product.id} product={product} /> )
//             )}

//         <PrimaryButton label={"レジへすすむ"} onClick={() => dispatch(push('/order/confirm'))} />
//         <PrimaryButton label={"買い物を続ける"} onClick={() => dispatch(push('/'))} />
       
//       </div>

//  )
// }

// export default TestPage;
