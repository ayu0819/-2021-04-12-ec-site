import React, { useEffect } from 'react';
import {useSelector,useDispatch} from "react-redux";
import styled from 'styled-components';
import {ProductCard} from '../Products';
import {getProducts} from '../../reducks/products/selectors';
import {fetchProducts} from '../../reducks/products/operations';

const Products = styled.div`
    display:flex;
    justify-content:center;
    padding-top:3em;
    flex-wrap : wrap;
`;

const NewProduct = () => {
  const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    // products定数 に getProductsのselector を入れることにより、prodicts は現在のproductStateを持っている
    const products= getProducts(selector)
    const query = selector.router.location.search;
        // gender・category .testメソッド で 正規表現(?gender=) の後ろに値を取り出せるか を検証
　　const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";
    // 商品情報をイテレートする
    useEffect(() => {
        dispatch(fetchProducts(category))
    },[query])

 return(
     <div className="common__item back__color-gray">
       <div className="common__center">
       <h2>新着商品</h2>
       <Products>
                {products.length > 0 && (
                    products.slice(0, 4).map(product1 => (
                        <ProductCard
                            key={product1.id} id={product1.id} name={product1.name} images={product1.images} price={product1.price}
                        />
                    ))
                )}
       </Products>
     </div>
     </div>
 )
}

export default NewProduct;

