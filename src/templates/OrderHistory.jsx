import React, {useEffect} from 'react';
import { useDispatch,useSelector } from "react-redux";
import { fetchOrdersHistory } from '../reducks/users/operations';
import { getOrdersHistory } from '../reducks/users/selectors';
import { OrderHistoryItem } from '../components/Products';
import styled from 'styled-components';

const media = {
    sp: '@media(max-width: 650px)'
  }

const Lists = styled.div`
    width:100%;
    margin-left: auto;
    margin-right: auto;
    ${media.sp} {
     width:100%;
   }
`;

const OrderHistory = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state)  => state)
    // reduxのstoreを取得
    const orders = getOrdersHistory(selector);

    // Ation を呼び出す
    useEffect(() => {
        dispatch(fetchOrdersHistory())
    },[])

    // 初期のorderを取得 Array
    console.log(orders);

    return (
     <div className="common__item">
        <div className="common__center">
            <Lists>


            {orders.length > 0 ? (
   orders.map(order => <OrderHistoryItem order={order} key={order.id} />)
) : (
    <div>商品がありません</div>
)}
           </Lists>
        </div>
        </div>
    );
};

export default OrderHistory;