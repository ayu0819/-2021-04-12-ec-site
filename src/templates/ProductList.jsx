import React, {useEffect} from 'react';
import {ProductCard} from '../components/Products';
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../reducks/products/selectors";
import {fetchProducts} from "../reducks/products/operations";
import styled from 'styled-components';

const Products = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    padding-top:3em;
`;

const ProductList = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state);
    const products = getProducts(selector)

    // query・gender・category 定数の作成 
    // query クエリパラメーターを定義 ?gender= のこと
    const query = selector.router.location.search;
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";

    useEffect(() => {
        dispatch(fetchProducts(category));
    },[query])

    return (
        <div className="common__item">
       <div className="common__center">
       <h2>商品一覧</h2>
       <Products>
                {products.length > 0 ? (
    products.map(product =>  <ProductCard key={product.id} id={product.id} name={product.name} images={product.images} price={product.price} /> )
  ) : (
      <p>カートの中に商品がありません!!</p>
  )}
        </Products>
        </div>
        </div>
    );
};

export default ProductList;