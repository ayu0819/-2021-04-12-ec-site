import React from 'react';
import {TextDetail} from '../UIkit';
import {OrderedProducts} from '../Products';
import styled from 'styled-components';

const Card = styled.div`
 border-bottom: solid 2px #ddd;
 margin: 0.5em 0;

 p {
     padding:0;
 }
`;

// date 型で受け取ったデータをStringとして受け取る関数
const datetimeToString = (date) => {
 return date.getFullYear() + '_'
  +('00' + (date.getMonth() + 1)).slice(-2) + "_"
  +('00' + date.getDate()).slice(-2) + ""
  +('00' + date.getHours()).slice(-2) + ":"
  +('00' + date.getMinutes()).slice(-2) + ":"
  +('00' + date.getSeconds()).slice(-2) + ""
}

const dateToString = (date) => {
    return date.getFullYear() + '_'
    +('00' + (date.getMonth() + 1)).slice(-2) + "_"
    +('00' + date.getDate()).slice(-2) + ""
}

const OrderHistoryItem = (props) => {
    const order = props.order;
    const orderedDatetime = datetimeToString(order.updated_at.toDate());
    const shippingDate = dateToString(order.shipping_date.toDate());
    const price = "¥" + order.amount.toLocaleString();
 return(
  <Card>
      <TextDetail label={'注文ID:'} value={order.id} />
      <TextDetail label={'注文日時:'} value={orderedDatetime} />
      <TextDetail label={'発送予定日:'} value={shippingDate} />
      <TextDetail label={'注文金額:'} value={price} />
      {order.products.length > 0 && (
          <OrderedProducts products={order.products} />
      )}
      
  </Card>
 )
}

export default OrderHistoryItem;
