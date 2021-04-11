import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import {db} from '../firebase';
import {UserMenus} from '../components/User';
import {useDispatch,useSelector} from "react-redux";
import { getUserId,getUsername } from '../reducks/users/selectors';
import image from '../assets/img/mypage-img.jpg';

const media = {
  sp: '@media(max-width: 650px)'
}

const Container = styled.div`
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin: 0 auto;
  max-width: 1080px;
`;

const Sidebar = styled.aside`
  width: 300px;
  ${media.sp} {
        display: none;
   }
`;

const Title= styled.h3`
 font-size: 1.5em;
 font-weight: bold;
 padding-top:1em;
`;

const Main = styled.main`
  width: calc(100% - 300px);
  p {
    padding:0;
    font-weight: bold;
    padding: 1em 0 4em 0;
  }
  img {
    width:350px;
    ${media.sp} {
      width: 100%;
   }
  } 
  ${media.sp} {
      width: 100%;
      padding: 0 1em;
   }
`;

const CenterSpacer = styled.div`
 margin: 0 1em;
 ${media.sp} {
      display: none;
   }
`;

const MbMenu = styled.div`
 display: none;
 ${media.sp} {
      display: block;
   }
`;

const User = () => {
  const dispatch = useDispatch();
  　const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  // id取得のためにpathを取得する
  const path = selector.router.location.pathname;
  const id = path.split('/user/')[1];

  const username = getUsername(selector);

  const [user, setUser] = useState(null);

  // レンダー が走った後に useEffect が走る
  useEffect (() => {
    // pathにより抽出したid
    db.collection('users').doc(id).get()
    // document を受け取る
    .then(doc => {
      // document の data を取得
       const data = doc.data();
       // setUse が user が更新する
       setUser(data)
    })
   }, []);

  return(
    <div className="common__item">
     <div className="common__center">
     <Container>
    <Sidebar>
       <UserMenus />
    </Sidebar>
    <CenterSpacer />
    <Main>
     <Title>ユーザー</Title>
       <p>こんにちは {username} さん<br />今日も素敵なお買い物をしましょう!!</p>
       <img src={image} alt="image"/>
  </Main>
</Container>
<MbMenu>
<UserMenus />
</MbMenu>
     </div>
    </div>
  )
};

export default User;