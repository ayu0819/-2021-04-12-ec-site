import React,{useCallback,useState} from 'react';
import {useDispatch} from "react-redux";
import {ResetPassword} from "../reducks/users/operations"
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

const Texts = styled.div`
        margin-top: 2em;
`;

const Reset = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

 return(
    <div className="common__item">
     <div className="common__center back__gray">
     <Form>
      <h2>パスワードリセット</h2>
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

<PrimaryButton 
      style={'primary__red'} onClick={() => dispatch(ResetPassword(email))} label={'パスワードリセット'}
     />

<Texts>
 <p onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
 <p onClick={() => dispatch(push('/signup'))}>アカウントをお持ちでない方はこちら</p>
</Texts>
 </Form>
     </div>
     </div>
 )
}

export default Reset;