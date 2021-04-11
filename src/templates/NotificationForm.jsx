import React,{useState,useCallback,useEffect} from 'react';
import {useDispatch} from "react-redux";
import styled from 'styled-components';
import {UserMenus} from '../components/User';
import {saveNotification} from '../reducks/Notification/operations';
import { db } from '../firebase';

import {TextInput,SelectBox,TextArea,PrimaryButton} from '../components/UIkit';

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

const NotificationForm = () => {
  const dispatch = useDispatch();

    // ----------------------------------
    // DBデータ 出力 (URLからidを取得する)
    // ----------------------------------
    // window.location.pathname でU RL を取得する
    // .split で /product/edit' 後のs番目の要素(id)を取得
    let id = window.location.pathname.split('/notification/form') [1];
    console.log("Before split /", id)
    
    // id が空でない場合
    if(id !== "") {
        // id に .split で / をつける
        id = id.split('/')[1]
        console.log("After split /",id);
    }
    

  const [type, setType] = useState(""),
        [subject, setSubject] = useState(""),
        [text, setText] = useState("")

  const types =  [
    {id: "select1", name: '選択してください'},
    {id: "service", name: 'お知らせ'},
    {id: "other", name: '重要な報告'},
];

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
      <Title>お知らせの作成</Title>

      <SelectBox 
     name={"type"}
     id={"type"}
     label={"お知らせの種類"}
     options={types}
     select={setType}
     value={type}
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

<TextArea onChange={inputText} value={text} />
     <PrimaryButton 
      style={'primary__red'} onClick={() => dispatch(saveNotification({
       id: id,
       type: type,
       subject: subject,
       text: text
      }))} label={'投稿する'}
     />
      </Main>
    </Container>
</div>
</div>

 )
}

export default NotificationForm;