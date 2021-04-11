import React,{useCallback} from 'react';
import {useDispatch,useSelectop} from 'react-redux';
import {TextDetail} from '../components/UIkit';
import {getUsername} from '../reducks/users/operations';
import {push} from 'connected-react-router';

const UserMyPage = () => {

 return(
    <div className="common__item">
    <div className="common__center">
        <h2>マイページ</h2>
       
     </div>
     </div>
 )
}

export default UserMyPage;