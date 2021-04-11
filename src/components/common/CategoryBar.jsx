import React from 'react';
import styled from 'styled-components';
import {IconText,AccountButton} from '../UIkit'
import {getIsSignedIn} from "../../reducks/users/selectors";
import {useSelector} from "react-redux";
import {IconMenu} from '../common';


const Size = styled.div`
width: 100%;
    margin: 0 auto;
    max-width: 1100px;

padding: 0 1em;
display:flex;
justify-content: space-between;
`;

const Categorys = styled.div`
width: 100%;
background-color: #fff;
display:flex;
justify-content:center;
align-items: center;
`;

const Contents = styled.div`
display:flex;
`;

const CategoryBar = () => {
    const selector = useSelector((state) => state);
    // Selector から getIsSignedIn 関数を取得
    const isSignedIn = getIsSignedIn(selector);

    const ButtonLists = [
        {
          text: '新規会員登録',
          path: '/signup'
        },
        {
          text: 'ログイン',
          path: '/signin'
          }
      ];

 return(
    <Categorys>
    <Size>
<Contents>
<IconText />
</Contents>

{isSignedIn ? (
    <IconMenu />
):(
    <Contents>
    {ButtonLists.map((Lists,List) => {
            return <AccountButton key={List} text={Lists.text} icon={Lists.icon} path={Lists.path} />
        })}
    </Contents>

)}
    </Size>
    </Categorys>
 )
}

export default CategoryBar;