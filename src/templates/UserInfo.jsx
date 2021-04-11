import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import {db} from '../firebase';
import {PrimaryButton} from '../components/UIkit';
import {UserMenus} from '../components/User';
import {ImageSwiper} from '../components/Products';
import {useDispatch,useSelector} from "react-redux";
import { getUserId } from '../reducks/users/selectors';
import { push } from 'connected-react-router';
import HTMLReactParser from 'html-react-parser';

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
  }
  ${media.sp} {
      width: 100%;
   }
`;

const CenterSpacer = styled.div`
 margin: 0 1em;
 ${media.sp} {
      display: none;
   }
`;

const Center = styled.div`
 text-align: center;
`;

const BackStyle = styled.div`
 text-align: center;
 padding: 1em;
 background-color:  #efefef;
 border-radius: 1em;
 width: 100%;
 margin: 1em 0;
 span {
   font-weight: bold;
 }
 ${media.sp} {
  padding: 1em 0;
   }
`;

const Informations = styled.div`
 padding: 2.5em 0;
`;

const Item = styled.div`
text-align: left;
 label {
  text-align: left;
 }
`;

const MbMenu = styled.div`
 display: none;
 ${media.sp} {
      display: block;
   }
`;

const UserInfo = (props) => {
  const dispatch = useDispatch();
  　const selector = useSelector((state) => state);
  const uid = getUserId(selector);
  // id取得のためにpathを取得する
  const path = selector.router.location.pathname;
  const id = path.split('/user/info/')[1];

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

       // -------------------------------------
    //  returnCodeToBr関数
    //  HTML-react-parser で 正規表現を使用して <br> タグを開業につける
    // -------------------------------------  
    const returnCodeToBr = (text) => {
      if(text === "") {
        return text
      } else {
        return HTMLReactParser(text.replace(/\r?\n/g,'<br />'))
      }
    };
 

  return(
    <div className="common__item">
     <div className="common__center">
     <Container>
    <Sidebar >
       <UserMenus />
    </Sidebar>
    <CenterSpacer />
    <Main>
         {user && (
        <>
          <Title>ユーザー情報</Title>
          <ImageSwiper images={user.images} />
          <Informations>
          <Title>基本情報</Title>

       <Item>
       <label>ユーザー名</label>
          <BackStyle>
          <p>{user.username}</p>
          </BackStyle>
       </Item>

          <Item>
          <label>紹介</label>
          <BackStyle>
          <p> {returnCodeToBr(user.description)}</p>
          </BackStyle>
          </Item>
          
          <Title>詳細情報</Title>

          <Item>
          <label>郵便番号</label>
          <BackStyle>
          <p>{user.post}</p>
          </BackStyle>
          </Item>
          
          <Item>
          <label>住所(都道府県)</label>
          <BackStyle>
          <p>{user.prefecture}</p>
          </BackStyle>
          </Item>
          
          <Item>
          <label>住所(市町村)</label>
          <BackStyle>
          <p>{user.city}</p>
          </BackStyle>
          </Item>       

          <Item>
          <label>住所(番地・その他)</label>
          <BackStyle>
          <p>{user.other}</p>
          </BackStyle>
          </Item>

          </Informations>
        </>
       )}

       <Center>
       <PrimaryButton 
      style={'primary__red'} onClick={() => dispatch(push('/user/edit/'+uid))} label={'編集する'}
     />
      </Center>
  </Main>
</Container>
<MbMenu>
<UserMenus />
</MbMenu>
     </div>
    </div>
  )
};

export default UserInfo;