import React,{useCallback} from 'react';
import {UserMenu,UserButton} from '../User';
import {LogoutButton} from '../UIkit';
import { getUserId } from '../../reducks/users/selectors';
import {useSelector,useDispatch} from "react-redux";
import {push} from 'connected-react-router';

const User = (props) => {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const uid = getUserId(selector);

  // 第二引数に disptach は描かなくても良いが ワーニング を吐いてしまう
  const transition = useCallback((path) => {
    dispatch(push(path))
}, [dispatch]);
  
 return(
     <> 
   <h3 className="UserMenu__title">マイページメニュー</h3>
   <UserButton id={uid} />
   {/* <button onClick={() => dispatch(push('/product/edit/'+id))}>内容を修正する</button> */}
   <UserMenu text={"お知らせ"} link={'/user/notification'} />
   {/* <UserMenu text={"カード情報編集"} onClick={() => transition('/user/payment/edit')} /> */}
   <UserMenu text={"カード情報編集"} link={'/user/payment/edit'} />
   <UserMenu text={"いいねした商品"} link={'/user/like'} />

   <h3 className="UserMenu__title">商品を出品する</h3>
   <UserMenu text={"商品を出品する"} link={'/product/edit'} />
   <UserMenu text={"購入履歴"} link={'/order/history'} />

   <h3 className="UserMenu__title">設定・その他</h3>
   <UserMenu text={"お問い合わせ"} link={'/contact'} />
   <LogoutButton />
     </>
 )
}

export default User;
