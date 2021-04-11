import React,{useCallback,useState} from 'react';
import {useDispatch} from "react-redux";
import {signIn} from "../reducks/users/operations"
import {SignInput,PrimaryButton} from '../components/UIkit';
import {push} from 'connected-react-router';
import styled from 'styled-components';

const Form = styled.div`
    p {
        padding: 0.8em 0;
        line-height: 0.5em;
        cursor: pointer;
    }
`;

const Button = styled.button`
    background-color: rgb(234, 53, 45);
    border-radius: 4px;
    color: rgb(255, 255, 255);
    display: block;
    width: 70%;
    font-size: 14px;
    margin: 0 auto;
    padding: 15px 10px;
    transition: all ease-out .3s;

    :hover {
        background-color: rgb(129, 33, 28);
border-radius: 4px;
color: rgb(255, 255, 255);
display: block;
width: 70%;
font-size: 14px;
margin: 0 auto;
padding: 15px 10px;
transition: all ease-out .3s;
    }
`;

const Texts = styled.div`
        margin-top: 2em;
`;

const SignIn = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState(""),
          [password, setPassword] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);
    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword]);

 return(
    <div className="common__item">
    <div className="common__center">
    <Form>
     <div className="common__center back__gray">
      <h2>サインイン</h2>
     <SignInput
      label={"メールアドレス"}
      placeholder={"sample@email.com"}
      type={"email"}
      required={true}
      name={"email"}
      id={"email"}
      className={"email"}
      autocomplete={"off"}
      value={email}
      onChange={inputEmail}
     />

<SignInput
      label={"パスワード"}
      placeholder={"入力してください"}
      type={"password"}
      required={true}
      name={"password"}
      id={"password"}
      className={"password"}
      autocomplete={"off"}
      value={password}
      onChange={inputPassword}
     />

     <PrimaryButton 
      style={'primary__red'} onClick={() => dispatch(signIn({email, password}))} label={'ログインする'}
     />

     <Texts>
     <p onClick={() => dispatch(push('/signout'))}>アカウントをお持ちでない方はこちら</p>
     <p onClick={() => dispatch(push('/signin/reset'))}>パスワードをお忘れの方はこちら</p>
     </Texts>
     </div>
  </Form>
  </div>
  </div>
 )
}

export default SignIn;