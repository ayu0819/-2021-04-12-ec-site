import React,{useCallback,useState,useEffect} from 'react';
import {useDispatch} from "react-redux";
import styled from 'styled-components';
import {ImageArea} from '../components/Products';
import {SignInput,PrimaryButton,SelectBox,TextArea} from '../components/UIkit';
import {userEdit} from '../reducks/users/operations';
import {db} from "../firebase/index";

const Form = styled.div`
    p {
        padding: 0.8em 0;
        line-height: 0.5em;
        cursor: pointer;
    }
`;

const Title = styled.h3`
    font-size: 1.25em;
    text-align:left;
    font-weight: bold;
    border-bottom: solid 1px #ddd;
    margin:2em 0 1.7em 0;
`;

const Contents = styled.div`
    padding: 0 0 7em 0;
`;

const Button = styled.button`
   
    margin: 2em auto 0 auto;
    padding: 1.1em 3em;
    background: #ea352d;
    transition: all ease-out .3s;
    color: #fff;
    border-radius:2em;
    width:100%;
    max-width: 15em;
    margin-bottom:1em; 
    label{
      font-size: 1.2em;
    }
    :hover{
    padding: 1.1em 3em;
    background: #aa2e28;
    color: #fff;
    transition: all ease-out .3s;
    border-radius:2em;
    label{
      font-size: 1.2em;
    }
    }
`;

const UserEdit = () => {
    const dispatch = useDispatch();
     // ----------------------------------
    // DBデータ 出力 (URLからidを取得する)
    // ----------------------------------
    // window.location.pathname でU RL を取得する
    // .split で /product/edit' 後のs番目の要素(id)を取得
    let id = window.location.pathname.split('/user/edit')[1];
    console.log("Before split /", id)

    if (id !== "") {
        id =  id.split('/')[1]
        console.log("After split / ",id)
      }

    const [email, setEmail] = useState(""),
          [images, setImages] = useState([]),
          [username, setUsername] = useState(""),
          [prefecture, setPrefecture] = useState(""),
          [city, setCity] = useState(""),
          [other, setOther] = useState(""),
          [post, setPost] = useState(""),
          [description, setDescription] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);
    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    },[setUsername]);
    const prefectures  =  [
      {id: "select5", name: '選択してください'},
      {id: "Hokaido", name: '北海道'},
      {id: "Aomori", name: '青森県'},
      {id: "Iwate", name: '岩手県'},
      {id: "Miyagi", name: '宮城県'},
      {id: "Akita", name: '秋田県'},
      {id: "Yamagata", name: '山形県'},
      {id: "Hukushima", name: '福島県'},
      {id: "Ibaragi", name: '茨城県'},
      {id: "Tochigi", name: '栃木県'},
      {id: "Gunma", name: '群馬県'},
      {id: "Saitama", name: '埼玉県'},
      {id: "Chiba", name: '千葉県'},
      {id: "Tokyo", name: '東京都'},
      {id: "Kanagawa", name: '神奈川県'},
      {id: "Nigata", name: '新潟県'},
      {id: "Toyama", name: '富山県'},
      {id: "Ishikawa", name: '石川県'},
      {id: "Hukui", name: '福井県'},
      {id: "Yamanashi", name: '山梨県'},
      {id: "Nagano", name: '長野県'},
      {id: "Gihu", name: '岐阜県'},
      {id: "Shizuoka", name: '静岡県'},
      {id: "Aichi", name: '愛知県'},
      {id: "Mie", name: '三重県'},
      {id: "Shiga", name: '滋賀県'},
      {id: "Kyoto", name: '京都府'},
      {id: "Osaka", name: '大阪府'},
      {id: "Hyogo", name: '兵庫県'},
      {id: "Nara", name: '奈良県'},
      {id: "Wakayama", name: '和歌山県'},
      {id: "Totori", name: '鳥取県'},
      {id: "Shimane", name: '島根県'},
      {id: "Okayama", name: '岡山県'},
      {id: "Hiroshima", name: '広島県'},
      {id: "Yamaguchi", name: '山口県'},
      {id: "Tokushima", name: '徳島県'},
      {id: "Kagawa", name: '香川県'},
      {id: "Ehime", name: '愛媛県'},
      {id: "Kochi", name: '高知県'},
      {id: "Hukuoka", name: '福岡県'},
      {id: "Saga", name: '佐賀県'},
      {id: "Nagasaki", name: '長崎県'},
      {id: "Kumamoto", name: '熊本県'},
      {id: "Oita", name: '大分県'},
      {id: "Miyazaki", name: '宮崎県'},
      {id: "Kagoshima", name: '鹿児島県'},
      {id: "Okinawa", name: '沖縄県'}
  ];
    const inputCity = useCallback((event) => {
      setCity(event.target.value)
  },[setCity]);
  const inputOther = useCallback((event) => {
    setOther(event.target.value)
},[setOther]);
const inputPost = useCallback((event) => {
  setPost(event.target.value)
},[setPost]);
const inputDescription = useCallback((event) => {
  setDescription(event.target.value)
},[setDescription]);

  useEffect(()=> {
    if (id !== "") {
      db.collection('users').doc(id).get()
      .then(snapshot => {
        const data = snapshot.data();
        console.log(data);
        setUsername(data.username);
        setEmail(data.email);
        setPrefecture(data.prefecture);
        setCity(data.city);
        setOther(data.other);
        setPost(data.post);
        setDescription(data.description);
        setImages(data.images);
      })
    }
  }, [id]);

 return(
  <div className="common__item">
    <div className="common__center back__gray">
<Form>
      <h2>あなたの情報</h2>
      <Contents>
      <Title>基本情報</Title>
     <SignInput
      placeholder={"メールアドレス"}
      label={"メールアドレス"}
      type={"email"}
      name={"email"}
      id={"email"}
      className={"email"}
      autocomplete={"off"}
      value={email}
      onChange={inputEmail}
     />

<SignInput
      placeholder={"ユーザー名"}
      label={"ユーザー名"}
      type={"text"}
      name={"text"}
      id={"text"}
      className={"name"}
      autocomplete={"off"}
      value={username}
      onChange={inputUsername}
     />

     <Title>ユーザー詳細情報</Title>

     <SignInput
      placeholder={"入力してください"}
      label={"郵便番号"}
      type={"text"}
      name={"post"}
      id={"post"}
      className={"post"}
      autocomplete={"off"}
      value={post}
      onChange={inputPost}
     />

     <SelectBox 
     name={"prefecture"}
     id={"prefecture"}
     label={"住所(都道府県)"}
     options={prefectures}
     select={setPrefecture}
     value={prefecture}
     />

     <SignInput
      placeholder={"入力してください"}
      label={"住所(市町村)"}
      type={"text"}
      name={"city"}
      id={"city"}
      className={"city"}
      autocomplete={"off"}
      value={city}
      onChange={inputCity}
     />

<SignInput
      placeholder={"入力してください"}
      label={"住所(番地・建物名・部屋番号)"}
      type={"text"}
      name={"other"}
      id={"other"}
      className={"other"}
      autocomplete={"off"}
      value={other}
      onChange={inputOther}
     />

<Title>プロフィール情報</Title>

<ImageArea images={images} setImages={setImages} />
<TextArea onChange={inputDescription} value={description} label={"プロフィール内容"} />

<PrimaryButton 
      style={'primary__red'} onClick={() => dispatch(userEdit({
        id: id,
        username: username, 
        email, 
        prefecture,city: prefecture,city,
        other: other,
        post: post,
        description: description,
        images: images
        }))} label={'編集を保存する'}
     />

</Contents>

</Form>
</div>
     </div>
 )
}

export default UserEdit;