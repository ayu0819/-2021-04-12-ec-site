import React,{useState,useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {ProductCard} from '../components/Products';
import {getProducts} from "../reducks/products/selectors";
import {fetchProducts} from "../reducks/products/operations";
import {Page2} from '../components/UIkit';
import styled from 'styled-components';

const Products = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    padding-top:3em;
`;

const TestPage = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state);
    const posts = getProducts(selector)

const query = selector.router.location.search;
const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";

const [showPerPage, setShowPerPage] = useState(8)

 const [pagination, setPagination] = useState({
     start: 0,
     end: showPerPage,
 });

 const onPaginationChange = (start,end) => {
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
{posts.length > 0 ? (
    posts.slice(pagination.start,pagination.end).map((post) => (
           <ProductCard key={post.id} id={post.id} name={post.name} images={post.images} price={post.price} />
       ) )
  ) : (
      <p>該当の商品がありません</p>
  )}
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