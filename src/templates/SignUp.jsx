import React,{useCallback,useState} from 'react';
import {useDispatch} from "react-redux";
import styled from 'styled-components';
import {SignInput,PrimaryButton} from '../components/UIkit';
import {push} from 'connected-react-router';

import {signUp} from '../reducks/users/operations';

const Form = styled.div`
    p {
        padding: 0.8em 0;
        line-height: 0.5em;
        cursor: pointer;
    }
`;

const Texts = styled.div`
        margin-top: 2em;
`;

const SignUp = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState(""),
          [username, setUsername] = useState(""),
          [password, setPassword] = useState(""),
          [confirmPassword, setConfirmPassword] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);
    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    },[setUsername]);
    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword]);
    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value)
    },[setConfirmPassword]);
    

 return(
    <div className="common__item">
    <div className="common__center">
<Form>
<div className="common__center back__gray">
      <h2>サインアップ</h2>
     <SignInput
      placeholder={"sample@email.com"}
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
      placeholder={"田中太郎"}
      label={"ユーザー名"}
      type={"text"}
      name={"text"}
      id={"text"}
      className={"name"}
      autocomplete={"off"}
      value={username}
      onChange={inputUsername}
     />

<SignInput
      placeholder={"入力してください"}
      label={"パスワード"}
      type={"password"}
      name={"password"}
      id={"password"}
      className={"password"}
      autocomplete={"off"}
      value={password}
      onChange={inputPassword}
     />

<SignInput
      placeholder={"入力してください"}
      label={"パスワード(確認)"}
      type={"password"}
      name={"password"}
      id={"password"}
      className={"password"}
      autocomplete={"off"}
      value={confirmPassword}
      onChange={inputConfirmPassword}
     />

     <PrimaryButton 
     style={'primary__red'}
     label={"Sign In"}
     onClick={() => dispatch(signUp({
        username: username,
        email: email,
        password: password, 
        confirmPassword: confirmPassword
     }))}
     />
<Texts>
<p onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
<p onClick={() => dispatch(push('/signin/reset'))}>パスワードをお忘れの方はこちら</p>
</Texts>
     </div>
</Form>
</div>
</div>
 )
}

export default SignUp;