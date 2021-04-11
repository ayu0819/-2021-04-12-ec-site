import React from 'react';
import styled from 'styled-components';
import {NotificationItem} from '../components/User';
import {UserMenus} from '../components/User';

const Container = styled.div`
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin: 0 auto;
  max-width: 1080px;
`;

const Main = styled.main`
  width: calc(100% - 300px);
`;

const CenterSpacer = styled.div`
 margin: 0 1em;
`;

const Sidebar = styled.aside`
  width: 300px;
`;

const Title= styled.h3`
 font-size: 1.5em;
 font-weight: bold;
`;

const Notifications = [
  {
    day: '2021/08/23',
    text: 'こんにちは、商品を出品または購入しましょう。'
  },
  {
    day: '2021/06/09',
    text: '利用規約が改訂されました。ご確認ください。'
},
]

const UserProductsHistory = () => {
 return(
<>
<div className="common__item">
<div className="common__center">
    <Container>
    <Sidebar >
       <UserMenus />
    </Sidebar>
      <CenterSpacer />
      <Main>
      <Title>お知らせ</Title>
      {Notifications.map((Lists,List) => {
       return<NotificationItem key={List} text={Lists.text} day={Lists.day} />
   })}
      </Main>
    </Container>
</div>
</div>
</>
 )
}

export default UserProductsHistory;