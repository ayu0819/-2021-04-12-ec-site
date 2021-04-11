import React, { useEffect } from 'react';
import {useSelector} from "react-redux";
import styled from 'styled-components';
import {ProductCard} from '../Products';
import {getProducts} from '../../reducks/products/selectors';

const Products = styled.div`
    display:flex;
    justify-content:center;
    padding-top:3em;
`;

const PopularProduct = () => {
  const selector = useSelector((state) => state);
    // products定数 に getProductsのselector を入れることにより、prodicts は現在のproductStateを持っている
    const products= getProducts(selector)
    const query = selector.router.location.search;
        // gender・category .testメソッド で 正規表現(?gender=) の後ろに値を取り出せるか を検証
　　const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";
    
    // 商品情報をイテレートする
    useEffect(() => {
    },[query])

    console.log(products);


 return(
     <div className="common__item">
       <div className="common__center">
       <h2>人気プロダクト</h2>
       <Products>
                {products.length > 0 && (
                    products.map(product => (
                        <ProductCard
                            key={product.id} id={product.id} name={product.name} images={product.images} price={product.price}
                        />
                    ))
                )}
       </Products>
     </div>
     </div>
 )
}

export default PopularProduct;
