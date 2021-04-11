import React,{useState,useCallback,useEffect} from 'react';
import {useDispatch} from "react-redux";
import styled from 'styled-components';
import {UserMenus} from '../components/User';
import {push} from 'connected-react-router';
import {saveContact} from '../reducks/Contacts/operations';
import { db } from '../firebase';
import {TextInput,SelectBox,TextArea,PrimaryButton} from '../components/UIkit';

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

const Main = styled.main`
  width: calc(100% - 300px);
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

const ButtonArea = styled.div`
    display: flex;
    justify-content: center;
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
`;

const Notification = () => {
  const dispatch = useDispatch();

      // ----------------------------------
    // DBデータ 出力 (URLからidを取得する)
    // ----------------------------------
    // window.location.pathname でU RL を取得する
    // .split で /product/edit' 後のs番目の要素(id)を取得
    let id = window.location.pathname.split('/contact') [1];
    console.log("Before split /", id)
    
    // id が空でない場合
    if(id !== "") {
        // id に .split で / をつける
        id = id.split('/')[1]
        console.log("After split /",id);
    }
    

  const [type, setType] = useState(""),
        [name, setName] = useState(""),
        [subject, setSubject] = useState(""),
        [email, setEmail] = useState(""),
        [text, setText] = useState("")

  const types =  [
    {id: "select1", name: '選択してください'},
    {id: "service", name: 'サービスについて'},
    {id: "other", name: 'その他'},
];
const inputEmail = useCallback((event) => {
  setEmail(event.target.value)
},[setEmail]);

const inputName = useCallback((event) => {
  setName(event.target.value)
},[setName]);

const inputSubject = useCallback((event) => {
  setSubject(event.target.value)
},[setSubject]);

const inputText = useCallback((event) => {
  setText(event.target.value)
},[setText]);
   

        // DBから商品情報を取得する (DBから持ってきた情報を useState のローカルState に反映)
        useEffect(() => {
          // id が空でない場合
          if (id !== "") {
              // productsCollection から products の id を取得する
            db.collection('contacts').doc(id).get()
            // snapshot に id情報を渡し、処理を行う
              .then(snapshot => {
                  // 定数data に 引数snapshotに .data を設定
                  const data = snapshot.data();
                  // useState で設定した ローカルステート に data をマージする
                  setType(data.type);
                  setName(data.name);
                  setSubject(data.subject);
                  setText(data.text);
              })
          }
      }, [id])

 return(

<div className="common__item">
<div className="common__center">
    <Container>
    <Sidebar >
       <UserMenus />
    </Sidebar>

      <CenterSpacer />

      <Main>
      <Title>お問い合わせ</Title>

      <SelectBox 
     name={"type"}
     id={"type"}
     label={"問い合わせ種類"}
     options={types}
     select={setType}
     value={type}
     />


<TextInput
      label={"名前"}
      placeholder={"田中太郎"}
      type={"text"}
      required={true}
      name={"name"}
      id={"name"}
      className={"name"}
      autocomplete={"off"}
      value={name}
      onChange={inputName}
     />  

<TextInput
      label={"メールアドレス"}
      placeholder={"sample@email.com"}
      type={"text"}
      required={true}
      name={"email"}
      id={"email"}
      className={"email"}
      autocomplete={"off"}
      value={email}
      onChange={inputEmail}
     />  

      <TextInput
      label={"件名"}
      placeholder={"入力してください"}
      type={"text"}
      required={true}
      name={"subject"}
      id={"subject"}
      className={"subject"}
      autocomplete={"off"}
      value={subject}
      onChange={inputSubject}
     />  

<TextArea onChange={inputText} label={'本文'} value={text} />
     <PrimaryButton 
      style={'primary__red'} onClick={() => dispatch(saveContact({
        id: id,
        type: type,
        email: email,
        subject: subject,
        text: text,
        name: name,
        email: email
      }))} label={'送信の確認'}
     />
      </Main>
    </Container>
</div>
</div>

 )
}

export default Notification;