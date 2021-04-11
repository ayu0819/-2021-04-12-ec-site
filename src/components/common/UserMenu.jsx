import React,{useState} from 'react';
import styled from 'styled-components';
import {LogoutButton} from '../UIkit';
import {push} from "connected-react-router";
import {useDispatch} from "react-redux";

const DropMenu = styled.ul`
text-align: left;
    padding-top:2em;
    z-index:999;
    position: absolute;
    top:1em;
    width:10em;
    right:-7.5em;
    background-color: transparent;
    li {
        font-size:14.5px;
        padding:0.6em 0.9em;
        background-color:#fff;
        transition: all ease-out .3s;
        cursor: pointer;
    }
    li a {
        color: #747474;
    }
`;

const UserMenu = () => {
    const dispatch = useDispatch();
    const [click,setClick] = useState(false);
    const handleClick = () => setClick(!click)

    const DropMenuItems = [
        {
            title: 'マイページ',
            path: '/user'
        },
        {
            title: '購入履歴',
            path: '/order/history'
        },
        {
            title: 'パスワードリセット',
            path: '/signin/reset'
        },
    ]

   return(
    <>
    <DropMenu onClick={handleClick} className={click ? 'dropdown__menu' : 'dropdown__menu'}>
      {DropMenuItems.map((item, index) => {
          return(
              <li key={index} onClick={() => dispatch(push(item.path))}>
                   {item.title}
              </li>
          )
      })}
      <LogoutButton />
    </DropMenu>
   </> 
  
   )
}

export default UserMenu;